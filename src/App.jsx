import React, { useState, useEffect, useRef } from 'react';
import {
  Download, Menu, Swords, BookOpen, Monitor,
  Smartphone, CheckCircle2, Sparkles, Globe,
  Music, Square, Disc, Play, Pause, Clock, Search, Users, Shield, Backpack,
  Skull, Award, Flag, Sword, Repeat, FlaskConical, Gamepad2,
  UserCheck, LogOut, Eye, X, Laptop
} from 'lucide-react';

import PergaminoBox from './components/PergaminoBox';
import AuthModal from './components/AuthModal';
import EditProfileModal from './components/EditProfileModal';
import { getDualityData } from './data/dualityData';
import BiomesCarousel from './components/BiomesCarousel';
import VideoTeaserSection from './components/VideoTeaserSection';

// --- IMPORTACIONES DE FIREBASE PARA MANTENER LA SESIÓN ---
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// =========================================================
// MOTOR AUTOMÁTICO DE RECORTE DE FONDO (CHROMA KEY EN VIVO)
// =========================================================
const SmartChromaSprite = ({ src, alt, className = '' }) => {
  const [cleanSrc, setCleanSrc] = useState(src);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = encodeURI(src);

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const w = canvas.width;
        const h = canvas.height;

        if (data[3] < 50) return;

        const sampleIdx = (5 * w + 5) * 4;
        const bgR = data[sampleIdx];
        const bgG = data[sampleIdx + 1];
        const bgB = data[sampleIdx + 2];

        const tolerance = 46;
        const visited = new Uint8Array(w * h);
        const stack = [
          0, w - 1, (h - 1) * w, (h - 1) * w + (w - 1),
          Math.floor(h / 2) * w, Math.floor(h / 2) * w + (w - 1)
        ];

        for (const s of stack) visited[s] = 1;

        const isBgMatch = (pos) => {
          const i = pos * 4;
          const dr = data[i] - bgR;
          const dg = data[i + 1] - bgG;
          const db = data[i + 2] - bgB;
          return (dr * dr + dg * dg + db * db) <= tolerance * tolerance * 3;
        };

        while (stack.length > 0) {
          const curr = stack.pop();
          const idx = curr * 4;
          data[idx + 3] = 0;

          const x = curr % w;
          const y = Math.floor(curr / w);

          if (x > 0) {
            const left = curr - 1;
            if (!visited[left] && isBgMatch(left)) { visited[left] = 1; stack.push(left); }
          }
          if (x < w - 1) {
            const right = curr + 1;
            if (!visited[right] && isBgMatch(right)) { visited[right] = 1; stack.push(right); }
          }
          if (y > 0) {
            const up = curr - w;
            if (!visited[up] && isBgMatch(up)) { visited[up] = 1; stack.push(up); }
          }
          if (y < h - 1) {
            const down = curr + w;
            if (!visited[down] && isBgMatch(down)) { visited[down] = 1; stack.push(down); }
          }
        }

        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const p = y * w + x;
            if (data[p * 4 + 3] > 0) {
              if (
                data[(p - 1) * 4 + 3] === 0 || data[(p + 1) * 4 + 3] === 0 ||
                data[(p - w) * 4 + 3] === 0 || data[(p + w) * 4 + 3] === 0
              ) {
                const i = p * 4;
                const dist = Math.sqrt(Math.pow(data[i] - bgR, 2) + Math.pow(data[i + 1] - bgG, 2) + Math.pow(data[i + 2] - bgB, 2));
                if (dist < tolerance * 1.6) { data[i + 3] = Math.floor((dist / (tolerance * 1.6)) * 200); }
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        if (isMounted) setCleanSrc(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error('Error procesando transparencia:', err);
      }
    };

    return () => { isMounted = false; };
  }, [src]);

  return <img src={cleanSrc} alt={alt} className={className} />;
};

// --- DICCIONARIO COMPLETO DE TRADUCCIONES ---
const translations = {
  es: {
    nav: { soundtrack: 'Soundtrack', history: 'Historia', grimoire: 'Grimorio', combat: 'Combate', map: 'Mapa', reqs: 'Requisitos', studio: 'Estudio' },
    buttons: { login: 'Iniciar Sesión', install: 'Centro de Descargas', logout: 'Cerrar sesión', changeBadge: 'Cambiar Insignia', toggleLang: 'EN', close: 'Cerrar', installNow: 'Instalar Ahora' },
    hero: {
      badge: 'PORTAL OFICIAL DE LORE Y EXHIBICIÓN', subtitle: 'RPG & PLATAFORMAS', cycle: 'EL CICLO COMIENZA',
      quote: '"La Creación y la Destrucción en guerra eterna. Un bucle infinito. Y dos almas primordiales atrapadas en el medio."',
      desc: 'Adéntrate en una odisea de fantasía oscura medieval. Explora biomas corrompidos por el Vacío, sobrevive a la Corrosión Abisal y rompe el ciclo inquebrantable junto al Gremio de Exploradores.',
      btnDemo: 'Jugar Demo de Combate', btnWiki: 'Abrir Grimorio Wiki',
      tagPc: 'Desarrollado para PC', tagAndroid: 'Android Companion App', tagOffline: 'App Instalable & Modo Offline'
    },
    soundtrack: {
      badge: 'BANDA SONORA OFICIAL', title: 'Soundtrack Oficial de DUALITY',
      desc: 'Escucha las 8 pistas originales del juego (Taberna, Posada, Bosques y Combates) directamente desde la biblioteca de audio oficial.',
      playing: '🔊 Reproduciendo Ahora:', paused: '⏸️ En Pausa / Espera:', select: 'Selecciona una pista del catálogo',
      stop: 'Detener', catalog: 'Catálogo Oficial'
    },
    story: {
      badge: 'ARCHIVOS DEL CRONISTA • SECCIÓN HISTORIA Y BUCLE', title: 'La Trama y la Maldición del Bucle',
      box1Title: 'Historia, Objetivo y Género', box1Sub: 'Crónicas Previas al Colapso',
      p1: 'El Origen del Conflicto:', p1Desc: 'El mundo es el campo de batalla eterno entre el Dios de la Creación y la Diosa de la Destrucción, condenado a aniquilarse y reconstruirse en un bucle infinito.',
      p2: 'La Anomalía Primordial:', p2Desc: 'Despiertas amnésico, rescatado por una maga (Elizaveta) y un pícaro híbrido (Rasku) del Gremio. Como un ser primordial de segunda generación, eres el único capaz de dominar tanto la creación como la destrucción sin que el tiempo borre tu existencia.',
      box2Title: 'El Bucle Temporal', box2Sub: 'Simulador de Fases del Ciclo', box2Desc: 'Haz clic en cada fase del reloj para descubrir cómo avanza la corrosión:'
    },
    wiki: {
      badge: 'ENCICLOPEDIA OFICIAL', title: 'El Grimorio de DUALITY', desc: 'Pasa el cursor o haz clic sobre cualquier personaje para inspeccionar su arte sin fondo con animación astral.',
      search: 'Buscar personaje, clase, ítem, criatura...',
      tabs: ['Personajes', 'Las 5 Clases', 'Ítems y Reliquias', 'Criaturas del Vacío', 'Gremio, Rangos y Misiones', 'Razas y Facciones'],
      records: 'Registros', noResults: 'No se hallaron registros en los pergaminos', tryAnother: 'Intenta con otro término (ej. "Ópalo", "Elizaveta", "Rasku", "Calabaza").',
      fullArt: 'Ver arte completo'
    },
    combat: {
      badge: 'GUÍA DE COMBATE E INSTRUCCIONES', title: 'Mecánicas y Purificación',
      box1Title: 'Simulador por Turnos: Ópalo', magicLight: 'Creación Pura', magicVoid: 'Destrucción Abisal', reset: 'Reiniciar',
      energy: 'Energía Primordial', enemy: 'Masa Oscura', dangerLight: 'Peligro: Corrosión de Vida', dangerVoid: 'Vulnerable a Destrucción Mágica',
      btnAttack: 'Corte Físico', btnSkill: 'Furia del Bucle', btnShift: 'Cambiar Dualidad', btnHeal: 'Purificarse',
      box2Title: 'Controles y Sobrevivencia', box2Desc: 'DUALITY exige dominar tanto la exploración como el combate. La corrosión no es solo daño, deteriora lentamente tus estadísticas si no te purificas.',
      moveTitle: 'MOVIMIENTO BÁSICO', moveDesc: 'Teclas A / D o Flechas para desplazarse por el bosque y las ruinas.',
      dodgeTitle: 'EVASIÓN Y SALTO RÚNICO', dodgeDesc: 'Barra Espaciadora o Botón A. Esencial para esquivar ataques de las bestias.',
      useTitle: 'USO DE LA DUALIDAD', useDesc: 'Tecla Q o Gatillo L1/LB. Alterna entre energía de creación y destrucción para resolver puzzles y exponer a los enemigos.',
      logStart: '⚔️ ¡Encuentro iniciado! Una Masa Oscura de Corrosión bloquea el paso.', logHint: '• Consejo de la Guía: Eres un ser Primordial. Alterna tu Dualidad para evitar que la corrupción te desintegre.',
      logReset: '🔄 La Diosa de la Destrucción ha reiniciado el bucle. ¡Nuevo combate listo!'
    },
    map: {
      badge: 'CARTOGRAFÍA OFICIAL DEL MUNDO', title: 'Continente y Reinos de DUALITY',
      desc: 'Selecciona cualquiera de los 10 bastiones y regiones directamente sobre el mapa o en el pergamino para consultar su lore, rango de peligro y jefe de zona.',
      hint: '🧭 Haz clic sobre cualquier número del mapa para inspeccionar el reino',
      activeRegion: 'Región Activa:', realm: 'Reino #', level: 'Nivel Recomendado:', hazards: 'Peligros de Zona:', boss: 'Jefe de Región:',
      fastTravel: 'Viaje Rápido por los 10 Reinos:'
    },
    specs: {
      title: 'Requisitos para Ejecutar DUALITY', pcTitle: 'Requisitos en Computadora (PC)', mobileTitle: 'Requisitos Móvil (Android & Wiki PWA)',
      os: 'Sistema Operativo:', cpu: 'Procesador:', ram: 'Memoria RAM:', gpu: 'Tarjeta Gráfica:', storage: 'Almacenamiento:',
      pcOs: 'Windows 10 / Windows 11 (64-bits) o macOS 12+.', pcCpu: 'Intel Core i3-8100 / AMD Ryzen 3 1200.', pcRam: '4 GB RAM (Mínimo) / 8 GB RAM (Recomendado).', pcGpu: 'DirectX 11 / OpenGL 4.5 con 2 GB VRAM.', pcStorage: '1.5 GB disponibles.',
      mobOs: 'Android 7.0 (API 24) o superior / iOS 15+.', mobCpu: 'Octa-Core 1.8 GHz o superior.', mobRam: '2 GB RAM mínimo.', mobBrowser: 'Chrome, Edge, Brave o Safari con soporte Service Worker.', mobStorage: '50 MB libres para caché local.'
    },
    team: {
      title: 'Estudio Desarrollador y Roles del Proyecto'
    },
    downloadsModal: {
      title: 'CENTRO DE DESCARGAS • DUALITY',
      desc: 'Elige la versión adecuada para adentrarte en el bucle temporal:',
      pwaTitle: 'APLICACIÓN WEB PWA', pwaDesc: 'Instálala directamente en tu navegador (PC o móvil) con soporte offline.', pwaBtn: 'INSTALAR PWA',
      apkTitle: 'APP MÓVIL (ANDROID APK)', apkDesc: 'Lleva el companion y los registros del gremio en tu dispositivo Android.', apkBtn: 'DESCARGAR APK',
      pcTitle: 'VIDEOJUEGO (PC / ESCRITORIO)', pcDesc: 'Descarga el juego completo para Windows / macOS y experimenta las plataformas.', pcBtn: 'DESCARGAR PC'
    },
    toast: { logoutSuccess: 'Sesión cerrada correctamente', pwaReady: '¡DUALITY PWA lista en tu dispositivo!', apkReady: 'Iniciando descarga de APK...', pcReady: 'Iniciando descarga para PC...' }
  },
  en: {
    nav: { soundtrack: 'Soundtrack', history: 'Story', grimoire: 'Grimoire', combat: 'Combat', map: 'Map', reqs: 'Specs', studio: 'Studio' },
    buttons: { login: 'Log In', install: 'Download Center', logout: 'Log out', changeBadge: 'Change Badge', toggleLang: 'ES', close: 'Close', installNow: 'Install Now' },
    hero: {
      badge: 'OFFICIAL LORE & SHOWCASE PORTAL', subtitle: 'RPG & PLATFORMER', cycle: 'THE CYCLE BEGINS',
      quote: '"Creation and Destruction in eternal war. An infinite loop. And two primordial souls trapped in between."',
      desc: 'Delve into a dark medieval fantasy odyssey. Explore biomes corrupted by the Void, survive the Abyssal Corrosion, and break the unbreakable cycle alongside the Explorers Guild.',
      btnDemo: 'Play Combat Demo', btnWiki: 'Open Wiki Grimoire',
      tagPc: 'Developed for PC', tagAndroid: 'Android Companion App', tagOffline: 'Installable App & Offline Mode'
    },
    soundtrack: {
      badge: 'OFFICIAL SOUNDTRACK', title: 'Official DUALITY Soundtrack',
      desc: 'Listen to the 8 original tracks from the game (Tavern, Inn, Forests, and Combat) directly from the official audio library.',
      playing: '🔊 Now Playing:', paused: '⏸️ Paused / Idle:', select: 'Select a track from the catalog',
      stop: 'Stop', catalog: 'Official Catalog'
    },
    story: {
      badge: 'CHRONICLER ARCHIVES • STORY & LOOP SECTION', title: 'The Plot and the Loop Curse',
      box1Title: 'Story, Objective & Genre', box1Sub: 'Pre-Collapse Chronicles',
      p1: 'The Origin of the Conflict:', p1Desc: 'The world is the eternal battlefield between the God of Creation and the Goddess of Destruction, doomed to annihilate and rebuild itself in an infinite loop.',
      p2: 'The Primordial Anomaly:', p2Desc: 'You wake up amnesiac, rescued by a mage (Elizaveta) and a hybrid rogue (Rasku) from the Guild. As a second-generation primordial being, you are the only one capable of mastering both creation and destruction without time erasing your existence.',
      box2Title: 'The Time Loop', box2Sub: 'Cycle Phase Simulator', box2Desc: 'Click on each phase of the clock to discover how the corrosion advances:'
    },
    wiki: {
      badge: 'OFFICIAL ENCYCLOPEDIA', title: 'The DUALITY Grimoire', desc: 'Hover or click on any character to inspect their borderless art with astral animation.',
      search: 'Search character, class, item, creature...',
      tabs: ['Characters', 'The 5 Classes', 'Items & Relics', 'Void Creatures', 'Guild, Ranks & Quests', 'Races & Factions'],
      records: 'Records', noResults: 'No records found in the scrolls', tryAnother: 'Try another term (e.g., "Opalo", "Elizaveta", "Rasku", "Pumpkin").',
      fullArt: 'See full art'
    },
    combat: {
      badge: 'COMBAT GUIDE & INSTRUCTIONS', title: 'Mechanics & Purification',
      box1Title: 'Turn-Based Simulator: Opal', magicLight: 'Pure Creation', magicVoid: 'Abyssal Destruction', reset: 'Reset',
      energy: 'Primordial Energy', enemy: 'Dark Mass', dangerLight: 'Danger: Life Corrosion', dangerVoid: 'Vulnerable to Magic Destruction',
      btnAttack: 'Physical Slash', btnSkill: 'Loop Fury', btnShift: 'Shift Duality', btnHeal: 'Purify',
      box2Title: 'Controls & Survival', box2Desc: 'DUALITY demands mastering both exploration and combat. Corrosion is not just damage; it slowly deteriorates your stats if you do not purify.',
      moveTitle: 'BASIC MOVEMENT', moveDesc: 'A / D Keys or Arrows to move through the forest and ruins.',
      dodgeTitle: 'EVASION & RUNIC JUMP', dodgeDesc: 'Spacebar or A Button. Essential to dodge beast attacks.',
      useTitle: 'USE OF DUALITY', useDesc: 'Q Key or L1/LB Trigger. Alternate between creation and destruction energy to solve puzzles and expose enemies.',
      logStart: '⚔️ Encounter initiated! A Dark Mass of Corrosion blocks the way.', logHint: '• Guide tip: You are a Primordial. Alternate your Duality to prevent corruption from disintegrating you.',
      logReset: '🔄 The Goddess of Destruction has reset the loop. New combat ready!'
    },
    map: {
      badge: 'OFFICIAL WORLD CARTOGRAPHY', title: 'DUALITY Continent and Realms',
      desc: 'Select any of the 10 bastions and regions directly on the map or in the scroll to check its lore, danger rank, and zone boss.',
      hint: '🧭 Click on any number on the map to inspect the realm',
      activeRegion: 'Active Region:', realm: 'Realm #', level: 'Recommended Level:', hazards: 'Zone Hazards:', boss: 'Region Boss:',
      fastTravel: 'Fast Travel through the 10 Realms:'
    },
    specs: {
      title: 'System Requirements for DUALITY', pcTitle: 'Computer Requirements (PC)', mobileTitle: 'Mobile Requirements (Android & Wiki PWA)',
      os: 'Operating System:', cpu: 'Processor:', ram: 'RAM Memory:', gpu: 'Graphics Card:', storage: 'Storage:',
      pcOs: 'Windows 10 / Windows 11 (64-bits) or macOS 12+.', pcCpu: 'Intel Core i3-8100 / AMD Ryzen 3 1200.', pcRam: '4 GB RAM (Minimum) / 8 GB RAM (Recommended).', pcGpu: 'DirectX 11 / OpenGL 4.5 with 2 GB VRAM.', pcStorage: '1.5 GB available.',
      mobOs: 'Android 7.0 (API 24) or higher / iOS 15+.', mobCpu: 'Octa-Core 1.8 GHz or higher.', mobRam: '2 GB RAM minimum.', mobBrowser: 'Chrome, Edge, Brave or Safari with Service Worker support.', mobStorage: '50 MB free for local cache.'
    },
    team: {
      title: 'Development Studio & Project Roles'
    },
    downloadsModal: {
      title: 'DOWNLOAD CENTER • DUALITY',
      desc: 'Choose the right version to delve into the time loop:',
      pwaTitle: 'PWA WEB APPLICATION', pwaDesc: 'Install it directly in your browser (PC or mobile) with offline support.', pwaBtn: 'INSTALL PWA',
      apkTitle: 'MOBILE APP (ANDROID APK)', apkDesc: 'Carry the companion and guild records on your Android device.', apkBtn: 'DOWNLOAD APK',
      pcTitle: 'VIDEO GAME (PC / DESKTOP)', pcDesc: 'Download the full game for Windows / macOS and experience the platformer.', pcBtn: 'DOWNLOAD PC'
    },
    toast: { logoutSuccess: 'Logged out successfully', pwaReady: 'DUALITY PWA is ready on your device!', apkReady: 'Starting APK download...', pcReady: 'Starting PC game download...' }
  }
};

export default function App() {
  // ---------------------------------------------------------
  // 1. ESTADOS GLOBALES DE LA APLICACIÓN
  // ---------------------------------------------------------
  
  const [lang, setLang] = useState(() => localStorage.getItem('duality_lang') || 'es');
  const t = translations[lang];

  const { SOUNDTRACK_LIST, LOOP_PHASES, WIKI_CATEGORIES, MAP_REGIONS, STUDIO_TEAM } = getDualityData(lang);

  const toggleLanguage = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    setLang(newLang);
    localStorage.setItem('duality_lang', newLang);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('inicio');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('duality_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user?.avatar || '/avatarares/turnos_slime_verde.webp');

  // ---------------------------------------------------------
  // 1.5 EFECTO PARA PERSISTENCIA DE SESIÓN CON FIREBASE
  // ---------------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, 'usuarios', firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          let userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            username: firebaseUser.displayName || 'ALEXIS'
          };

          if (userSnap.exists()) {
            userData = { ...userData, ...userSnap.data() };
          }

          setUser(userData);
          setCurrentAvatar(userData.avatar || '/avatarares/turnos_slime_verde.webp');
          localStorage.setItem('duality_user', JSON.stringify(userData));
        } catch (error) {
          console.error("Error recuperando info del usuario:", error);
        }
      } else {
        setUser(null);
        localStorage.removeItem('duality_user');
      }
    });

    return () => unsubscribe();
  }, []);

  const [activeWikiTab, setActiveWikiTab] = useState('personajes');
  const [wikiSearch, setWikiSearch] = useState('');
  const [inspectedItem, setInspectedItem] = useState(null);
  const [selectedLoopIdx, setSelectedLoopIdx] = useState(0);
  const [selectedRegionIdx, setSelectedRegionIdx] = useState(0);

  const [activeTrack, setActiveTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const animFrameRef = useRef(null);
  const visualizerCanvasRef = useRef(null);

  const [combat, setCombat] = useState({
    heroHp: 150, heroMaxHp: 150, heroMp: 80, enemyHp: 220, enemyMaxHp: 220, realm: 'light', finished: false,
    logs: [
      { text: t.combat.logStart, highlight: true },
      { text: t.combat.logHint, highlight: false }
    ]
  });

  const [downloadsModalOpen, setDownloadsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // ---------------------------------------------------------
  // INSTALACIÓN PWA (LÓGICA REAL)
  // ---------------------------------------------------------
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallPWA = async () => {
    setDownloadsModalOpen(false);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast(lang === 'en' ? 'Installing DUALITY...' : '¡Instalando DUALITY!');
      }
      setDeferredPrompt(null);
    } else {
      showToast(lang === 'en' ? 'App already installed or use browser menu.' : 'La app ya está instalada o usa el icono del navegador (arriba a la derecha).');
    }
  };

  // ---------------------------------------------------------
  // 2. REPRODUCTOR MP3 OFICIAL + VISUALIZADOR DE FRECUENCIAS
  // ---------------------------------------------------------
  const drawIdleVisualizer = () => {
    const canvas = visualizerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#120E1E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const bars = 32;
    const barWidth = (canvas.width / bars) - 3;
    for (let i = 0; i < bars; i++) {
      const h = 6 + Math.sin(i * 0.5) * 4;
      ctx.fillStyle = i % 2 === 0 ? '#D4A537' : '#2F4A8A';
      ctx.fillRect(i * (barWidth + 3), canvas.height - h, barWidth, h);
    }
  };

  const renderFrequencyVisualizer = () => {
    const canvas = visualizerCanvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#120E1E';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const bars = 32;
      const barWidth = (canvas.width / bars) - 3;
      for (let i = 0; i < bars; i++) {
        const val = dataArray[i] || 0;
        const h = Math.max(5, (val / 255) * (canvas.height - 6));
        ctx.fillStyle = i % 2 === 0 ? '#D4A537' : '#2F4A8A';
        ctx.fillRect(i * (barWidth + 3), canvas.height - h, barWidth, h);
      }
    };
    cancelAnimationFrame(animFrameRef.current);
    draw();
  };

  const stopSoundtrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    cancelAnimationFrame(animFrameRef.current);
    setIsPlaying(false);
    setActiveTrack(null);
    setTrackProgress(0);
    drawIdleVisualizer();
  };

  const playTrack = async (track) => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (activeTrack && activeTrack.id === track.id) {
      if (isPlaying) {
        audioEl.pause();
        cancelAnimationFrame(animFrameRef.current);
        setIsPlaying(false);
      } else {
        await audioEl.play();
        setIsPlaying(true);
        renderFrequencyVisualizer();
      }
      return;
    }

    try {
      audioEl.src = encodeURI(track.src);
      audioEl.load();

      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }

      if (!sourceNodeRef.current) {
        sourceNodeRef.current = audioCtxRef.current.createMediaElementSource(audioEl);
        analyserRef.current = audioCtxRef.current.createAnalyser();
        analyserRef.current.fftSize = 64;
        sourceNodeRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioCtxRef.current.destination);
      }

      await audioEl.play();
      setActiveTrack(track);
      setIsPlaying(true);
      renderFrequencyVisualizer();
      showToast(`${lang === 'en' ? 'Playing' : 'Reproduciendo'}: ${track.titulo}`);
    } catch (err) {
      console.error('Error al reproducir pista:', err);
      showToast(lang === 'en' ? 'Could not load audio file.' : 'No se pudo cargar el archivo de audio.');
    }
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    drawIdleVisualizer();
    return () => { cancelAnimationFrame(animFrameRef.current); };
  }, []);

  // ---------------------------------------------------------
  // 3. LÓGICA DEL SIMULADOR DE COMBATE POR TURNOS
  // ---------------------------------------------------------
  const resetCombatDemo = () => {
    setCombat({
      heroHp: 150, heroMaxHp: 150, heroMp: 80, enemyHp: 220, enemyMaxHp: 220, realm: 'light', finished: false,
      logs: [{ text: t.combat.logReset, highlight: true }]
    });
  };

  const executeCombatTurn = (action) => {
    if (combat.finished) { resetCombatDemo(); return; }
    let { heroHp, heroMaxHp, heroMp, enemyHp, enemyMaxHp, realm, logs } = combat;
    const newLogs = [...logs];

    if (action === 'attack') {
      const dmg = realm === 'light' ? 38 : 28;
      enemyHp = Math.max(0, enemyHp - dmg);
      newLogs.unshift({ text: lang === 'en' ? `🗡️ Opal executes Primordial Slash and deals ${dmg} damage to the Dark Mass.` : `🗡️ Ópalo ejecuta Corte Primordial e inflige ${dmg} de daño a la Masa Oscura.`, highlight: false });
    } else if (action === 'skill') {
      if (heroMp < 25) {
        newLogs.unshift({ text: lang === 'en' ? '⚠️ Your Primordial energy (MP) is unstable. You cannot use Loop Fury.' : '⚠️ Tu energía Primordial (MP) es inestable. No puedes usar la Furia del Bucle.', highlight: false });
        setCombat({ ...combat, logs: newLogs });
        return;
      }
      heroMp -= 25;
      const dmg = realm === 'light' ? 65 : 45;
      enemyHp = Math.max(0, enemyHp - dmg);
      newLogs.unshift({ text: lang === 'en' ? `✨ Opal channels Creation! Loop Fury deals ${dmg} critical damage.` : `✨ ¡Ópalo canaliza la Creación! Furia del Bucle causa ${dmg} de daño crítico.`, highlight: true });
    } else if (action === 'shift') {
      realm = realm === 'light' ? 'void' : 'light';
      heroMp = Math.min(80, heroMp + 20);
      newLogs.unshift({ text: lang === 'en' ? `🌀 Opal embraces his inner Destruction and shifts to the ${realm === 'light' ? 'Realm of Light' : 'Realm of Void'}! (+20 MP)` : `🌀 ¡Ópalo abraza su Destrucción interna y cambia al ${realm === 'light' ? 'Reino de la Luz' : 'Reino del Vacío'}! (+20 MP)`, highlight: true });
    } else if (action === 'heal') {
      heroHp = Math.min(heroMaxHp, heroHp + 55);
      newLogs.unshift({ text: lang === 'en' ? '🧪 You drink Exorcist Holy Water and stop the corrosion (+55 HP).' : '🧪 Bebes Agua Sagrada Exorcista y detienes la corrosión (+55 HP).', highlight: false });
    }

    if (enemyHp <= 0) {
      newLogs.unshift({ text: lang === 'en' ? '🏆 VICTORY! The Dark Mass disintegrates. You purified the zone and protect the Guild.' : '🏆 ¡VICTORIA! La Masa Oscura se desintegra. Purificaste la zona y proteges al Gremio.', highlight: true });
      setCombat({ ...combat, heroHp, heroMp, enemyHp, realm, finished: true, logs: newLogs });
      showToast(lang === 'en' ? 'Corrosion eliminated successfully!' : '¡Corrosión eliminada con éxito!');
      return;
    }

    const enemyDmg = realm === 'void' ? 18 : 28;
    heroHp = Math.max(0, heroHp - enemyDmg);
    newLogs.unshift({ text: lang === 'en' ? `💀 The Dark Mass infects you with Abyssal Touch (-${enemyDmg} HP).` : `💀 La Masa Oscura te infecta con Toque Abisal (-${enemyDmg} HP).`, highlight: false });

    let finished = false;
    if (heroHp <= 0) {
      finished = true;
      newLogs.unshift({ text: lang === 'en' ? '⏳ Destruction has consumed you... But you will wake up amnesiac in a new loop.' : '⏳ La Destrucción te ha consumido... Pero despertarás amnésico en un nuevo bucle.', highlight: true });
    }

    setCombat({ heroHp, heroMaxHp, heroMp, enemyHp, enemyMaxHp, realm, finished, logs: newLogs });
  };

  // ---------------------------------------------------------
  // 4. FILTRADO DEL GRIMORIO WIKI CON VALIDACIONES SEGURAS
  // ---------------------------------------------------------
  const getFilteredWikiItems = () => {
    const q = wikiSearch.toLowerCase().trim();
    const currentCategory = WIKI_CATEGORIES[activeWikiTab] || { titulo: '', desc: '', items: [] };

    if (!q) { 
      return { 
        headerTitle: currentCategory.titulo, 
        headerDesc: currentCategory.desc, 
        items: currentCategory.items || [] 
      }; 
    }
    
    const matches = [];
    Object.values(WIKI_CATEGORIES).forEach((cat) => {
      if (!cat || !cat.items) return; 
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
      headerTitle: lang === 'en' ? `Search results for: "${wikiSearch}"` : `Resultados de búsqueda: "${wikiSearch}"`, 
      headerDesc: lang === 'en' ? `Showing ${matches.length} matches found in all Grimoire scrolls.` : `Mostrando ${matches.length} coincidencias encontradas en todos los pergaminos del Grimorio.`, 
      items: matches 
    };
  };

  const wikiView = getFilteredWikiItems();
  const currentLoop = LOOP_PHASES[selectedLoopIdx];
  const currentRegion = MAP_REGIONS[selectedRegionIdx];

  return (
    <div className="min-h-screen flex flex-col selection:bg-goldPrimary selection:text-dualityDeep overflow-x-hidden">
      <audio ref={audioRef} onTimeUpdate={() => setTrackProgress(audioRef.current?.currentTime || 0)} onLoadedMetadata={() => setTrackDuration(audioRef.current?.duration || 0)} onEnded={() => { setIsPlaying(false); cancelAnimationFrame(animFrameRef.current); drawIdleVisualizer(); }} crossOrigin="anonymous" />

      <style>{`
        @keyframes heroFloat { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-10px) scale(1.03); } }
        @keyframes portraitBreathe { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-5px) scale(1.04); } }
        @keyframes holographicSweep { 0% { transform: translateX(-140%) skewX(-20deg); } 100% { transform: translateX(240%) skewX(-20deg); } }
        @keyframes auraPulseGold { 0%, 100% { filter: drop-shadow(0 6px 12px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(212, 165, 55, 0.45)); } 50% { filter: drop-shadow(0 12px 18px rgba(0,0,0,0.9)) drop-shadow(0 0 22px rgba(240, 207, 110, 0.95)); } }
        .sprite-hero-anim { animation: heroFloat 4.2s ease-in-out infinite, auraPulseGold 4.2s ease-in-out infinite; }
        .sprite-card-anim { animation: portraitBreathe 3.6s ease-in-out infinite; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.85)) drop-shadow(0 0 8px rgba(212, 165, 55, 0.35)); transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
        .wiki-card-pro:hover .sprite-card-anim { transform: translateY(-8px) scale(1.14) !important; filter: drop-shadow(0 12px 16px rgba(0,0,0,0.95)) drop-shadow(0 0 18px rgba(240, 207, 110, 0.95)); }
        .shimmer-layer::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(240, 207, 110, 0.32), transparent); transform: translateX(-140%) skewX(-20deg); pointer-events: none; }
        .wiki-card-pro:hover .shimmer-layer::after { animation: holographicSweep 1.1s ease-in-out; }
      `}</style>

      {/* =========================================================
          1. BARRA DE NAVEGACIÓN PRINCIPAL
          ========================================================= */}
      <header className="sticky top-0 z-40 bg-[#151024]/95 backdrop-blur-md border-b-2 border-goldPrimary/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          
          <a href="#inicio" onClick={() => setActiveNav('inicio')} className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-11 h-11 shrink-0 rounded-full bg-gradient-to-b from-guildBlue/90 to-dualityDeep border-2 border-goldPrimary flex items-center justify-center shadow-[0_0_15px_rgba(212,165,55,0.4)] group-hover:scale-110 group-hover:border-goldLight transition-all duration-300">
              <div className="absolute inset-0.5 rounded-full border border-dashed border-goldLight/60 rune-orbit-reverse"></div>
              <img src="/ouroboros-dorado.png" alt="Logo Duality Ouroboros" className="w-8 h-8 object-contain nav-ouroboros-anim relative z-10" />
            </div>
            <div>
              <span className="font-display font-black text-xl text-goldLight tracking-widest block leading-none group-hover:text-white transition-colors">DUALITY</span>
              <span className="text-[10px] font-fantasy text-slate-300 tracking-wider">{t.hero.subtitle}</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-0.5 text-[11px] font-fantasy font-bold tracking-wider">
            {[
              { id: 'soundtrack', label: t.nav.soundtrack }, { id: 'historia', label: t.nav.history },
              { id: 'grimorio', label: t.nav.grimoire }, { id: 'combate', label: t.nav.combat },
              { id: 'mapa', label: t.nav.map }, { id: 'requisitos', label: t.nav.reqs }, { id: 'equipo', label: t.nav.studio }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setActiveNav(item.id)} className={`px-2.5 py-1.5 rounded-lg transition ${activeNav === item.id ? 'bg-guildBlue text-goldLight border border-goldPrimary/50 shadow' : 'text-slate-200 hover:text-goldLight hover:bg-guildBlue/60'}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={toggleLanguage} title={t.buttons.toggleLang} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-guildBlue/30 hover:bg-guildBlue/80 text-goldLight border border-goldPrimary/40 transition shadow font-fantasy text-xs font-bold">
              <Globe className="w-4 h-4" /> <span className="hidden md:inline">{lang.toUpperCase()}</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <div onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-goldPrimary text-goldLight font-fantasy text-xs cursor-pointer transition-all shadow-[0_0_10px_rgba(212,165,55,0.2)]" title={t.buttons.changeBadge}>
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-goldPrimary bg-black shrink-0">
                    <img src={currentAvatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold hidden md:inline uppercase">{user.username}</span>
                </div>
                <button onClick={async () => { await auth.signOut(); localStorage.removeItem('duality_user'); setUser(null); showToast(t.toast.logoutSuccess); }} title={t.buttons.logout} className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={() => setAuthModalOpen(true)} className="px-3 py-2 rounded-xl bg-[#1E1830] hover:bg-guildBlue text-goldLight border border-goldPrimary font-fantasy font-bold text-xs transition">
                {t.buttons.login}
              </button>
            )}

            <button onClick={() => setDownloadsModalOpen(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-goldPrimary to-goldLight text-dualityDeep font-fantasy font-extrabold text-xs shadow-lg hover:brightness-110 transition">
              <Download className="w-4 h-4" /> <span className="hidden md:inline">{t.buttons.install}</span>
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-lg bg-dualityDeep border border-goldPrimary/50 text-goldLight">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#120E1E] border-t border-goldPrimary/40 px-4 py-4 font-fantasy text-xs">
            <div className="grid grid-cols-2 gap-2">
              <a href="#soundtrack" onClick={() => { setActiveNav('soundtrack'); setMobileMenuOpen(false); }} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">🎵 {t.nav.soundtrack}</a>
              <a href="#historia" onClick={() => { setActiveNav('historia'); setMobileMenuOpen(false); }} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">📜 {t.nav.history}</a>
              <a href="#grimorio" onClick={() => { setActiveNav('grimorio'); setMobileMenuOpen(false); }} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">📖 {t.nav.grimoire}</a>
              <a href="#combate" onClick={() => { setActiveNav('combate'); setMobileMenuOpen(false); }} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">⚔️ {t.nav.combat}</a>
              <a href="#mapa" onClick={() => { setActiveNav('mapa'); setMobileMenuOpen(false); }} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">🗺️ {t.nav.map}</a>
              <a href="#requisitos" onClick={() => { setActiveNav('requisitos'); setMobileMenuOpen(false); }} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">💻 {t.nav.reqs}</a>
              <a href="#equipo" onClick={() => { setActiveNav('equipo'); setMobileMenuOpen(false); }} className="p-2.5 rounded bg-guildBlue/30 text-goldLight border border-goldPrimary/30">🛡️ {t.nav.studio}</a>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          2. HERO PRINCIPAL
          ========================================================= */}
      <section id="inicio" className="relative z-10 py-14 sm:py-20 px-4 border-b-2 border-goldPrimary/40 overflow-hidden w-full">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-guildBlue/70 border border-goldPrimary text-goldLight text-xs font-fantasy tracking-widest shadow">
              <span className="w-2 h-2 rounded-full bg-goldLight animate-ping"></span>
              {t.hero.badge}
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-goldLight via-goldPrimary to-[#9E7419] tracking-widest drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] break-words w-full">
              DUALITY
            </h1>

            <p className="text-xl sm:text-2xl font-fantasy text-parchmentLight leading-snug">{t.hero.quote}</p>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">{t.hero.desc}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#combate" onClick={() => setActiveNav('combate')} className="w-full sm:w-auto px-6 py-4 rounded-xl bg-guildBlue hover:bg-guildBlueLight text-goldLight font-fantasy font-bold text-sm border-2 border-goldPrimary/70 flex items-center justify-center gap-2 transition shadow-lg">
                <Swords className="w-5 h-5" /> <span>{t.hero.btnDemo}</span>
              </a>
              <a href="#grimorio" onClick={() => setActiveNav('grimorio')} className="w-full sm:w-auto px-5 py-4 rounded-xl bg-dualityDeep/90 hover:bg-dualityDeep text-parchmentLight font-fantasy font-semibold text-sm border border-goldPrimary/40 flex items-center justify-center gap-2 transition">
                <BookOpen className="w-4 h-4 text-goldPrimary" /> <span>{t.hero.btnWiki}</span>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-300 font-fantasy">
              <span className="px-3 py-1.5 rounded-lg bg-[#120E1E]/90 border border-goldPrimary/30 flex items-center gap-1.5"><Monitor className="w-4 h-4 text-goldPrimary" /> {t.hero.tagPc}</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#120E1E]/90 border border-goldPrimary/30 flex items-center gap-1.5"><Smartphone className="w-4 h-4 text-goldPrimary" /> {t.hero.tagAndroid}</span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> {t.hero.tagOffline}</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-guildBlue/50 via-goldPrimary/30 to-ribbonRed/40 blur-2xl animate-pulse"></div>
              <svg className="absolute inset-0 w-full h-full rune-orbit-reverse pointer-events-none" viewBox="0 0 240 240" fill="none">
                <circle cx="120" cy="120" r="114" stroke="#D4A537" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.6" />
                <circle cx="120" cy="120" r="104" stroke="#2F4A8A" strokeWidth="3" opacity="0.85" />
                <circle cx="120" cy="120" r="95" stroke="#F0CF6E" strokeWidth="1" strokeDasharray="12 6" opacity="0.5" />
                <polygon points="120,2 124,14 116,14" fill="#F0CF6E" />
                <polygon points="120,238 124,226 116,226" fill="#F0CF6E" />
                <polygon points="2,120 14,124 14,116" fill="#F0CF6E" />
                <polygon points="238,120 226,124 226,116" fill="#F0CF6E" />
              </svg>
              <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[#120E1E]/90 border border-goldPrimary/30 shadow-inner"></div>
              <img src="/ouroboros-dorado.png" alt="Emblema Ouroboros Duality" className="w-48 h-48 sm:w-64 sm:h-64 object-contain ouroboros-spin relative z-10 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute -bottom-3 bg-[#120E1E] border-2 border-goldPrimary px-5 py-2 rounded-full shadow-[0_0_20px_rgba(212,165,55,0.5)] text-center z-20">
                <span className="font-fantasy text-xs font-bold text-goldLight tracking-widest">{t.hero.cycle}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. SOUNDTRACK OFICIAL
          ========================================================= */}
      <section id="soundtrack" className="relative z-10 py-14 px-4 bg-[#141022]/90 border-y-2 border-goldPrimary/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-900/60 border border-goldPrimary text-goldLight font-fantasy text-xs">
              <Music className="w-4 h-4" /> {t.soundtrack.badge}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-goldLight">{t.soundtrack.title}</h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {t.soundtrack.desc}
            </p>

            <div className="p-5 rounded-2xl bg-[#1E1830] border-2 border-goldPrimary shadow-2xl space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-fantasy text-goldPrimary uppercase tracking-widest">
                    {isPlaying ? t.soundtrack.playing : t.soundtrack.paused}
                  </span>
                  <h4 className="font-fantasy font-bold text-lg text-goldLight">
                    {activeTrack ? activeTrack.titulo : t.soundtrack.select}
                  </h4>
                </div>
                {activeTrack && (
                  <button onClick={stopSoundtrack} className="px-3 py-1.5 rounded-lg bg-ribbonRed text-white font-fantasy text-xs font-bold flex items-center gap-1 shrink-0 hover:brightness-110">
                    <Square className="w-3.5 h-3.5" /> {t.soundtrack.stop}
                  </button>
                )}
              </div>

              <canvas ref={visualizerCanvasRef} width="400" height="64" className="w-full h-16 rounded-lg bg-[#120E1E] border border-goldPrimary/30"></canvas>

              {activeTrack && (
                <div className="space-y-1">
                  <input type="range" min="0" max={trackDuration || 100} value={trackProgress} onChange={(e) => { const val = Number(e.target.value); if (audioRef.current) audioRef.current.currentTime = val; setTrackProgress(val); }} className="w-full accent-goldPrimary cursor-pointer h-1.5 rounded-lg bg-[#120E1E]" />
                  <div className="flex justify-between text-[11px] font-fantasy text-goldLight/80">
                    <span>{formatTime(trackProgress)}</span>
                    <span>{formatTime(trackDuration)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <PergaminoBox bodyClassName="space-y-3">
              <div className="flex items-center justify-between border-b border-[#8F7643]/40 pb-2">
                <h3 className="font-fantasy font-bold text-lg text-guildBlue flex items-center gap-2">
                  <Disc className="w-5 h-5 text-ribbonRed" /> {t.soundtrack.catalog}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                {SOUNDTRACK_LIST.map((track) => {
                  const isCurrent = activeTrack?.id === track.id;
                  return (
                    <div key={track.id} onClick={() => playTrack(track)} className={`cursor-pointer flex items-center justify-between gap-3 p-3 rounded-xl border transition ${isCurrent ? 'bg-guildBlue/20 border-guildBlue shadow-md' : 'bg-[#3B2A1A]/10 border-[#8F7643]/50 hover:bg-[#3B2A1A]/20'}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <button type="button" className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition shadow ${isCurrent && isPlaying ? 'bg-ribbonRed text-white animate-pulse' : 'bg-guildBlue text-goldLight hover:scale-105'}`}>
                          {isCurrent && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <div className="min-w-0">
                          <h4 className="font-fantasy font-bold text-xs sm:text-sm text-parchmentText truncate">{track.titulo}</h4>
                          <p className="text-[11px] text-parchmentText/80 truncate">{track.subtitulo}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </PergaminoBox>
          </div>
        </div>
      </section>

      {/* =========================================================
          3.5 CARRUSEL DE ESCENARIOS Y BIOMAS
          ========================================================= */}
      <BiomesCarousel lang={lang} />

        {/* =========================================================
          3.6 VIDEO TEASER PROMOCIONAL
          ========================================================= */}

      <VideoTeaserSection lang={lang} />

      {/* =========================================================
          4. HISTORIA Y BUCLE
          ========================================================= */}
      <section id="historia" className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="px-3 py-1 rounded bg-guildBlue/60 border border-goldPrimary/50 text-goldLight font-fantasy text-xs tracking-widest">
            {t.story.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-goldLight">{t.story.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <PergaminoBox>
              <div className="pergamino-ornamento space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-[#8F7643]/40 pb-3">
                  <BookOpen className="w-7 h-7 text-ribbonRed" />
                  <div>
                    <h3 className="font-display text-2xl font-bold text-parchmentText">{t.story.box1Title}</h3>
                    <span className="text-xs font-fantasy font-bold text-guildBlue">{t.story.box1Sub}</span>
                  </div>
                </div>

                <div className="w-full rounded-2xl border-2 border-goldPrimary/80 overflow-hidden relative bg-[radial-gradient(ellipse_at_center,_#2F4A8A_0%,_#151024_55%,_#090612_100%)] p-5 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]">
                  <svg className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rune-orbit-reverse opacity-25 pointer-events-none" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="88" stroke="#F0CF6E" strokeWidth="2" strokeDasharray="8 6" fill="none" />
                    <circle cx="100" cy="100" r="70" stroke="#D4A537" strokeWidth="1" fill="none" />
                  </svg>
                  <svg className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rune-orbit-reverse opacity-25 pointer-events-none" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="88" stroke="#EF4444" strokeWidth="2" strokeDasharray="8 6" fill="none" />
                    <circle cx="100" cy="100" r="70" stroke="#F0CF6E" strokeWidth="1" fill="none" />
                  </svg>

                  <div className="relative z-10 grid grid-cols-2 gap-4 items-end justify-items-center">
                    
                    {/* ÓPALO */}
                    <div onClick={() => setInspectedItem(WIKI_CATEGORIES.personajes?.items[0])} className="flex flex-col items-center text-center group cursor-pointer">
                      <div className="h-60 sm:h-68 flex items-end justify-center relative">
                        <div className="absolute -inset-3 rounded-full bg-goldPrimary/20 blur-xl group-hover:bg-goldLight/40 transition-all"></div>
                        <SmartChromaSprite src="/personajes/Opalo.webp" alt="Ópalo - Ser Primordial" className="h-full w-auto object-contain sprite-hero-anim relative z-10 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="mt-3 relative z-20">
                        <span className="px-4 py-1 rounded-full bg-gradient-to-r from-guildBlue to-[#1a2d5c] border border-goldLight text-goldLight font-fantasy font-black text-xs sm:text-sm tracking-wider shadow-[0_0_15px_rgba(212,165,55,0.6)] group-hover:shadow-[0_0_25px_rgba(240,207,110,1)] transition-all">ÓPALO</span>
                        <span className="block mt-1 text-[10px] text-parchmentLight font-bold uppercase tracking-widest">Primordial (Él)</span>
                      </div>
                    </div>

                    {/* ZYREN */}
                    <div onClick={() => setInspectedItem(WIKI_CATEGORIES.personajes?.items[1])} className="flex flex-col items-center text-center group cursor-pointer">
                      <div className="h-60 sm:h-68 flex items-end justify-center relative">
                        <div className="absolute -inset-3 rounded-full bg-ribbonRed/25 blur-xl group-hover:bg-ribbonRed/50 transition-all"></div>
                        <SmartChromaSprite src="/personajes/Zyren.webp" alt="Zyren - Ser Primordial" className="h-full w-auto object-contain sprite-hero-anim relative z-10 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="mt-3 relative z-20">
                        <span className="px-4 py-1 rounded-full bg-gradient-to-r from-ribbonRed to-[#540c0c] border border-goldLight text-goldLight font-fantasy font-black text-xs sm:text-sm tracking-wider shadow-[0_0_15px_rgba(185,28,28,0.6)] group-hover:shadow-[0_0_25px_rgba(240,207,110,1)] transition-all">ZYREN</span>
                        <span className="block mt-1 text-[10px] text-parchmentLight font-bold uppercase tracking-widest">Primordial (Ella)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-base leading-relaxed pt-2">
                  <p><strong>{t.story.p1}</strong> {t.story.p1Desc}</p>
                  <p><strong>{t.story.p2}</strong> {t.story.p2Desc}</p>
                </div>
              </div>
            </PergaminoBox>
          </div>

          <div className="lg:col-span-5">
            <PergaminoBox bodyClassName="space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-[#8F7643]/40 pb-3 pt-1">
                <Clock className="w-7 h-7 text-ribbonRed" />
                <div>
                  <h3 className="font-display text-xl font-bold text-parchmentText">{t.story.box2Title}</h3>
                  <span className="text-xs font-fantasy font-bold text-guildBlue">{t.story.box2Sub}</span>
                </div>
              </div>

              <p className="text-sm">{t.story.box2Desc}</p>

              <div className="grid grid-cols-2 gap-2 font-fantasy text-xs">
                {LOOP_PHASES.map((phase, idx) => (
                  <button key={idx} onClick={() => setSelectedLoopIdx(idx)} className={`p-2.5 rounded-lg font-bold border transition text-left ${selectedLoopIdx === idx ? 'bg-guildBlue text-goldLight border-goldPrimary shadow' : 'bg-[#3B2A1A]/15 text-parchmentText border-[#8F7643] hover:bg-[#3B2A1A]/25'}`}>
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
          5. GRIMORIO WIKI
          ========================================================= */}
      <section id="grimorio" className="relative z-10 py-16 px-4 bg-[#141022]/90 border-y-2 border-goldPrimary/40">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 rounded bg-guildBlue/70 border border-goldPrimary/50 text-goldLight font-fantasy text-xs tracking-widest">
                {t.wiki.badge}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-goldLight">{t.wiki.title}</h2>
              <p className="text-slate-300 text-base">{t.wiki.desc}</p>
            </div>

            <div className="w-full md:w-96 relative">
              <input type="text" value={wikiSearch} onChange={(e) => setWikiSearch(e.target.value)} placeholder={t.wiki.search} className="w-full pl-4 pr-11 py-3 rounded-xl bg-[#1E1830] border-2 border-goldPrimary text-parchmentLight placeholder-slate-400 font-serifBody text-base focus:outline-none focus:ring-2 focus:ring-goldLight shadow-inner" />
              <Search className="w-5 h-5 text-goldLight absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 font-fantasy text-xs sm:text-sm font-bold">
            {[
              { key: 'personajes', label: t.wiki.tabs[0], Icon: Users },
              { key: 'clases', label: t.wiki.tabs[1], Icon: Shield },
              { key: 'items', label: t.wiki.tabs[2], Icon: Backpack },
              { key: 'enemigos', label: t.wiki.tabs[3], Icon: Skull },
              { key: 'gremio', label: t.wiki.tabs[4], Icon: Award },
              { key: 'razas', label: t.wiki.tabs[5], Icon: Flag }
            ].map(({ key, label, Icon }) => (
              <button key={key} onClick={() => { setActiveWikiTab(key); setWikiSearch(''); }} className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition ${activeWikiTab === key && !wikiSearch ? 'bg-goldPrimary text-dualityDeep shadow-lg font-extrabold' : 'bg-[#1E1830] text-goldLight border border-goldPrimary/40 hover:bg-guildBlue/50'}`}>
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
                {wikiView.items.length} {t.wiki.records}
              </span>
            </div>

            {wikiView.items.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="font-display text-xl font-bold text-parchmentText">{t.wiki.noResults}</p>
                <p className="text-sm text-parchmentText/80">{t.wiki.tryAnother}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {wikiView.items.map((item, idx) => (
                  <div key={idx} onClick={() => item.imagen && setInspectedItem(item)} className={`wiki-card-pro p-4 rounded-2xl bg-[#3B2A1A]/10 border-2 border-[#8F7643]/70 hover:border-guildBlue hover:bg-[#3B2A1A]/20 transition-all duration-300 flex gap-4 items-center shadow-md hover:shadow-xl ${item.imagen ? 'cursor-pointer' : ''}`}>
                    {item.imagen ? (
                      <div className="shimmer-layer relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl bg-[radial-gradient(circle_at_50%_35%,_#2F4A8A_0%,_#161124_65%,_#0B0813_100%)] border-2 border-goldPrimary flex items-center justify-center shrink-0 overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.65)] p-1.5">
                        <div className="absolute w-24 h-24 rounded-full border border-dashed border-goldLight/40 rune-orbit-reverse pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0813] via-transparent to-transparent opacity-60 pointer-events-none z-10"></div>
                        <SmartChromaSprite src={item.imagen} alt={item.nombre} className="w-full h-full object-contain object-top sprite-card-anim relative z-10" />
                        <span className="absolute bottom-1.5 right-1.5 z-20 p-1 rounded-full bg-black/70 border border-goldPrimary/60 text-goldLight opacity-80"><Eye className="w-3.5 h-3.5" /></span>
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-guildBlue text-goldLight border-2 border-goldPrimary flex items-center justify-center shrink-0 shadow-lg">
                        <Sparkles className="w-7 h-7 animate-pulse" />
                      </div>
                    )}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display font-black text-lg text-parchmentText leading-tight">{item.nombre}</h4>
                      </div>
                      <div className="text-xs font-fantasy font-bold text-ribbonRed tracking-wide">{item.subtitulo}</div>
                      <p className="text-sm text-parchmentText leading-relaxed">{item.descripcion}</p>
                      <div className="pt-1.5 mt-1.5 border-t border-[#8F7643]/40 text-xs font-fantasy font-bold text-guildBlue flex items-center justify-between">
                        <span>{item.extra}</span>
                        {item.imagen && <span className="text-[10px] text-ribbonRed underline">{t.wiki.fullArt}</span>}
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
          6. SIMULADOR DE COMBATE
          ========================================================= */}
      <section id="combate" className="relative z-10 py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="px-3 py-1 rounded bg-guildBlue/60 border border-goldPrimary/50 text-goldLight font-fantasy text-xs tracking-widest">
            {t.combat.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-goldLight">{t.combat.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#141022] border-2 border-goldPrimary shadow-2xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-goldPrimary/30 pb-3">
              <div className="flex items-center gap-2">
                <Swords className="w-6 h-6 text-goldPrimary" />
                <h3 className="font-fantasy font-bold text-lg text-goldLight">{t.combat.box1Title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full font-fantasy text-xs font-bold border transition-colors ${combat.realm === 'light' ? 'bg-amber-500/20 border-goldLight text-goldLight shadow-[0_0_10px_rgba(212,165,55,0.4)]' : 'bg-purple-950 border-purple-400 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.4)]'}`}>
                  {lang === 'en' ? 'Magic: ' : 'Magia: '} {combat.realm === 'light' ? t.combat.magicLight : t.combat.magicVoid}
                </span>
                <button onClick={resetCombatDemo} className="px-2.5 py-1 rounded bg-guildBlue text-goldLight text-xs font-fantasy hover:bg-guildBlueLight">
                  {t.combat.reset}
                </button>
              </div>
            </div>

            <div className={`relative rounded-xl p-5 grid grid-cols-2 gap-4 items-center min-h-[220px] border transition-all duration-700 ${combat.realm === 'light' ? 'bg-gradient-to-b from-[#2F4A8A]/40 to-[#1E1830] border-goldPrimary/50 shadow-inner' : 'bg-gradient-to-b from-[#4a0b25]/80 to-[#090612] border-ribbonRed/50 shadow-inner'}`}>
              
              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className={`relative w-28 h-32 rounded-2xl border-2 flex items-center justify-center overflow-hidden p-1 transition-all duration-500 ${combat.realm === 'light' ? 'bg-[radial-gradient(circle,_#2F4A8A_0%,_#120E1E_100%)] border-goldLight shadow-[0_0_25px_rgba(212,165,55,0.5)]' : 'bg-[radial-gradient(circle,_#581c87_0%,_#090612_100%)] border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.6)]'}`}>
                  <SmartChromaSprite src="/personajes/Opalo.webp" alt="Ópalo en combate" className="w-full h-full object-contain object-top sprite-card-anim" />
                </div>
                <div className="w-full max-w-[180px] space-y-1">
                  <div className="flex justify-between text-xs font-fantasy font-bold">
                    <span className="text-goldLight">{lang === 'en' ? 'Opal' : 'Ópalo'}</span>
                    <span>{combat.heroHp} / {combat.heroMaxHp}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-goldPrimary/40">
                    <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(combat.heroHp / combat.heroMaxHp) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[11px] font-fantasy text-sky-300">
                    <span>{t.combat.energy}</span>
                    <span>{combat.heroMp} / 80</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 group">
                <div className="w-24 h-24 rounded-2xl bg-[#0a0505] border-2 border-ribbonRed flex items-center justify-center shadow-[0_0_25px_rgba(185,28,28,0.6)] animate-pulse">
                  <Skull className="w-12 h-12 text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                </div>
                <div className="w-full max-w-[180px] space-y-1">
                  <div className="flex justify-between text-xs font-fantasy font-bold">
                    <span className="text-red-400">{t.combat.enemy}</span>
                    <span>{combat.enemyHp} / {combat.enemyMaxHp}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-red-500/40">
                    <div className="h-full bg-ribbonRed transition-all duration-300" style={{ width: `${(combat.enemyHp / combat.enemyMaxHp) * 100}%` }}></div>
                  </div>
                  <span className="text-[10px] font-fantasy text-amber-300 block">
                    {combat.realm === 'light' ? t.combat.dangerLight : t.combat.dangerVoid}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-fantasy text-xs">
              <button onClick={() => executeCombatTurn('attack')} className="p-3 rounded-xl bg-guildBlue hover:bg-guildBlueLight text-goldLight font-bold border border-goldPrimary/50 flex flex-col items-center gap-1 transition shadow hover:-translate-y-1">
                <Sword className="w-4 h-4" /> <span>{t.combat.btnAttack}</span>
              </button>
              <button onClick={() => executeCombatTurn('skill')} className="p-3 rounded-xl bg-amber-800 hover:bg-amber-700 text-goldLight font-bold border border-goldPrimary/50 flex flex-col items-center gap-1 transition shadow hover:-translate-y-1">
                <Sparkles className="w-4 h-4" /> <span>{t.combat.btnSkill}</span>
              </button>
              <button onClick={() => executeCombatTurn('shift')} className="p-3 rounded-xl bg-purple-900 hover:bg-purple-800 text-goldLight font-bold border border-goldPrimary/50 flex flex-col items-center gap-1 transition shadow hover:-translate-y-1">
                <Repeat className="w-4 h-4" /> <span>{t.combat.btnShift}</span>
              </button>
              <button onClick={() => executeCombatTurn('heal')} className="p-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-goldLight font-bold border border-goldPrimary/50 flex flex-col items-center gap-1 transition shadow hover:-translate-y-1">
                <FlaskConical className="w-4 h-4" /> <span>{t.combat.btnHeal}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0D0A16] border border-goldPrimary/30 text-xs font-serifBody text-parchmentLight h-32 overflow-y-auto space-y-1.5 scroll-smooth">
              {combat.logs.map((log, index) => (
                <p key={index} className={`border-b border-white/5 pb-1 ${log.highlight ? 'text-goldLight font-bold' : 'text-slate-300'}`}>
                  {log.text}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <PergaminoBox bodyClassName="space-y-4">
              <div className="flex items-center gap-3 border-b-2 border-[#8F7643]/40 pb-2">
                <Gamepad2 className="w-6 h-6 text-ribbonRed" />
                <h3 className="font-display text-xl font-bold text-parchmentText">{t.combat.box2Title}</h3>
              </div>
              <p className="text-sm leading-relaxed">{t.combat.box2Desc}</p>
              <div className="space-y-2.5 text-sm">
                <div className="p-2.5 rounded-lg bg-[#3B2A1A]/10 border border-[#8F7643] hover:bg-[#3B2A1A]/20 transition-colors">
                  <span className="font-fantasy font-bold text-guildBlue block text-xs">{t.combat.moveTitle}</span>
                  {t.combat.moveDesc}
                </div>
                <div className="p-2.5 rounded-lg bg-[#3B2A1A]/10 border border-[#8F7643] hover:bg-[#3B2A1A]/20 transition-colors">
                  <span className="font-fantasy font-bold text-guildBlue block text-xs">{t.combat.dodgeTitle}</span>
                  {t.combat.dodgeDesc}
                </div>
                <div className="p-2.5 rounded-lg bg-[#3B2A1A]/10 border border-[#8F7643] hover:bg-[#3B2A1A]/20 transition-colors">
                  <span className="font-fantasy font-bold text-ribbonRed block text-xs">{t.combat.useTitle}</span>
                  {t.combat.useDesc}
                </div>
              </div>
            </PergaminoBox>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. MAPA INTERACTIVO OFICIAL
          ========================================================= */}
      <section id="mapa" className="relative z-10 py-16 px-4 bg-[#141022]/90 border-y-2 border-goldPrimary/40">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded bg-guildBlue/60 border border-goldPrimary/50 text-goldLight font-fantasy text-xs tracking-widest">
              {t.map.badge}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-goldLight">{t.map.title}</h2>
            <p className="text-slate-300 text-sm sm:text-base">{t.map.desc}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 p-2 sm:p-3 rounded-2xl bg-[#1E1830] border-4 border-goldPrimary shadow-[0_0_35px_rgba(0,0,0,0.85)] relative group">
              <div className="relative w-full overflow-hidden rounded-xl border-2 border-[#3B2A1A]">
                <img src="/MapaDuality.webp" alt="Mapa Oficial del Mundo de Duality" className="w-full h-auto block select-none" />
                {MAP_REGIONS.map((region, idx) => {
                  const isSelected = selectedRegionIdx === idx;
                  return (
                    <button key={region.id} onClick={() => setSelectedRegionIdx(idx)} style={{ left: `${region.x}%`, top: `${region.y}%` }} title={region.name} className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin focus:outline-none">
                      {isSelected && <span className="absolute -inset-3 rounded-full bg-goldLight/80 animate-ping shadow-[0_0_20px_rgba(212,165,55,1)]"></span>}
                      <div className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-fantasy font-extrabold text-xs transition-all duration-300 shadow-xl ${isSelected ? 'bg-guildBlue text-goldLight border-2 border-goldLight scale-125 ring-4 ring-goldPrimary/50' : 'bg-ribbonRed/95 text-white border-2 border-goldPrimary hover:scale-125 hover:bg-guildBlue hover:shadow-[0_0_15px_rgba(212,165,55,0.8)]'}`}>
                        {idx + 1}
                      </div>
                      <span className={`hidden sm:block absolute left-1/2 -translate-x-1/2 -bottom-7 px-2.5 py-1 rounded bg-[#120E1E]/95 border border-goldPrimary text-[10px] font-fantasy font-bold whitespace-nowrap pointer-events-none transition-all duration-300 shadow-md ${isSelected ? 'opacity-100 text-goldLight -translate-y-1' : 'opacity-0 group-hover/pin:opacity-100 text-slate-200'}`}>
                        {region.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 px-2 flex flex-wrap items-center justify-between text-[11px] font-fantasy text-slate-300 gap-2">
                <span>{t.map.hint}</span>
                <span className="text-goldLight font-bold">{t.map.activeRegion} {currentRegion.name} ({selectedRegionIdx + 1}/10)</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PergaminoBox bodyClassName="space-y-3.5">
                <div className="flex items-center justify-between gap-2 border-b border-[#8F7643]/40 pb-2">
                  <span className="px-2.5 py-0.5 rounded bg-guildBlue text-goldLight font-fantasy text-[11px] font-bold shadow-sm">{currentRegion.badge}</span>
                  <span className="font-fantasy font-extrabold text-xs text-ribbonRed">{t.map.realm}{selectedRegionIdx + 1}</span>
                </div>
                <h3 className="font-display text-2xl font-black text-parchmentText leading-tight">{currentRegion.title}</h3>
                <p className="text-sm leading-relaxed text-parchmentText">{currentRegion.desc}</p>

                <div className="p-3 rounded-xl bg-[#3B2A1A]/10 border-2 border-[#8F7643]/60 text-xs space-y-1.5 shadow-inner">
                  <div><strong className="font-fantasy text-guildBlue">{t.map.level}</strong> {currentRegion.level}</div>
                  <div><strong className="font-fantasy text-guildBlue">{t.map.hazards}</strong> {currentRegion.hazards}</div>
                  <div><strong className="font-fantasy text-ribbonRed">{t.map.boss}</strong> <em>{currentRegion.boss}</em></div>
                </div>

                <div className="pt-2 border-t border-[#8F7643]/40">
                  <span className="block font-fantasy font-bold text-[11px] text-parchmentText/80 mb-2 uppercase tracking-wider">{t.map.fastTravel}</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {MAP_REGIONS.map((r, i) => (
                      <button key={r.id} onClick={() => setSelectedRegionIdx(i)} className={`px-2.5 py-1.5 rounded-lg font-fantasy text-[11px] font-bold text-left truncate transition-all ${selectedRegionIdx === i ? 'bg-guildBlue text-goldLight border border-goldPrimary shadow-md' : 'bg-[#3B2A1A]/10 hover:bg-[#3B2A1A]/20 hover:text-goldPrimary text-parchmentText border border-[#8F7643]/40'}`}>
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>
              </PergaminoBox>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          8. REQUISITOS DEL SISTEMA
          ========================================================= */}
      <section id="requisitos" className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-goldLight">{t.specs.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          <PergaminoBox className="flex flex-col" bodyClassName="flex-1 space-y-3">
            <h3 className="font-display text-xl font-bold text-guildBlue flex items-center gap-2.5 border-b border-[#8F7643] pb-2">
              <Monitor className="w-5 h-5 text-ribbonRed shrink-0" /> <span>{t.specs.pcTitle}</span>
            </h3>
            <ul className="space-y-2 text-sm">
              <li><strong>{t.specs.os}</strong> {t.specs.pcOs}</li>
              <li><strong>{t.specs.cpu}</strong> {t.specs.pcCpu}</li>
              <li><strong>{t.specs.ram}</strong> {t.specs.pcRam}</li>
              <li><strong>{t.specs.gpu}</strong> {t.specs.pcGpu}</li>
              <li><strong>{t.specs.storage}</strong> {t.specs.pcStorage}</li>
            </ul>
          </PergaminoBox>

          <PergaminoBox className="flex flex-col" bodyClassName="flex-1 space-y-3">
            <h3 className="font-display text-xl font-bold text-guildBlue flex items-center gap-2.5 border-b border-[#8F7643] pb-2">
              <Smartphone className="w-5 h-5 text-ribbonRed shrink-0" /> <span>{t.specs.mobileTitle}</span>
            </h3>
            <ul className="space-y-2 text-sm">
              <li><strong>{t.specs.os}</strong> {t.specs.mobOs}</li>
              <li><strong>{t.specs.cpu}</strong> {t.specs.mobCpu}</li>
              <li><strong>{t.specs.ram}</strong> {t.specs.mobRam}</li>
              <li><strong>{t.specs.gpu}</strong> {t.specs.mobBrowser}</li>
              <li><strong>{t.specs.storage}</strong> {t.specs.mobStorage}</li>
            </ul>
          </PergaminoBox>
        </div>
      </section>

      {/* =========================================================
          9. ESTUDIO DESARROLLADOR
          ========================================================= */}
      <section id="equipo" className="relative z-10 py-16 px-4 bg-[#141022]/90 border-t-2 border-goldPrimary/40">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-goldLight">{t.team.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STUDIO_TEAM.map((member, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#1E1830] border-2 border-goldPrimary/50 shadow-xl space-y-2 hover:-translate-y-1 transition-transform">
                <span className="px-2.5 py-0.5 rounded bg-guildBlue text-goldLight font-fantasy text-[11px] font-bold">{member.rol}</span>
                <h3 className="font-fantasy font-bold text-base text-goldLight">{member.titulo}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          MODAL CENTRO DE DESCARGAS (DISEÑO PREMIUM)
          ========================================================= */}
      {downloadsModalOpen && (
        <div onClick={() => setDownloadsModalOpen(false)} className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="max-w-xl w-full rounded-3xl bg-[radial-gradient(ellipse_at_top,_#251D3A_0%,_#151024_80%)] border-2 border-goldPrimary p-1 relative shadow-[0_0_50px_rgba(212,165,55,0.4)]"
          >
            <button onClick={() => setDownloadsModalOpen(false)} className="absolute -top-3 -right-3 p-2.5 rounded-full bg-[#120E1E] text-goldLight border-2 border-goldPrimary hover:bg-ribbonRed hover:text-white hover:border-ribbonRed transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] z-10">
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              <div className="text-center space-y-2 border-b-2 border-goldPrimary/20 pb-5 mb-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-guildBlue/40 border border-goldPrimary flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(212,165,55,0.3)]">
                  <Download className="w-6 h-6 text-goldLight" />
                </div>
                <h3 className="font-display text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-goldLight via-goldPrimary to-[#9E7419] drop-shadow-sm">
                  {t.downloadsModal.title}
                </h3>
                <p className="text-sm text-slate-300 font-fantasy tracking-wide">{t.downloadsModal.desc}</p>
              </div>
              
              <div className="space-y-4">
                {/* Opción 1: PWA */}
                <div className="group p-5 rounded-2xl bg-[#1A1429] border border-[#8F7643]/40 flex flex-col sm:flex-row items-center justify-between gap-5 hover:border-goldLight hover:bg-[#221A35] hover:shadow-[0_5px_20px_rgba(47,74,138,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-4 w-full">
                    <div className="p-3 rounded-xl bg-[#120E1E] border border-goldPrimary/30 shadow-inner group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-guildBlue" />
                    </div>
                    <div className="space-y-1 text-left flex-1">
                      <h4 className="font-fantasy font-bold text-base text-goldLight group-hover:text-white transition-colors">{t.downloadsModal.pwaTitle}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{t.downloadsModal.pwaDesc}</p>
                    </div>
                  </div>
                  <button onClick={handleInstallPWA} className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-guildBlue to-[#1a2d5c] hover:brightness-110 text-goldLight font-fantasy text-xs font-bold border border-guildBlue shadow-lg shrink-0 transition-all">
                    {t.downloadsModal.pwaBtn}
                  </button>
                </div>

                {/* Opción 2: APK Android */}
                <div className="group p-5 rounded-2xl bg-[#1A1429] border border-[#8F7643]/40 flex flex-col sm:flex-row items-center justify-between gap-5 hover:border-emerald-500/60 hover:bg-[#221A35] hover:shadow-[0_5px_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                  <div className="flex items-center gap-4 w-full">
                    <div className="p-3 rounded-xl bg-[#120E1E] border border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform">
                      <Smartphone className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="space-y-1 text-left flex-1">
                      <h4 className="font-fantasy font-bold text-base text-goldLight group-hover:text-white transition-colors">{t.downloadsModal.apkTitle}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{t.downloadsModal.apkDesc}</p>
                    </div>
                  </div>
                  <button onClick={() => { setDownloadsModalOpen(false); showToast(t.toast.apkReady); }} className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-950 hover:brightness-110 text-emerald-100 font-fantasy text-xs font-bold border border-emerald-600 shadow-lg shrink-0 transition-all">
                    {t.downloadsModal.apkBtn}
                  </button>
                </div>

                {/* Opción 3: Videojuego PC */}
                <div className="group p-5 rounded-2xl bg-[#1A1429] border border-[#8F7643]/40 flex flex-col sm:flex-row items-center justify-between gap-5 hover:border-amber-500/60 hover:bg-[#221A35] hover:shadow-[0_5px_20px_rgba(245,158,11,0.2)] transition-all duration-300">
                  <div className="flex items-center gap-4 w-full">
                    <div className="p-3 rounded-xl bg-[#120E1E] border border-amber-500/30 shadow-inner group-hover:scale-110 transition-transform">
                      <Laptop className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="space-y-1 text-left flex-1">
                      <h4 className="font-fantasy font-bold text-base text-goldLight group-hover:text-white transition-colors">{t.downloadsModal.pcTitle}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{t.downloadsModal.pcDesc}</p>
                    </div>
                  </div>
                  <button onClick={() => { setDownloadsModalOpen(false); showToast(t.toast.pcReady); }} className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 hover:brightness-110 text-amber-100 font-fantasy text-xs font-bold border border-amber-600 shadow-lg shrink-0 transition-all">
                    {t.downloadsModal.pcBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL DE INSPECCIÓN DE PERSONAJE
          ========================================================= */}
      {inspectedItem && (
        <div onClick={() => setInspectedItem(null)} className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="max-w-lg w-full rounded-3xl bg-[radial-gradient(circle_at_top,_#2F4A8A_0%,_#151024_60%,_#090612_100%)] border-2 border-goldPrimary p-6 relative shadow-[0_0_50px_rgba(212,165,55,0.45)] text-center space-y-4">
            <button onClick={() => setInspectedItem(null)} className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-goldLight border border-goldPrimary hover:bg-ribbonRed hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
            <div className="h-80 flex items-center justify-center relative">
              <div className="absolute w-64 h-64 rounded-full border-2 border-dashed border-goldLight/40 rune-orbit-reverse pointer-events-none"></div>
              <SmartChromaSprite src={inspectedItem.imagen} alt={inspectedItem.nombre} className="h-full w-auto object-contain sprite-hero-anim relative z-10" />
            </div>
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-guildBlue border border-goldPrimary text-goldLight font-fantasy text-xs font-bold">{inspectedItem.subtitulo}</span>
              <h3 className="font-display text-3xl font-black text-goldLight">{inspectedItem.nombre}</h3>
              <p className="text-sm text-parchmentLight/90 leading-relaxed">{inspectedItem.descripcion}</p>
              <div className="text-xs font-fantasy font-bold text-goldPrimary pt-2">{inspectedItem.extra}</div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE AUTENTICACIÓN (LOGIN / REGISTRO) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        lang={lang}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          setCurrentAvatar(loggedUser.avatar || '/avatarares/turnos_slime_verde.webp');
          showToast(lang === 'en' ? `Welcome to the Guild, ${loggedUser.username}!` : `¡Bienvenido al Gremio, ${loggedUser.username}!`);
        }}
      />

      {/* MODAL DE EDICIÓN DE PERFIL / AVATAR */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onUpdateAvatar={(nuevoAvatar) => {
          setCurrentAvatar(nuevoAvatar);
          const updatedUser = { ...user, avatar: nuevoAvatar };
          setUser(updatedUser);
          localStorage.setItem('duality_user', JSON.stringify(updatedUser));
          showToast(lang === 'en' ? 'Badge updated successfully!' : '¡Insignia actualizada con éxito!');
        }}
      />

      {/* TOAST DE NOTIFICACIÓN */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-5 py-3 rounded-xl bg-[#120E1E] border-2 border-goldPrimary text-goldLight font-fantasy text-xs font-bold shadow-[0_0_20px_rgba(212,165,55,0.5)] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-goldPrimary" /> <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}