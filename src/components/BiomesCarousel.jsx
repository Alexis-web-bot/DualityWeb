// src/components/BiomesCarousel.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Maximize2, Pause, Play, ShieldAlert, Compass, Swords, X } from 'lucide-react';

const getCarouselData = (lang = 'es') => {
  const isEn = lang === 'en';
  return [
    {
      id: 'duality-altar',
      src: '/galeria/Duality.webp',
      tag: isEn ? 'CONCEPT ART • THE AWAKENING' : 'ARTE OFICIAL • EL DESPERTAR',
      title: isEn ? 'Sanctuary of the Primordial Eclipse' : 'Santuario del Eclipse Primordial',
      desc: isEn
        ? 'The monoliths of the ancient world where the Goddess of Destruction erases memories at the start of every cycle.'
        : 'Los monolitos del mundo antiguo donde la Diosa de la Destrucción borra los recuerdos al iniciar cada ciclo.',
      realm: isEn ? 'Astral Limbo' : 'Limbo Astral',
      threat: isEn ? 'Temporal Anomaly' : 'Anomalía Temporal',
      accent: 'from-blue-900/80 via-[#151024]/90 to-[#090612]'
    },
    {
      id: 'bosque-combate',
      src: '/galeria/bosque_combate.webp',
      tag: isEn ? 'COMBAT STAGE • ACT I' : 'ESCENARIO DE COMBATE • ACTO I',
      title: isEn ? 'Outskirts of Silvaris Forest' : 'Linderos del Bosque de Silvaris',
      desc: isEn
        ? 'Lush glades surrounding the hidden Explorer’s Guild city. First skirmishes against wild fauna.'
        : 'Claros frondosos que rodean la ciudad oculta del Gremio. Primeras escaramuzas contra bestias primarias.',
      realm: 'Silvaris (Niv. 1 - 10)',
      threat: isEn ? 'Low Corrosion' : 'Corrosión Baja',
      accent: 'from-emerald-950/80 via-[#151024]/90 to-[#090612]'
    },
    {
      id: 'bosque-oscuro',
      src: '/galeria/bosque_oscuro_combate.webp',
      tag: isEn ? 'CORRUPTED BIOME • MIASMA' : 'BIOMA CORROMPIDO • MIASMA',
      title: isEn ? 'Swamps of Broken Time (Kairos)' : 'Pantanos del Tiempo Quebrado (Kairos)',
      desc: isEn
        ? 'Stagnant waters contaminated by Void energy. Visibility drops and Abyssal Corrosion drains vitality.'
        : 'Aguas estancadas contaminadas por energía del Vacío. La niebla densa oculta masas oscuras infecciosas.',
      realm: 'Kairos (Niv. 5 - 12)',
      threat: isEn ? 'Toxic Miasma' : 'Miasma Tóxico',
      accent: 'from-teal-950/80 via-[#151024]/90 to-[#090612]'
    },
    {
      id: 'montana-combate',
      src: '/galeria/Montana_combate.webp',
      tag: isEn ? 'HIGHLANDS • WATERFALLS' : 'TIERRAS ALTAS • CASCADAS',
      title: isEn ? 'Emerald Peaks & Jade Falls' : 'Cumbres Esmeralda y Cascadas de Jade',
      desc: isEn
        ? 'Pure water basins descending from Vlaskaya. A strategic natural bastion before the northern frost.'
        : 'Cuencas de agua pura que descienden de Vlaskaya. Un bastión natural estratégico antes del invierno perpetuo.',
      realm: 'Vlaskaya (Niv. 15 - 22)',
      threat: isEn ? 'Aerial Ambushes' : 'Emboscadas Aéreas',
      accent: 'from-sky-950/80 via-[#151024]/90 to-[#090612]'
    },
    {
      id: 'cueva-combate',
      src: '/galeria/cueva_combate.webp',
      tag: isEn ? 'UNDERGROUND • ABYSSAL RIFT' : 'SUBTERRÁNEO • GRIETA ABISAL',
      title: isEn ? 'Cavern of the Shattered Echoes' : 'Caverna de los Ecos Quebrados',
      desc: isEn
        ? 'Cracked subterranean arenas where Creation light barely reaches and Void creatures ambush in packs.'
        : 'Arenas subterráneas agrietadas donde la luz de la Creación apenas filtra y las bestias acechan en la penumbra.',
      realm: 'Shkaldrim (Niv. 20 - 28)',
      threat: isEn ? 'High Corrosion' : 'Corrosión Alta',
      accent: 'from-purple-950/80 via-[#151024]/90 to-[#090612]'
    },
    {
      id: 'cueva-hongos',
      src: '/galeria/cueva_hongos.webp',
      tag: isEn ? 'MYCOID GROTTO • BIOLUMINESCENCE' : 'GRUTA MICHOIDE • BIOLUMINISCENCIA',
      title: isEn ? 'Grotto of Spores and Fungi' : 'Gruta de Esporas y Hongos Abisales',
      desc: isEn
        ? 'A subterranean cavern illuminated by glowing spores. The air is heavy and triggers illusions.'
        : 'Una caverna subterránea iluminada por esporas brillantes. El aire denso provoca visiones e ilusiones temporales.',
      realm: 'Gorak-Thul (Niv. 28 - 35)',
      threat: isEn ? 'Hallucinogenic Spores' : 'Esporas Alucinógenas',
      accent: 'from-indigo-950/80 via-[#151024]/90 to-[#090612]'
    },
    {
      id: 'boss-combate',
      src: '/galeria/boss_combate.webp',
      tag: isEn ? 'DECISIVE CLASH • BOSS ARENA' : 'ENFRENTAMIENTO DECISIVO • ARENA DE JEFE',
      title: isEn ? 'Withered Wastes of the Fallen Bastion' : 'Páramos Marchitos del Bastión Caído',
      desc: isEn
        ? 'Desolate battlefield under an ash sky. Here the regional Archons guard the fragments of the loop.'
        : 'Campo de batalla desolado bajo un cielo de ceniza. Aquí los Jefes de Región custodian la ruptura del ciclo.',
      realm: isEn ? 'Boss Domain (Lvl. 35+)' : 'Dominio de Jefe (Niv. 35+)',
      threat: isEn ? 'EXTREME DANGER' : 'PELIGRO EXTREMO',
      accent: 'from-red-950/85 via-[#151024]/90 to-[#090612]'
    }
  ];
};

export default function BiomesCarousel({ lang = 'es', onSelectSimulatorBg }) {
  const isEn = lang === 'en';
  const slides = getCarouselData(lang);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [fullscreenSlide, setFullscreenSlide] = useState(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isAutoPlay || fullscreenSlide) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlay, fullscreenSlide]);

  const activeSlide = slides[currentIndex];

  return (
    <section id="galeria" className="relative z-10 py-16 px-4 max-w-7xl mx-auto">
      <style>{`
        @keyframes kenBurnsSlow {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .ken-burns-active {
          animation: kenBurnsSlow 14s ease-in-out infinite;
        }
      `}</style>

      {/* ENCABEZADO DE LA SECCIÓN */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-guildBlue/70 border border-goldPrimary/60 text-goldLight font-fantasy text-xs tracking-widest shadow">
          <Sparkles className="w-3.5 h-3.5 text-goldPrimary animate-spin" />
          {isEn ? 'VISUAL ARCHIVES • BIOMES & ARENAS' : 'ARCHIVOS VISUALES • BIOMAS Y ARENAS'}
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-goldLight tracking-wide drop-shadow">
          {isEn ? 'Scenarios of DUALITY' : 'Escenarios de Combate y Exploración'}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          {isEn
            ? 'Explore the official battlegrounds and atmospheric realms where Creation and Destruction collide.'
            : 'Inspecciona los campos de batalla oficiales y las regiones donde colisionan la Creación y la Destrucción.'}
        </p>
      </div>

      {/* CONTENEDOR PRINCIPAL DEL CARRUSEL */}
      <div 
        className="relative rounded-3xl bg-[#141022] border-2 border-goldPrimary shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden group"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-goldLight/80 z-30 pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-goldLight/80 z-30 pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-goldLight/80 z-30 pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-goldLight/80 z-30 pointer-events-none"></div>

        {/* VISOR PRINCIPAL DE IMAGEN */}
        <div className="relative h-[380px] sm:h-[480px] lg:h-[540px] w-full overflow-hidden bg-[#090612]">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  className={`w-full h-full object-cover object-center select-none ${
                    isActive ? 'ken-burns-active' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A16] via-[#0D0A16]/35 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(9,6,18,0.75)_100%)]" />
              </div>
            );
          })}

          {/* CONTROLES FLOTANTES SUPERIORES */}
          <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-goldPrimary/60 text-goldLight font-fantasy text-xs font-bold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-goldLight animate-ping" />
              <span>{activeSlide.tag}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                title={isAutoPlay ? (isEn ? 'Pause' : 'Pausar') : (isEn ? 'Play' : 'Reproducir')}
                className="p-2.5 rounded-full bg-black/70 hover:bg-guildBlue text-goldLight border border-goldPrimary/50 transition shadow-lg"
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setFullscreenSlide(activeSlide)}
                title={isEn ? 'Fullscreen' : 'Pantalla Completa'}
                className="p-2.5 rounded-full bg-black/70 hover:bg-guildBlue text-goldLight border border-goldPrimary/50 transition shadow-lg"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* BOTONES LATERALES */}
          <button
            onClick={prevSlide}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#120E1E]/85 hover:bg-guildBlue text-goldLight border-2 border-goldPrimary flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:scale-110 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#120E1E]/85 hover:bg-guildBlue text-goldLight border-2 border-goldPrimary flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:scale-110 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* PANEL INFERIOR DE INFORMACIÓN */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-5 sm:p-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-fantasy">
                <span className="px-2.5 py-0.5 rounded bg-guildBlue/90 border border-goldPrimary/50 text-goldLight font-bold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> {activeSlide.realm}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-ribbonRed/90 border border-goldPrimary/50 text-white font-bold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> {activeSlide.threat}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-black text-goldLight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                {activeSlide.title}
              </h3>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed drop-shadow">
                {activeSlide.desc}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-end shrink-0">
              {onSelectSimulatorBg && (
                <button
                  onClick={() => onSelectSimulatorBg(activeSlide.src, activeSlide.title)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-goldPrimary to-goldLight text-dualityDeep font-fantasy font-extrabold text-xs shadow-lg hover:brightness-110 flex items-center gap-1.5 transition"
                >
                  <Swords className="w-4 h-4" />
                  <span>{isEn ? 'Use in Combat Demo' : 'Usar en Simulador'}</span>
                </button>
              )}
              <div className="px-3.5 py-2 rounded-xl bg-black/75 border border-goldPrimary/50 font-fantasy text-xs text-goldLight font-bold">
                {currentIndex + 1} / {slides.length}
              </div>
            </div>
          </div>
        </div>

        {/* TIRA DE MINIATURAS (ADAPTADA PARA LAS 7 IMÁGENES) */}
        <div className="bg-[#120E1E] border-t-2 border-goldPrimary/40 p-3 sm:p-4">
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {slides.map((slide, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`group/thumb relative h-14 sm:h-18 rounded-xl overflow-hidden border-2 transition-all duration-300 focus:outline-none ${
                    isSelected
                      ? 'border-goldLight scale-[1.03] shadow-[0_0_15px_rgba(212,165,55,0.6)] ring-2 ring-goldPrimary/40'
                      : 'border-[#8F7643]/40 opacity-60 hover:opacity-100 hover:border-goldPrimary'
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 ${isSelected ? 'bg-transparent' : 'bg-black/40 group-hover/thumb:bg-transparent'}`} />
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] font-fantasy font-bold text-white truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] text-left">
                    {idx + 1}. {slide.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL PANTALLA COMPLETA */}
      {fullscreenSlide && (
        <div
          onClick={() => setFullscreenSlide(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full rounded-3xl bg-[#151024] border-2 border-goldPrimary overflow-hidden shadow-[0_0_60px_rgba(212,165,55,0.4)] relative"
          >
            <button
              onClick={() => setFullscreenSlide(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/75 text-goldLight border border-goldPrimary hover:bg-ribbonRed hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={fullscreenSlide.src}
              alt={fullscreenSlide.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-5 bg-[#120E1E] border-t border-goldPrimary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-fantasy text-goldPrimary font-bold">{fullscreenSlide.tag}</span>
                <h4 className="font-display text-xl font-bold text-goldLight">{fullscreenSlide.title}</h4>
                <p className="text-xs text-slate-300 mt-1">{fullscreenSlide.desc}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-guildBlue text-goldLight font-fantasy text-xs font-bold self-start sm:self-center shrink-0">
                {fullscreenSlide.realm}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}