// src/components/VideoTeaserSection.jsx
import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Film } from 'lucide-react';

export default function VideoTeaserSection({ lang = 'es' }) {
  const isEn = lang === 'en';
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Actualizar el tiempo actual del video
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Cargar duración total cuando el video esté listo
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Permitir adelantar/retroceder deslizando la barra
  const handleSeek = (e) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Formatear segundos a formato MM:SS
  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="trailer" className="relative z-10 py-16 px-4 max-w-5xl mx-auto">
      {/* Encabezado de la sección */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-guildBlue/70 border border-goldPrimary/60 text-goldLight font-fantasy text-xs tracking-widest shadow">
          <Film className="w-3.5 h-3.5 text-goldPrimary" />
          {isEn ? 'OFFICIAL TEASER • CINEMATIC PREVIEW' : 'TEASER OFICIAL • AVANCE CINEMÁTICO'}
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-goldLight tracking-wide drop-shadow">
          {isEn ? 'The Time Loop Trailer' : 'El Bucle Temporal en Movimiento'}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          {isEn
            ? 'Watch the official cinematic teaser showcasing the world of Aethelgard and the looming destruction.'
            : 'Disfruta del avance oficial que revela los escenarios, los artes y el despertar en Aethelgard.'}
        </p>
      </div>

      {/* Visor de Video Estilizado con Marco Rúnico */}
      <div className="relative rounded-3xl bg-[#141022] border-2 border-goldPrimary shadow-[0_0_50px_rgba(212,165,55,0.3)] overflow-hidden group">
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-goldLight/80 z-30 pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-goldLight/80 z-30 pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-goldLight/80 z-30 pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-goldLight/80 z-30 pointer-events-none"></div>

        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/video_1.mp4"
            className="w-full h-full object-cover select-none cursor-pointer"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
            onEnded={() => setIsPlaying(false)}
            playsInline
          />

          {/* Overlay del botón central de reproducción si está pausado */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center cursor-pointer group/overlay transition-all"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-guildBlue to-goldPrimary border-2 border-goldLight flex items-center justify-center shadow-[0_0_30px_rgba(212,165,55,0.7)] group-hover/overlay:scale-110 transition-transform">
                <Play className="w-8 h-8 text-dualityDeep fill-dualityDeep ml-1" />
              </div>
            </div>
          )}

          {/* BARRA DE REPRODUCCIÓN INFERIOR MEJORADA */}
          <div className="absolute bottom-3 inset-x-3 z-20 flex flex-col gap-1.5 px-4 py-3 rounded-2xl bg-[#120E1E]/90 backdrop-blur-md border border-goldPrimary/50 shadow-2xl">
            
            {/* Barra de Progreso (Seekbar) Interactiva */}
            <div className="flex items-center gap-3 w-full">
              <span className="text-[11px] font-fantasy text-goldLight/80 font-bold min-w-[38px] text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 rounded-lg bg-black/60 accent-goldPrimary cursor-pointer hover:h-2 transition-all"
              />
              <span className="text-[11px] font-fantasy text-slate-400 font-bold min-w-[38px]">
                {formatTime(duration)}
              </span>
            </div>

            {/* Controles Principales (Play/Pause y Mute) */}
            <div className="flex items-center justify-between pt-1 border-t border-goldPrimary/20">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 text-goldLight font-fantasy text-xs font-bold hover:text-white transition group"
              >
                <div className="p-1.5 rounded-lg bg-guildBlue/40 border border-goldPrimary/40 group-hover:scale-110 transition-transform">
                  {isPlaying ? <Pause className="w-4 h-4 text-goldLight" /> : <Play className="w-4 h-4 text-goldLight fill-goldLight" />}
                </div>
                <span>{isPlaying ? (isEn ? 'Pause' : 'Pausar Teaser') : (isEn ? 'Play' : 'Reproducir Teaser')}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-black/60 hover:bg-guildBlue text-goldLight border border-goldPrimary/30 transition shadow"
                  title={isMuted ? 'Activar Sonido' : 'Silenciar'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-ribbonRed" /> : <Volume2 className="w-4 h-4 text-goldLight" />}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}