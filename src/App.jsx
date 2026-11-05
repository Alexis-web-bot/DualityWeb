import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag, Download, Menu, Flame, Swords, BookOpen, Monitor,
  Smartphone, CheckCircle2, Check, Sparkles, Crown, ShoppingCart,
  Music, Square, Disc, Play, Clock, Search, Users, Shield, Backpack,
  Skull, Award, Flag, Sword, Repeat, FlaskConical, Gamepad2,
  Cpu, ShieldCheck, WifiOff, RefreshCw, FolderDown, X, UserCheck, LogOut
} from 'lucide-react';

import PergaminoBox from './components/PergaminoBox';
import AuthModal from './components/AuthModal';
import {
  STORE_EDITIONS,
  SOUNDTRACK_LIST,
  LOOP_PHASES,
  WIKI_CATEGORIES,
  MAP_REGIONS,
  STUDIO_TEAM
} from './data/dualityData';

export default function App() {
  // ---------------------------------------------------------
  // 1. ESTADOS GLOBALES DE LA APLICACIÓN
  // ---------------------------------------------------------
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('duality_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Estados de la Tienda y Carrito
  const [cart, setCart] = useState([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Estados del Grimorio Wiki y Búsqueda
  const [activeWikiTab, setActiveWikiTab] = useState('personajes');
  const [wikiSearch, setWikiSearch] = useState('');

  // Estados de Historia (Bucle Temporal) y Mapa
  const [selectedLoopIdx, setSelectedLoopIdx] = useState(0);
  const [selectedRegionIdx, setSelectedRegionIdx] = useState(0);

  // Estados del Reproductor de Soundtrack (Web Audio API)
  const [activeTrack, setActiveTrack] = useState(null);
  const audioCtxRef = useRef(null);
  const audioIntervalRef = useRef(null);
  const visualizerCanvasRef = useRef(null);

  // Estados del Simulador de Combate por Turnos
  const [combat, setCombat] = useState({
    heroHp: 120,
    heroMaxHp: 120,
    heroMp: 60,
    enemyHp: 180,
    enemyMaxHp: 180,
    realm: 'light',
    finished: false,
    logs: [
      { text: '⚔️ ¡Encuentro iniciado! Un Devorador Abisal bloquea el sendero del bosque.', highlight: true },
      { text: '• Consejo de la Guía de Combate: Alterna la Dualidad para potenciar tu daño o reducir el ataque enemigo.', highlight: false }
    ]
  });

  // Estados de PWA (Lista de Cotejo 60%) y Notificaciones Toast
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);
  const [pwaAuditOpen, setPwaAuditOpen] = useState(false);
  const [pwaInstallOpen, setPwaInstallOpen] = useState(false);
  const [cacheLog, setCacheLog] = useState("[SW Log]: Cache Storage 'duality-pwa-cache-v2' inicializada con los recursos principales.");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // ---------------------------------------------------------
  // 2. LÓGICA DEL SINTETIZADOR DE AUDIO (SOUNDTRACK EN VIVO)
  // ---------------------------------------------------------
  const drawVisualizerFrame = (freq, step) => {
    const canvas = visualizerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#120E1E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const bars = 28;
    const barWidth = (canvas.width / bars) - 3;
    for (let i = 0; i < bars; i++) {
      const h = Math.max(8, Math.sin((i + step) * 0.6) * 28 + (freq % 30));
      ctx.fillStyle = i % 2 === 0 ? '#D4A537' : '#2F4A8A';
      ctx.fillRect(i * (barWidth + 3), canvas.height - h, barWidth, h);
    }
  };

  const stopSoundtrack = () => {
    if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    audioIntervalRef.current = null;
    setActiveTrack(null);
  };

  const playTrack = (track) => {
    stopSoundtrack();
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    setActiveTrack(track);
    let step = 0;

    const playNextNote = () => {
      const ctx = audioCtxRef.current;
      const freq = track.notes[step % track.notes.length];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = track.wave;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (track.tempo / 1000));

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (track.tempo / 1000));

      drawVisualizerFrame(freq, step);
      step++;
    };

    playNextNote();
    audioIntervalRef.current = setInterval(playNextNote, track.tempo);
    showToast(`Reproduciendo: ${track.titulo}`);
  };

  useEffect(() => {
    drawVisualizerFrame(293, 1);
    return () => stopSoundtrack();
  }, []);

  // ---------------------------------------------------------
  // 3. LÓGICA DEL SIMULADOR DE COMBATE POR TURNOS
  // ---------------------------------------------------------
  const resetCombatDemo = () => {
    setCombat({
      heroHp: 120,
      heroMaxHp: 120,
      heroMp: 60,
      enemyHp: 180,
      enemyMaxHp: 180,
      realm: 'light',
      finished: false,
      logs: [{ text: '🔄 Bucle reiniciado. ¡Nuevo combate por turnos listo!', highlight: true }]
    });
  };

  const executeCombatTurn = (action) => {
    if (combat.finished) {
      resetCombatDemo();
      return;
    }

    let { heroHp, heroMaxHp, heroMp, enemyHp, enemyMaxHp, realm, logs } = combat;
    const newLogs = [...logs];

    if (action === 'attack') {
      const dmg = realm === 'light' ? 32 : 24;
      enemyHp = Math.max(0, enemyHp - dmg);
      newLogs.unshift({ text: `🗡️ Kaelen ejecuta Corte Áureo e inflige ${dmg} de daño al Devorador.`, highlight: false });
    } else if (action === 'skill') {
      if (heroMp < 20) {
        newLogs.unshift({ text: '⚠️ No tienes suficiente Energía Astral (MP) para Juicio Solar.', highlight: false });
        setCombat({ ...combat, logs: newLogs });
        return;
      }
      heroMp -= 20;
      const dmg = realm === 'light' ? 54 : 40;
      enemyHp = Math.max(0, enemyHp - dmg);
      newLogs.unshift({ text: `✨ ¡Juicio Solar impacta de lleno causando ${dmg} de daño crítico!`, highlight: true });
    } else if (action === 'shift') {
      realm = realm === 'light' ? 'void' : 'light';
      heroMp = Math.min(60, heroMp + 15);
      newLogs.unshift({
        text: `🌀 ¡Kaelen invoca el Ouroboros y cambia la realidad al ${realm === 'light' ? 'Reino de la Luz' : 'Reino del Vacío'}! (+15 MP)`,
        highlight: true
      });
    } else if (action === 'heal') {
      heroHp = Math.min(heroMaxHp, heroHp + 45);
      newLogs.unshift({ text: '🧪 Bebes un Elixir de Dualidad y restauras +45 HP.', highlight: false });
    }

    // Verificar victoria
    if (enemyHp <= 0) {
      newLogs.unshift({ text: '🏆 ¡VICTORIA! El Devorador Abisal se disipa. Has obtenido +120 EXP y 1 Reliquia del Gremio.', highlight: true });
      setCombat({ ...combat, heroHp, heroMp, enemyHp, realm, finished: true, logs: newLogs });
      showToast('¡Victoria en el Simulador de Combate!');
      return;
    }

    // Contraataque del enemigo
    const enemyDmg = realm === 'void' ? 14 : 22;
    heroHp = Math.max(0, heroHp - enemyDmg);
    newLogs.unshift({ text: `💀 El Devorador Abisal lanza Garra del Olvido (-${enemyDmg} HP).`, highlight: false });

    let finished = false;
    if (heroHp <= 0) {
      finished = true;
      newLogs.unshift({ text: '⏳ El tiempo se agota... Pero el Bucle Temporal te permite reintentar el combate.', highlight: true });
    }

    setCombat({ heroHp, heroMaxHp, heroMp, enemyHp, enemyMaxHp, realm, finished, logs: newLogs });
  };

  // ---------------------------------------------------------
  // 4. LÓGICA DEL CARRITO DE COMPRAS
  // ---------------------------------------------------------
  const addToCart = (name, price) => {
    setCart([...cart, { name, price }]);
    showToast(`Añadido a la Tesorería: ${name}`);
  };

  const removeCartItem = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  const processGuildCheckout = () => {
    if (cart.length === 0) {
      showToast('Agrega al menos un producto antes de confirmar.');
      return;
    }
    setCheckoutSuccess(true);
    setCart([]);
    showToast('¡Compra completada con éxito! Gracias por apoyar a DUALITY.');
  };

  // ---------------------------------------------------------
  // 5. FILTRADO DEL GRIMORIO WIKI
  // ---------------------------------------------------------
  const getFilteredWikiItems = () => {
    const q = wikiSearch.toLowerCase().trim();
    if (!q) {
      return {
        headerTitle: WIKI_CATEGORIES[activeWikiTab].titulo,
        headerDesc: WIKI_CATEGORIES[activeWikiTab].desc,
        items: WIKI_CATEGORIES[activeWikiTab].items
      };
    }

    const matches = [];
    Object.values(WIKI_CATEGORIES).forEach((cat) => {
      cat.items.forEach((item) => {
        if (
          item.nombre.toLowerCase().includes(q) ||
          item.subtitulo.toLowerCase().includes(q) ||
          item.descripcion.toLowerCase().includes(q)
        ) {
          matches.push(item);
        }
      });
    });

    return {
      headerTitle: `Resultados de búsqueda: "${wikiSearch}"`,
      headerDesc: `Mostrando ${matches.length} coincidencias encontradas en todos los pergaminos del Grimorio.`,
      items: matches
    };
  };

  const wikiView = getFilteredWikiItems();
  const currentLoop = LOOP_PHASES[selectedLoopIdx];
  const currentRegion = MAP_REGIONS[selectedRegionIdx];
  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen flex flex-col selection:bg-goldPrimary selection:text-dualityDeep">
      
      {/* BANNER DE MODO SIN CONEXIÓN (Puntos 3.9 y 3.10 Lista de Cotejo) */}
      {isOfflineSimulated && (
        <div className="bg-gradient-to-r from-amber-900 via-red-900 to-amber-900 text-goldLight px-4 py-2.5 text-center text-sm font-fantasy border-b-2 border-goldPrimary relative z-50 shadow-lg">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3">
            <WifiOff className="w-5 h-5 text-goldLight animate-bounce" />
            <span>
              <strong>MODO SIN CONEXIÓN ACTIVO:</strong> No se detecta red externa. Sirviendo el Grimorio y la Tienda de <strong>DUALITY</strong> desde la Caché Local del Service Worker (<code>duality-pwa-cache-v2</code>).
            </span>
            <button
              onClick={() => setIsOfflineSimulated(false)}
              className="px-3 py-0.5 rounded bg-goldPrimary text-dualityDeep font-bold text-xs hover:bg-goldLight transition"
            >
              Reconectar Red
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          1. BARRA DE NAVEGACIÓN PRINCIPAL (CON LOGIN Y CARRITO)
          ========================================================= */}
      <header className="sticky top-0 z-40 bg-[#151024]/95 backdrop-blur-md border-b-2 border-goldPrimary/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo Ouroboros */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-guildBlue/80 border-2 border-goldPrimary flex items-center justify-center shadow-lg group-hover:scale-105 transition">
              <svg className="w-7 h-7 text-goldLight" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4">
                <path d="M32 8a24 24 0 1 0 21.8 14" strokeLinecap="round" />
                <polygon points="54,10 58,24 44,20" fill="currentColor" />
                <circle cx="51" cy="17" r="1.5" fill="#1E1830" />
              </svg>
            </div>
            <div>
              <span className="font-display font-black text-xl sm:text-2xl text-goldLight tracking-widest block leading-none">
                DUALITY
              </span>
              <span className="text-[11px] font-fantasy text-slate-300 tracking-wider">
                RPG & PLATAFORMAS DE FANTASÍA OSCURA
              </span>
            </div>
          </a>

          {/* Enlaces Desktop */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-fantasy font-bold tracking-wider">
            <a href="#tienda" className="px-3 py-2 rounded-lg text-goldLight hover:bg-guildBlue/60 transition">Tienda</a>
            <a href="#soundtrack" className="px-3 py-2 rounded-lg text-slate-200 hover:text-goldLight hover:bg-guildBlue/60 transition">Soundtrack</a>
            <a href="#historia" className="px-3 py-2 rounded-lg text-slate-200 hover:text-goldLight hover:bg-guildBlue/60 transition">Historia y Bucle</a>
            <a href="#grimorio" className="px-3 py-2 rounded-lg text-slate-200 hover:text-goldLight hover:bg-guildBlue/60 transition">Grimorio Wiki</a>
            <a href="#combate" className="px-3 py-2 rounded-lg text-slate-200 hover:text-goldLight hover:bg-guildBlue/60 transition">Jugabilidad</a>
            <a href="#mapa" className="px-3 py-2 rounded-lg text-slate-200 hover:text-goldLight hover:bg-guildBlue/60 transition">Mapa y Galería</a>
            <a href="#requisitos" className="px-3 py-2 rounded-lg text-slate-200 hover:text-goldLight hover:bg-guildBlue/60 transition">Requisitos</a>
            <a href="#equipo" className="px-3 py-2 rounded-lg text-slate-200 hover:text-goldLight hover:bg-guildBlue/60 transition">Estudio</a>
          </nav>

          {/* Botones de Acción: Carrito, Login e Instalar PWA */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setCheckoutSuccess(false); setCartModalOpen(true); }}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-guildBlue hover:bg-guildBlueLight text-goldLight border border-goldPrimary/60 font-fantasy font-bold text-xs transition shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Tesorería</span>
              <span className="px-1.5 py-0.2 rounded-full bg-ribbonRed text-white text-[11px] font-bold">
                {cart.length}
              </span>
            </button>

            {/* Botón de Sesión (Login o Perfil Activo) */}
            {user ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-goldPrimary text-goldLight font-fantasy text-xs">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold hidden md:inline">{user.username}</span>
                <button
                  onClick={() => {
                    localStorage.removeItem('duality_user');
                    setUser(null);
                    showToast('Sesión cerrada correctamente');
                  }}
                  title="Cerrar sesión"
                  className="ml-1 text-red-400 hover:text-red-300"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-[#1E1830] hover:bg-guildBlue text-goldLight border border-goldPrimary font-fantasy font-bold text-xs transition"
              >
                Iniciar Sesión
              </button>
            )}

            <button
              onClick={() => setPwaInstallOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-goldPrimary to-goldLight text-dualityDeep font-fantasy font-extrabold text-xs shadow-lg hover:brightness-110 transition"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Instalar App</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-dualityDeep border border-goldPrimary/50 text-goldLight"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#120E1E] border-t border-goldPrimary/40 px-4 py-4 font-fantasy text-xs">
            <div className="grid grid-cols-2 gap-2">
              <a href="#tienda" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">🛒 Tienda Oficial</a>
              <a href="#soundtrack" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">🎵 Soundtrack</a>
              <a href="#historia" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">📜 Historia y Bucle</a>
              <a href="#grimorio" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">📖 Grimorio Wiki</a>
              <a href="#combate" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">⚔️ Simulador Combate</a>
              <a href="#mapa" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">🗺️ Mapa del Mundo</a>
              <a href="#requisitos" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">💻 Requisitos PC/Móvil</a>
              <a href="#equipo" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">🛡️ Estudio</a>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          2. HERO COMERCIAL CON EL DRAGÓN OUROBOROS GIRATORIO
          ========================================================= */}
      <section id="inicio" className="relative z-10 py-14 sm:py-20 px-4 border-b-2 border-goldPrimary/40 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-guildBlue/70 border border-goldPrimary text-goldLight text-xs font-fantasy tracking-widest shadow">
              <span className="w-2 h-2 rounded-full bg-goldLight animate-ping"></span>
              LANZAMIENTO OFICIAL 2026 • PLATAFORMAS 2D & RPG POR TURNOS
            </div>

            <h1 className="font-display text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-goldLight via-goldPrimary to-[#9E7419] tracking-widest drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
              DUALITY
            </h1>

            <p className="text-xl sm:text-2xl font-fantasy text-parchmentLight leading-snug">
              "Dos realidades enfrentadas. Un bucle temporal inquebrantable. Solo el Gremio de Exploradores recuerda lo que el Vacío devoró."
            </p>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Adéntrate en una odisea de fantasía oscura medieval. Explora biomas fracturados en escenarios de plataformas, domina las <strong>5 Clases Ancestrales</strong> y desafía a las Criaturas del Vacío en combates tácticos por turnos antes de que el reloj del Ouroboros reinicie tu existencia.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#tienda" className="wax-seal px-7 py-4 rounded-xl text-white font-fantasy font-extrabold text-sm tracking-wider flex items-center gap-2.5 hover:scale-105 transition">
                <Flame className="w-5 h-5 text-goldLight" />
                <span>COMPRAR DUALITY • $299 MXN</span>
              </a>
              <a href="#combate" className="px-6 py-4 rounded-xl bg-guildBlue hover:bg-guildBlueLight text-goldLight font-fantasy font-bold text-sm border-2 border-goldPrimary/70 flex items-center gap-2 transition shadow-lg">
                <Swords className="w-5 h-5" />
                <span>Jugar Demo de Combate</span>
              </a>
              <a href="#grimorio" className="px-5 py-4 rounded-xl bg-dualityDeep/90 hover:bg-dualityDeep text-parchmentLight font-fantasy font-semibold text-sm border border-goldPrimary/40 flex items-center gap-2 transition">
                <BookOpen className="w-4 h-4 text-goldPrimary" />
                <span>Abrir Grimorio Wiki</span>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-300 font-fantasy">
              <span className="px-3 py-1.5 rounded-lg bg-[#120E1E]/90 border border-goldPrimary/30 flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-goldPrimary" /> Windows PC (Steam / Itch.io)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#120E1E]/90 border border-goldPrimary/30 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-goldPrimary" /> Android Companion App
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> PWA Instalable & Offline Ready
              </span>
            </div>
          </div>

          {/* Emblema del Ouroboros */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-guildBlue/40 via-goldPrimary/25 to-ribbonRed/30 blur-2xl animate-pulse"></div>
              <svg className="w-full h-full ouroboros-spin relative z-10" viewBox="0 0 240 240" fill="none">
                <circle cx="120" cy="120" r="106" stroke="#D4A537" strokeWidth="2" strokeDasharray="6 6" opacity="0.7" />
                <circle cx="120" cy="120" r="94" stroke="#2F4A8A" strokeWidth="4" opacity="0.8" />
                <path d="M120 32 C68 32, 32 72, 32 120 C32 168, 72 208, 120 208 C168 208, 208 168, 208 120 C208 82, 182 48, 145 36" stroke="url(#goldGrad)" strokeWidth="18" strokeLinecap="round" />
                <path d="M120 32 C68 32, 32 72, 32 120 C32 168, 72 208, 120 208 C168 208, 208 168, 208 120 C208 82, 182 48, 145 36" stroke="#3B2A1A" strokeWidth="14" strokeDasharray="3 7" strokeLinecap="round" />
                <path d="M115 20 L148 26 L138 48 L112 42 Z" fill="#F0CF6E" stroke="#3B2A1A" strokeWidth="3" />
                <circle cx="132" cy="31" r="3.5" fill="#B91C1C" />
                <polygon points="120,64 134,106 176,120 134,134 120,176 106,134 64,120 106,106" fill="url(#goldGrad)" opacity="0.85" />
                <circle cx="120" cy="120" r="14" fill="#1E1830" stroke="#F0CF6E" strokeWidth="3" />
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F0CF6E" />
                    <stop offset="50%" stopColor="#D4A537" />
                    <stop offset="100%" stopColor="#8A6214" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute -bottom-3 bg-[#120E1E] border-2 border-goldPrimary px-5 py-2 rounded-full shadow-2xl text-center z-20">
                <span className="font-fantasy text-xs font-bold text-goldLight tracking-widest">EL CICLO COMIENZA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. TIENDA OFICIAL: LAS 3 EDICIONES EN PERGAMINOS
          ========================================================= */}
      <section id="tienda" className="relative z-10 py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-3 py-1 rounded bg-guildBlue/60 border border-goldPrimary/50 text-goldLight font-fantasy text-xs tracking-widest">
            MERCADO DEL GREMIO DE EXPLORADORES
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-goldLight">Adquiere tu Edición de DUALITY</h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Selecciona tu edición digital para PC y desbloquea acceso inmediato al juego completo, recompensas del Gremio y el Grimorio Oficial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {STORE_EDITIONS.map((ed) => (
            <PergaminoBox
              key={ed.id}
              className={`flex flex-col justify-between ${ed.destacado ? 'lg:-translate-y-3' : ''}`}
              bodyClassName={`flex-1 flex flex-col justify-between ${ed.destacado ? 'ring-4 ring-goldPrimary' : ''}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[#8F7643]/40 pb-3 pt-2">
                  <span className="font-fantasy font-bold text-xs uppercase tracking-widest text-guildBlue">{ed.rango}</span>
                  <span className={`px-2.5 py-0.5 rounded font-fantasy font-bold text-xs ${ed.destacado ? 'bg-ribbonRed text-white' : 'bg-guildBlue text-goldLight'}`}>
                    {ed.tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-black text-parchmentText">{ed.titulo}</h3>
                <div className="text-3xl font-fantasy font-black text-ribbonRed">
                  ${ed.precio} <span className="text-sm font-normal text-parchmentText">MXN</span>
                </div>
                <p className="text-sm leading-relaxed">{ed.descripcion}</p>
                <ul className="space-y-2 text-sm pt-2 border-t border-[#8F7643]/30">
                  {ed.beneficios.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {ed.destacado && i === 0 ? (
                        <Sparkles className="w-4 h-4 text-ribbonRed shrink-0" />
                      ) : (
                        <Check className="w-4 h-4 text-guildBlue shrink-0" />
                      )}
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-[#8F7643]/40">
                <button
                  onClick={() => addToCart(ed.titulo, ed.precio)}
                  className={`w-full py-3.5 rounded-xl font-fantasy font-extrabold text-xs tracking-wider transition flex items-center justify-center gap-2 ${
                    ed.destacado
                      ? 'wax-seal text-white'
                      : 'bg-guildBlue hover:bg-guildBlueLight text-goldLight shadow-lg'
                  }`}
                >
                  {ed.destacado ? <Crown className="w-4 h-4 text-goldLight" /> : <ShoppingCart className="w-4 h-4" />}
                  <span>{ed.botonTexto}</span>
                </button>
              </div>
            </PergaminoBox>
          ))}
        </div>
      </section>

      {/* =========================================================
          4. SECCIÓN SOUNDTRACK Y SINTETIZADOR WEB AUDIO API
          ========================================================= */}
      <section id="soundtrack" className="relative z-10 py-14 px-4 bg-[#141022]/90 border-y-2 border-goldPrimary/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-900/60 border border-goldPrimary text-goldLight font-fantasy text-xs">
              <Music className="w-4 h-4" /> SECCIÓN SOUNDTRACK • MOCKUP OFICIAL
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-goldLight">Soundtrack Oficial y Discos Digitales</h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Escucha un adelanto en tiempo real de las composiciones atmosféricas que acompañan cada combate y región de <strong>DUALITY</strong>.
            </p>

            <div className="p-5 rounded-2xl bg-[#1E1830] border-2 border-goldPrimary shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-fantasy text-goldPrimary uppercase tracking-widest">Reproduciendo Pista:</span>
                  <h4 className="font-fantasy font-bold text-lg text-goldLight">
                    {activeTrack ? activeTrack.titulo : 'Selecciona una pista para escuchar'}
                  </h4>
                </div>
                {activeTrack && (
                  <button
                    onClick={stopSoundtrack}
                    className="px-3 py-1.5 rounded-lg bg-ribbonRed text-white font-fantasy text-xs font-bold flex items-center gap-1"
                  >
                    <Square className="w-3.5 h-3.5" /> Detener
                  </button>
                )}
              </div>

              <canvas
                ref={visualizerCanvasRef}
                width="400"
                height="64"
                className="w-full h-16 rounded-lg bg-[#120E1E] border border-goldPrimary/30"
              ></canvas>

              <div className="flex items-center justify-between pt-2 border-t border-goldPrimary/20">
                <span className="text-xs text-slate-300">Álbum Completo (4 Discos Digitales FLAC + MP3)</span>
                <button
                  onClick={() => addToCart('Álbum Completo Soundtrack Oficial DUALITY', 149)}
                  className="px-4 py-2 rounded-lg bg-goldPrimary hover:bg-goldLight text-dualityDeep font-fantasy font-extrabold text-xs transition shadow"
                >
                  Comprar Álbum ($149 MXN)
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <PergaminoBox bodyClassName="space-y-3">
              <div className="flex items-center justify-between border-b border-[#8F7643]/40 pb-2">
                <h3 className="font-fantasy font-bold text-lg text-guildBlue flex items-center gap-2">
                  <Disc className="w-5 h-5 text-ribbonRed" /> Catálogo de Discos Digitales
                </h3>
                <span className="text-xs font-bold text-parchmentText">Audio Sintetizado en Vivo</span>
              </div>

              {SOUNDTRACK_LIST.map((track) => (
                <div
                  key={track.id}
                  className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 p-3 rounded-xl bg-[#3B2A1A]/10 border border-[#8F7643]/50 hover:bg-[#3B2A1A]/15 transition"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => playTrack(track)}
                      className="w-10 h-10 rounded-full bg-guildBlue text-goldLight flex items-center justify-center hover:scale-105 transition shadow"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                    <div>
                      <h4 className="font-fantasy font-bold text-sm text-parchmentText">{track.titulo}</h4>
                      <p className="text-xs text-parchmentText/80">{track.subtitulo}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(`Disco Digital: ${track.titulo}`, track.precio)}
                    className="px-3 py-1.5 rounded-lg bg-ribbonRed hover:bg-ribbonDark text-white font-fantasy font-bold text-xs shrink-0 transition"
                  >
                    Comprar ${track.precio} MXN
                  </button>
                </div>
              ))}
            </PergaminoBox>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. HISTORIA, OBJETIVO, GÉNERO Y SIMULADOR DEL BUCLE TEMPORAL
          ========================================================= */}
      <section id="historia" className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="px-3 py-1 rounded bg-guildBlue/60 border border-goldPrimary/50 text-goldLight font-fantasy text-xs tracking-widest">
            ARCHIVOS DEL CRONISTA • SECCIÓN HISTORIA Y BUCLE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-goldLight">La Trama y la Maldición del Bucle</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <PergaminoBox>
              <div className="pergamino-ornamento space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-[#8F7643]/40 pb-3">
                  <BookOpen className="w-7 h-7 text-ribbonRed" />
                  <div>
                    <h3 className="font-display text-2xl font-bold text-parchmentText">Historia, Objetivo y Género</h3>
                    <span className="text-xs font-fantasy font-bold text-guildBlue">Crónicas Previas al Colapso</span>
                  </div>
                </div>

                <div className="w-full h-44 rounded-xl border-2 border-[#3B2A1A] overflow-hidden relative bg-[#1E1830] shadow-inner">
                  <svg className="w-full h-full object-cover" viewBox="0 0 600 220">
                    <rect width="600" height="220" fill="#1E1830" />
                    <circle cx="160" cy="80" r="42" fill="#D4A537" opacity="0.9" />
                    <circle cx="172" cy="76" r="34" fill="#1E1830" />
                    <circle cx="430" cy="75" r="36" fill="#2F4A8A" opacity="0.7" />
                    <path d="M0 170 Q120 110 250 165 T600 135 L600 220 L0 220 Z" fill="#8F7643" />
                    <path d="M0 190 Q200 140 380 180 T600 160 L600 220 L0 220 Z" fill="#3B2A1A" />
                    <text x="300" y="205" textAnchor="middle" fill="#F0CF6E" fontFamily="Cinzel" fontSize="13" fontWeight="bold">
                      EL ECLIPSE DE LAS DOS REALIDADES
                    </text>
                  </svg>
                </div>

                <div className="space-y-3 text-base leading-relaxed">
                  <p>
                    <strong>Género del Videojuego:</strong> Aventura de Acción y Plataformas 2D combinada con Combate RPG Táctico por Turnos y estética de fantasía oscura medieval.
                  </p>
                  <p>
                    <strong>Objetivo Principal:</strong> Guiar a tu escuadrón del <em>Gremio de Exploradores</em> a través de biomas fracturados, recolectar las Reliquias del Tiempo, derrotar a los Señores del Vacío y romper el ciclo del Ouroboros.
                  </p>
                  <p>
                    <strong>La Historia:</strong> Siglos atrás, Aethelgard existía en armonía entre la Luz Áurea y el Velo Nocturno. Cuando un experimento prohibido buscó detener la muerte, el tiempo mismo se quebró en un <strong>Bucle Temporal</strong>.
                  </p>
                </div>
              </div>
            </PergaminoBox>
          </div>

          <div className="lg:col-span-5">
            <PergaminoBox bodyClassName="space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-[#8F7643]/40 pb-3 pt-1">
                <Clock className="w-7 h-7 text-ribbonRed" />
                <div>
                  <h3 className="font-display text-xl font-bold text-parchmentText">El Bucle Temporal</h3>
                  <span className="text-xs font-fantasy font-bold text-guildBlue">Simulador de Fases del Ciclo</span>
                </div>
              </div>

              <p className="text-sm">
                Haz clic en cada fase del reloj para descubrir cómo el bucle altera la partida y la memoria de los personajes:
              </p>

              <div className="grid grid-cols-2 gap-2 font-fantasy text-xs">
                {LOOP_PHASES.map((phase, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedLoopIdx(idx)}
                    className={`p-2.5 rounded-lg font-bold border transition text-left ${
                      selectedLoopIdx === idx
                        ? 'bg-guildBlue text-goldLight border-goldPrimary shadow'
                        : 'bg-[#3B2A1A]/15 text-parchmentText border-[#8F7643] hover:bg-[#3B2A1A]/25'
                    }`}
                  >
                    {phase.shortTitle}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#3B2A1A] text-parchmentLight space-y-2 border-2 border-goldPrimary shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="font-fantasy font-bold text-goldLight text-base">{currentLoop.title}</span>
                  <span className="px-2 py-0.5 rounded bg-guildBlue text-xs font-fantasy">{currentLoop.badge}</span>
                </div>
                <p className="text-sm leading-relaxed text-parchmentLight/90">{currentLoop.desc}</p>
                <div className="text-xs font-fantasy text-goldPrimary pt-2 border-t border-goldPrimary/30">
                  {currentLoop.effect}
                </div>
              </div>
            </PergaminoBox>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. EL GRIMORIO DE DUALITY (WIKI CON 6 CATEGORÍAS Y BUSCADOR)
          ========================================================= */}
      <section id="grimorio" className="relative z-10 py-16 px-4 bg-[#141022]/90 border-y-2 border-goldPrimary/40">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 rounded bg-guildBlue/70 border border-goldPrimary/50 text-goldLight font-fantasy text-xs tracking-widest">
                ENCICLOPEDIA OFICIAL • MOCKUPS 3, 4, 5, 6, 8 Y 10
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-goldLight">El Grimorio de DUALITY</h2>
              <p className="text-slate-300 text-base">
                Consulta compañeros, las 5 clases, ítems, criaturas del vacío, el gremio y las facciones del mundo.
              </p>
            </div>

            <div className="w-full md:w-96 relative">
              <input
                type="text"
                value={wikiSearch}
                onChange={(e) => setWikiSearch(e.target.value)}
                placeholder="Buscar personaje, clase, ítem, criatura..."
                className="w-full pl-4 pr-11 py-3 rounded-xl bg-[#1E1830] border-2 border-goldPrimary text-parchmentLight placeholder-slate-400 font-serifBody text-base focus:outline-none focus:ring-2 focus:ring-goldLight shadow-inner"
              />
              <Search className="w-5 h-5 text-goldLight absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Pestañas de Categorías */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 font-fantasy text-xs sm:text-sm font-bold">
            {[
              { key: 'personajes', label: 'Personajes', Icon: Users },
              { key: 'clases', label: 'Las 5 Clases', Icon: Shield },
              { key: 'items', label: 'Ítems y Reliquias', Icon: Backpack },
              { key: 'enemigos', label: 'Criaturas del Vacío', Icon: Skull },
              { key: 'gremio', label: 'Gremio, Rangos y Misiones', Icon: Award },
              { key: 'razas', label: 'Razas y Facciones', Icon: Flag }
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => { setActiveWikiTab(key); setWikiSearch(''); }}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition ${
                  activeWikiTab === key && !wikiSearch
                    ? 'bg-goldPrimary text-dualityDeep shadow-lg font-extrabold'
                    : 'bg-[#1E1830] text-goldLight border border-goldPrimary/40 hover:bg-guildBlue/50'
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>

          <PergaminoBox bodyClassName="min-h-[420px]">
            <div className="border-b-2 border-[#8F7643]/50 pb-3 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-2xl font-black text-parchmentText">{wikiView.headerTitle}</h3>
                <p className="text-sm text-parchmentText/90">{wikiView.headerDesc}</p>
              </div>
              <span className="px-3 py-1 rounded bg-guildBlue text-goldLight font-fantasy text-xs font-bold self-start">
                {wikiView.items.length} Registros
              </span>
            </div>

            {wikiView.items.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="font-display text-xl font-bold text-parchmentText">No se hallaron registros en los pergaminos</p>
                <p className="text-sm text-parchmentText/80">Intenta con otro término (ej. "Kaelen", "Guerrero", "Espada", "Gremio").</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wikiView.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#3B2A1A]/10 border-2 border-[#8F7643]/60 hover:bg-[#3B2A1A]/15 transition flex gap-3.5 items-start"
                  >
                    <div className="w-12 h-12 rounded-xl bg-guildBlue text-goldLight border-2 border-goldPrimary flex items-center justify-center shrink-0 shadow">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h4 className="font-fantasy font-bold text-base text-parchmentText leading-tight">{item.nombre}</h4>
                      <div className="text-xs font-fantasy font-bold text-ribbonRed">{item.subtitulo}</div>
                      <p className="text-sm text-parchmentText leading-relaxed">{item.descripcion}</p>
                      <div className="pt-1.5 mt-1.5 border-t border-[#8F7643]/40 text-xs font-fantasy font-bold text-guildBlue">
                        {item.extra}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </PergaminoBox>
        </div>
      </section>

      {/* =========================================================
          7. JUGABILIDAD, CONTROLES Y SIMULADOR DE COMBATE POR TURNOS
          ========================================================= */}
      <section id="combate" className="relative z-10 py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="px-3 py-1 rounded bg-guildBlue/60 border border-goldPrimary/50 text-goldLight font-fantasy text-xs tracking-widest">
            GUÍA DE COMBATE E INSTRUCCIONES • PUNTO 2.5
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-goldLight">Mecánicas, Controles y Demo de Combate</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Simulador Interactivo */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#141022] border-2 border-goldPrimary shadow-2xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-goldPrimary/30 pb-3">
              <div className="flex items-center gap-2">
                <Swords className="w-6 h-6 text-goldPrimary" />
                <h3 className="font-fantasy font-bold text-lg text-goldLight">Simulador de Combate por Turnos</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full font-fantasy text-xs font-bold border ${
                  combat.realm === 'light'
                    ? 'bg-amber-500/20 border-goldLight text-goldLight'
                    : 'bg-purple-950 border-purple-400 text-purple-200'
                }`}>
                  Dimensión: {combat.realm === 'light' ? 'Reino de la Luz' : 'Reino del Vacío'}
                </span>
                <button onClick={resetCombatDemo} className="px-2.5 py-1 rounded bg-guildBlue text-goldLight text-xs font-fantasy hover:bg-guildBlueLight">
                  Reiniciar
                </button>
              </div>
            </div>

            <div className={`relative rounded-xl p-5 grid grid-cols-2 gap-4 items-center min-h-[210px] border transition-colors duration-500 ${
              combat.realm === 'light'
                ? 'bg-gradient-to-b from-[#2F4A8A]/40 to-[#1E1830] border-goldPrimary/50'
                : 'bg-gradient-to-b from-purple-950/80 to-[#090612] border-purple-500/50'
            }`}>
              {/* Kaelen */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-20 h-20 rounded-2xl bg-guildBlue border-2 border-goldLight flex items-center justify-center shadow-lg">
                  <Sword className="w-10 h-10 text-goldLight" />
                </div>
                <div className="w-full max-w-[180px] space-y-1">
                  <div className="flex justify-between text-xs font-fantasy font-bold">
                    <span className="text-goldLight">Kaelen (Guerrero)</span>
                    <span>{combat.heroHp} / {combat.heroMaxHp} HP</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-goldPrimary/40">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${(combat.heroHp / combat.heroMaxHp) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] font-fantasy text-sky-300">
                    <span>Energía Astral</span>
                    <span>{combat.heroMp} / 60 MP</span>
                  </div>
                </div>
              </div>

              {/* Devorador Abisal */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-20 h-20 rounded-2xl bg-purple-950 border-2 border-ribbonRed flex items-center justify-center shadow-lg">
                  <Skull className="w-10 h-10 text-red-400" />
                </div>
                <div className="w-full max-w-[180px] space-y-1">
                  <div className="flex justify-between text-xs font-fantasy font-bold">
                    <span className="text-red-400">Devorador Abisal</span>
                    <span>{combat.enemyHp} / {combat.enemyMaxHp} HP</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-red-500/40">
                    <div
                      className="h-full bg-ribbonRed transition-all duration-300"
                      style={{ width: `${(combat.enemyHp / combat.enemyMaxHp) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-fantasy text-amber-300 block">
                    {combat.realm === 'light' ? 'Vulnerable a Luz (+25% daño)' : 'Defensa de Sombra activa'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-fantasy text-xs">
              <button onClick={() => executeCombatTurn('attack')} className="p-3 rounded-xl bg-guildBlue hover:bg-guildBlueLight text-goldLight font-bold border border-goldPrimary/50 flex flex-col items-center gap-1 transition shadow">
                <Sword className="w-4 h-4" />
                <span>Corte Áureo</span>
              </button>
              <button onClick={() => executeCombatTurn('skill')} className="p-3 rounded-xl bg-amber-800 hover:bg-amber-700 text-goldLight font-bold border border-goldPrimary/50 flex flex-col items-center gap-1 transition shadow">
                <Sparkles className="w-4 h-4" />
                <span>Juicio Solar (20 MP)</span>
              </button>
              <button onClick={() => executeCombatTurn('shift')} className="p-3 rounded-xl bg-purple-900 hover:bg-purple-800 text-goldLight font-bold border border-goldPrimary/50 flex flex-col items-center gap-1 transition shadow">
                <Repeat className="w-4 h-4" />
                <span>Cambiar Dualidad</span>
              </button>
              <button onClick={() => executeCombatTurn('heal')} className="p-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-goldLight font-bold border border-goldPrimary/50 flex flex-col items-center gap-1 transition shadow">
                <FlaskConical className="w-4 h-4" />
                <span>Elixir (+45 HP)</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0D0A16] border border-goldPrimary/30 text-xs font-serifBody text-parchmentLight h-28 overflow-y-auto space-y-1">
              {combat.logs.map((log, index) => (
                <p key={index} className={log.highlight ? 'text-goldLight font-bold' : 'text-slate-300'}>
                  {log.text}
                </p>
              ))}
            </div>
          </div>

          {/* Controles en Pergamino */}
          <div className="lg:col-span-5">
            <PergaminoBox bodyClassName="space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-[#8F7643]/40 pb-2">
                <Gamepad2 className="w-6 h-6 text-ribbonRed" />
                <h3 className="font-display text-xl font-bold text-parchmentText">Controles y Forma de Jugar</h3>
              </div>
              <p className="text-sm leading-relaxed">
                <strong>DUALITY</strong> divide su jugabilidad en <strong>Exploración de Plataformas 2D</strong> y <strong>Combate por Turnos</strong>.
              </p>
              <div className="space-y-2.5 text-sm">
                <div className="p-2.5 rounded-lg bg-[#3B2A1A]/10 border border-[#8F7643]">
                  <span className="font-fantasy font-bold text-guildBlue block text-xs">MOVIMIENTO EN PLATAFORMAS</span>
                  <strong>Teclas A / D</strong> o <strong>Flechas</strong> para desplazarse por ruinas y abismos.
                </div>
                <div className="p-2.5 rounded-lg bg-[#3B2A1A]/10 border border-[#8F7643]">
                  <span className="font-fantasy font-bold text-guildBlue block text-xs">SALTO Y DOBLE SALTO RÚNICO</span>
                  <strong>Barra Espaciadora</strong> o <strong>Botón A</strong>. Permite alcanzar cornisas ocultas.
                </div>
                <div className="p-2.5 rounded-lg bg-[#3B2A1A]/10 border border-[#8F7643]">
                  <span className="font-fantasy font-bold text-guildBlue block text-xs">CAMBIO DE REALIDAD (DUALIDAD)</span>
                  <strong>Tecla Q</strong> o <strong>Gatillo L1/LB</strong>. Alterna entre el Reino de la Luz y el Vacío.
                </div>
              </div>
            </PergaminoBox>
          </div>
        </div>
      </section>

      {/* =========================================================
          8. MAPA INTERACTIVO DE AETHELGARD (MOCKUP 7)
          ========================================================= */}
      <section id="mapa" className="relative z-10 py-16 px-4 bg-[#141022]/90 border-y-2 border-goldPrimary/40">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded bg-guildBlue/60 border border-goldPrimary/50 text-goldLight font-fantasy text-xs tracking-widest">
              CARTOGRAFÍA Y MULTIMEDIA • MOCKUP 7 Y PUNTO 2.7
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-goldLight">Mapa de Aethelgard</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 p-3 rounded-2xl bg-[#1E1830] border-4 border-goldPrimary shadow-2xl">
              <svg viewBox="0 0 650 440" className="w-full h-auto rounded-xl">
                <rect width="650" height="440" fill="#2A4B5C" />
                <path d="M30 25 Q180 15 310 45 L260 155 Q120 165 40 120 Z" fill="#D8E6EC" stroke="#3B2A1A" strokeWidth="3" />
                <path d="M310 45 Q490 35 590 110 L560 220 Q420 205 260 155 Z" fill="#8B4A32" stroke="#3B2A1A" strokeWidth="3" />
                <path d="M120 155 Q310 140 520 210 L490 350 Q290 365 160 275 Z" fill="#5A8F46" stroke="#3B2A1A" strokeWidth="3" />
                <path d="M60 280 Q190 250 310 340 L250 415 Q110 410 55 350 Z" fill="#D99B38" stroke="#3B2A1A" strokeWidth="3" />
                
                {[
                  { idx: 0, cx: 320, cy: 245 },
                  { idx: 1, cx: 155, cy: 90 },
                  { idx: 2, cx: 465, cy: 125 },
                  { idx: 3, cx: 180, cy: 350 }
                ].map((m) => (
                  <g key={m.idx} onClick={() => setSelectedRegionIdx(m.idx)} className="cursor-pointer">
                    <circle
                      cx={m.cx}
                      cy={m.cy}
                      r="18"
                      fill={selectedRegionIdx === m.idx ? '#2F4A8A' : '#B91C1C'}
                      stroke="#F0CF6E"
                      strokeWidth="3"
                    />
                    <text x={m.cx} y={m.cy + 5} textAnchor="middle" fill="#FFF" fontFamily="Cinzel" fontSize="13" fontWeight="bold">
                      {m.idx + 1}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="lg:col-span-5">
              <PergaminoBox bodyClassName="space-y-3">
                <span className="px-2.5 py-0.5 rounded bg-guildBlue text-goldLight font-fantasy text-xs font-bold">
                  {currentRegion.badge}
                </span>
                <h3 className="font-display text-2xl font-bold text-parchmentText">{currentRegion.title}</h3>
                <p className="text-sm leading-relaxed">{currentRegion.desc}</p>
                <div className="p-3 rounded-lg bg-[#3B2A1A]/10 border border-[#8F7643] text-xs space-y-1">
                  <div><strong>Nivel Recomendado:</strong> {currentRegion.level}</div>
                  <div><strong>Peligros de Plataformas:</strong> {currentRegion.hazards}</div>
                  <div><strong>Jefe de Región:</strong> <em>{currentRegion.boss}</em>.</div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {MAP_REGIONS.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedRegionIdx(i)}
                      className={`p-2 rounded font-fantasy text-xs font-bold ${
                        selectedRegionIdx === i ? 'bg-guildBlue text-goldLight' : 'bg-[#3B2A1A]/15 text-parchmentText'
                      }`}
                    >
                      Bioma #{i + 1}
                    </button>
                  ))}
                </div>
              </PergaminoBox>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          9. REQUISITOS DEL SISTEMA (PC Y MÓVIL PWA)
          ========================================================= */}
      <section id="requisitos" className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-goldLight">Requisitos para Ejecutar DUALITY</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PergaminoBox bodyClassName="space-y-3">
            <h3 className="font-display text-xl font-bold text-guildBlue flex items-center gap-2 border-b border-[#8F7643] pb-2">
              <Monitor className="w-5 h-5 text-ribbonRed" /> Requisitos en Computadora (PC)
            </h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Sistema Operativo:</strong> Windows 10 / Windows 11 (64-bits) o macOS 12+.</li>
              <li><strong>Procesador:</strong> Intel Core i3-8100 / AMD Ryzen 3 1200.</li>
              <li><strong>Memoria RAM:</strong> 4 GB RAM (Mínimo) / 8 GB RAM (Recomendado).</li>
              <li><strong>Tarjeta Gráfica:</strong> DirectX 11 / OpenGL 4.5 con 2 GB VRAM.</li>
              <li><strong>Almacenamiento:</strong> 1.5 GB disponibles.</li>
            </ul>
          </PergaminoBox>

          <PergaminoBox bodyClassName="space-y-3">
            <h3 className="font-display text-xl font-bold text-guildBlue flex items-center gap-2 border-b border-[#8F7643] pb-2">
              <Smartphone className="w-5 h-5 text-ribbonRed" /> Requisitos Móvil (Android & Wiki PWA)
            </h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Sistema Operativo:</strong> Android 7.0 (API 24) o superior / iOS 15+.</li>
              <li><strong>Procesador:</strong> Octa-Core 1.8 GHz o superior.</li>
              <li><strong>Memoria RAM:</strong> 2 GB RAM mínimo.</li>
              <li><strong>Navegador PWA:</strong> Chrome, Edge, Brave o Safari con soporte Service Worker.</li>
              <li><strong>Almacenamiento Offline:</strong> 50 MB libres para caché local.</li>
            </ul>
          </PergaminoBox>
        </div>
      </section>

      {/* =========================================================
          10. ESTUDIO DESARROLLADOR Y CRÉDITOS
          ========================================================= */}
      <section id="equipo" className="relative z-10 py-16 px-4 bg-[#141022]/90 border-t-2 border-goldPrimary/40">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-goldLight">Estudio Desarrollador y Roles del Proyecto</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STUDIO_TEAM.map((member, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#1E1830] border-2 border-goldPrimary/50 shadow-xl space-y-2">
                <span className="px-2.5 py-0.5 rounded bg-guildBlue text-goldLight font-fantasy text-[11px] font-bold">
                  {member.rol}
                </span>
                <h3 className="font-fantasy font-bold text-base text-goldLight">{member.titulo}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTÓN FLOTANTE DE AUDITORÍA PWA */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setPwaAuditOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#120E1E]/95 hover:bg-guildBlue text-goldLight border-2 border-goldPrimary shadow-2xl font-fantasy text-xs font-bold transition"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <Cpu className="w-4 h-4 text-goldPrimary" />
          <span>Panel PWA & Offline (Lista de Cotejo)</span>
        </button>
      </div>

      {/* MODAL DE AUTENTICACIÓN (LOGIN / REGISTRO) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          showToast(`¡Bienvenido al Gremio, ${loggedUser.username}!`);
        }}
      />

      {/* MODAL DEL CARRITO DE COMPRAS */}
      {cartModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full">
            <PergaminoBox bodyClassName="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#8F7643] pb-2">
                <h3 className="font-display text-xl font-bold text-parchmentText flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-ribbonRed" /> Tesorería del Gremio
                </h3>
                <button onClick={() => setCartModalOpen(false)} className="p-1 rounded bg-[#3B2A1A]/15 text-parchmentText">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-sm text-center py-6 italic text-parchmentText/80">
                    Tu tesorería está vacía. Selecciona una Edición de DUALITY o un Disco Digital.
                  </p>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#3B2A1A]/10 border border-[#8F7643]">
                      <span className="text-sm font-bold text-parchmentText">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-fantasy font-bold text-xs text-ribbonRed">${item.price} MXN</span>
                        <button onClick={() => removeCartItem(idx)} className="text-xs font-bold text-parchmentText hover:text-ribbonRed">✕</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t-2 border-[#8F7643] font-fantasy font-bold text-lg">
                <span>Total a Pagar:</span>
                <span className="text-ribbonRed">${cartTotal} MXN</span>
              </div>

              {checkoutSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950 text-emerald-200 border border-emerald-500 text-xs">
                  ¡Orden Confirmada! Tu licencia digital de DUALITY ha sido vinculada a tu cuenta.
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={() => setCart([])} className="px-4 py-2.5 rounded-xl bg-[#3B2A1A]/20 text-parchmentText font-fantasy font-bold text-xs">
                  Vaciar
                </button>
                <button onClick={processGuildCheckout} className="wax-seal flex-1 py-3 rounded-xl text-white font-fantasy font-extrabold text-xs">
                  Completar Compra Ahora
                </button>
              </div>
            </PergaminoBox>
          </div>
        </div>
      )}

      {/* MODAL DE AUDITORÍA PWA */}
      {pwaAuditOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-2xl bg-[#18132B] border-2 border-goldPrimary p-5 space-y-4 text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-goldPrimary/40 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <h3 className="font-fantasy font-bold text-base text-goldLight">Panel Técnico PWA — Lista de Cotejo (60%)</h3>
              </div>
              <button onClick={() => setPwaAuditOpen(false)} className="p-1 rounded bg-slate-800 text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setIsOfflineSimulated(!isOfflineSimulated)}
                className="p-3 rounded-xl bg-amber-900/50 border border-goldPrimary text-goldLight font-fantasy font-bold flex items-center justify-center gap-2"
              >
                <WifiOff className="w-4 h-4" /> Simular Modo Offline (3.9 y 3.10)
              </button>
              <button
                onClick={() => {
                  setCacheLog("[SW Activate]: Caché antigua 'duality-pwa-cache-v1' eliminada. Versión activa: 'duality-pwa-cache-v2'.");
                  showToast('Caché v1 reemplazada por v2');
                }}
                className="p-3 rounded-xl bg-guildBlue/50 border border-goldPrimary text-goldLight font-fantasy font-bold flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Rotar Caché v1 ➔ v2 (3.8)
              </button>
            </div>

            <div className="p-3 rounded bg-black/60 font-mono text-[11px] text-emerald-300">
              {cacheLog}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE INSTALACIÓN PWA */}
      {pwaInstallOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#1E1830] border-2 border-goldPrimary p-6 text-center space-y-4">
            <h3 className="font-display text-2xl font-bold text-goldLight">Instalar DUALITY App</h3>
            <p className="text-sm text-slate-300">
              Ejecuta DUALITY en ventana independiente (<code>standalone</code>) con soporte sin conexión.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setPwaInstallOpen(false)} className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-fantasy text-xs font-bold">
                Cerrar
              </button>
              <button
                onClick={() => {
                  setPwaInstallOpen(false);
                  showToast('¡DUALITY PWA lista en tu dispositivo!');
                }}
                className="flex-1 py-2.5 rounded-xl bg-goldPrimary text-dualityDeep font-fantasy text-xs font-extrabold"
              >
                Instalar Ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST DE NOTIFICACIÓN */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-5 py-3 rounded-xl bg-[#120E1E] border-2 border-goldPrimary text-goldLight font-fantasy text-xs font-bold shadow-2xl flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-goldPrimary" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}