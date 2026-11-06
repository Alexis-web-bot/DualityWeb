/**
 * ARCHIVO DE DATOS CENTRALIZADOS DE DUALITY
 * En la Fase 2, estos arreglos serán reemplazados por llamadas fetch/axios a tu API REST.
 */

// 1. Pistas del Soundtrack y Frecuencias para el Sintetizador Web Audio API
export const SOUNDTRACK_LIST = [
  {
    id: 0,
    titulo: 'Disco I: Ecos del Ouroboros (Tema Principal)',
    subtitulo: 'Melodía mística de arpa antigua y cuerdas del bucle • 03:42',
    notes: [293.66, 349.23, 440.00, 587.33, 523.25, 440.00, 349.23, 329.63],
    tempo: 360,
    wave: 'triangle'
  },
  {
    id: 1,
    titulo: 'Disco II: Marcha del Gremio de Exploradores',
    subtitulo: 'Himno heroico de la Ciudadela y salón de misiones • 02:58',
    notes: [196.00, 293.66, 392.00, 440.00, 493.88, 392.00, 329.63, 293.66],
    tempo: 300,
    wave: 'sawtooth'
  },
  {
    id: 2,
    titulo: 'Disco III: Susurros de las Criaturas del Vacío',
    subtitulo: 'Tensión abisal y disonancia de las tierras corruptas • 04:15',
    notes: [146.83, 155.56, 220.00, 207.65, 146.83, 130.81, 164.81, 146.83],
    tempo: 480,
    wave: 'sine'
  },
  {
    id: 3,
    titulo: 'Disco IV: Duelo en el Bucle Temporal (Boss Theme)',
    subtitulo: 'Frenesí rítmico para los combates por turnos decisivos • 03:30',
    notes: [329.63, 392.00, 493.88, 659.25, 587.33, 493.88, 392.00, 440.00],
    tempo: 210,
    wave: 'square'
  }
];

// 2. Fases del Bucle Temporal (Mockup 11)
export const LOOP_PHASES = [
  {
    shortTitle: 'I. Alba del Olvido',
    title: 'Fase I: El Alba del Olvido (Ciclo #1 - #3)',
    badge: 'Inconsciente',
    desc: 'Al iniciar la aventura, los protagonistas no saben que ya han vivido y caído decenas de veces. Los diálogos con NPCs parecen normales, pero ciertas puertas rúnicas reaccionan a la sangre del jugador.',
    effect: 'Efecto en Gameplay: Estadísticas base normales • El mapa oculta pasajes dimensionales.'
  },
  {
    shortTitle: 'II. Déjà Vu Rúnico',
    title: 'Fase II: Déjà Vu Rúnico (Ciclo #4 - #9)',
    badge: 'Despertar Parcial',
    desc: 'Kaelen y Lyra comienzan a recordar emboscadas antes de que ocurran. Esto permite desbloquear opciones de diálogo inéditas en el Gremio para salvar a exploradores condenados.',
    effect: 'Efecto en Gameplay: +15% de iniciativa en combate por turnos • Se revelan atajos del bucle.'
  },
  {
    shortTitle: 'III. Grieta del Vacío',
    title: 'Fase III: Grieta del Vacío (Ciclo #10 - #19)',
    badge: 'Corrupción Alta',
    desc: 'Las Criaturas del Vacío detectan que el jugador conserva sus recuerdos y envían cazadores abisales a alterar los escenarios de plataformas con anomalías gravitatorias.',
    effect: 'Efecto en Gameplay: Enemigos élite aparecen, pero sueltan Reliquias de Rango Oro.'
  },
  {
    shortTitle: 'IV. Despertar Astral',
    title: 'Fase IV: El Colapso del Ouroboros (Ciclo Final)',
    badge: 'Ruptura del Ciclo',
    desc: 'Con las Reliquias del Tiempo reunidas, el escuadrón detiene las agujas del reloj ancestral y abre la puerta hacia el núcleo del eclipse para el enfrentamiento definitivo.',
    effect: 'Efecto en Gameplay: Desbloquea la habilidad suprema "Dualidad Absoluta" para todo el grupo.'
  }
];

// 3. Base de Conocimiento del Grimorio Wiki (Mockups 3, 4, 5, 6, 8 y 10)
export const WIKI_CATEGORIES = {
  personajes: {
    titulo: 'Sección: Personajes y Compañeros',
    desc: 'Aliados que encontraremos en el camino con su clase, personalidad e historia individual.',
    items: [
      {
        nombre: 'Kaelen, el Portador del Eclipse',
        subtitulo: 'Protagonista Principal • Clase: Guerrero del Alba',
        descripcion: 'Veterano explorador marcado en el antebrazo por la cicatriz del Ouroboros. Es el primero del escuadrón en conservar la memoria tras cada reinicio del Bucle Temporal.',
        extra: 'Afinidad: Luz Solar y Acero Rúnico'
      },
      {
        nombre: 'Lyra Vane',
        subtitulo: 'Compañera de Escuadrón • Clase: Taumaturga Astral',
        descripcion: 'Erudita de la Biblioteca Sumergida que percibe las distorsiones del tiempo mediante resonancias musicales. Aporta ataques mágicos en área.',
        extra: 'Afinidad: Magia de Constelaciones'
      },
      {
        nombre: 'Thoran Escudo de Hierro',
        subtitulo: 'Compañero de Escuadrón • Clase: Guardián de Égida',
        descripcion: 'Antiguo capitán de la guardia de la Ciudadela Dorada. Su imponente escudo absorbe los golpes letales de las Criaturas del Vacío.',
        extra: 'Afinidad: Defensa Inquebrantable'
      },
      {
        nombre: 'Seraphina Noctis',
        subtitulo: 'Compañera de Escuadrón • Clase: Alquimista del Vacío',
        descripcion: 'Boticaria que aprendió a destilar la niebla abisal en elixires curativos y bombas alquímicas.',
        extra: 'Afinidad: Transmutación y Bufos'
      },
      {
        nombre: 'Vaelor el Silente',
        subtitulo: 'Explorador Errante • Clase: Cazador de Sombras',
        descripcion: 'Rastreador capaz de caminar entre el Velo sin ser detectado. Especialista en golpes críticos veloces y desactivación de trampas.',
        extra: 'Afinidad: Velocidad y Sigilo'
      }
    ]
  },
  clases: {
    titulo: 'Sección: Las Cinco Clases',
    desc: 'Explicación particular de cada una de las 5 clases diseñadas para la historia, sus habilidades y orígenes.',
    items: [
      {
        nombre: '1. Guerrero del Alba (Espada)',
        subtitulo: 'Ofensiva equilibrada y liderazgo en vanguardia',
        descripcion: 'Forjados en las órdenes de caballería solar. Alto daño físico y capacidad de romper la guardia enemiga con "Filo del Meridiano".',
        extra: 'Estadísticas Base: HP 120 | ATQ 85 | DEF 75 | VEL 70'
      },
      {
        nombre: '2. Guardián de Égida (Escudo)',
        subtitulo: 'Muralla defensiva y contraataque táctico',
        descripcion: 'Custodios juramentados de los muros del Gremio. Redirige el daño sufrido por los aliados hacia su propio escudo rúnico.',
        extra: 'Estadísticas Base: HP 160 | ATQ 60 | DEF 98 | VEL 45'
      },
      {
        nombre: '3. Taumaturgo Astral (Magia)',
        subtitulo: 'Control elemental y devastación arcana en área',
        descripcion: 'Sabios que estudiaron los dos soles antes del colapso. Canaliza el maná para alterar el turno de los enemigos con "Supernova del Bucle".',
        extra: 'Estadísticas Base: HP 85 | ATQ 96 | DEF 55 | VEL 80'
      },
      {
        nombre: '4. Alquimista del Vacío (Poción)',
        subtitulo: 'Soporte versátil, curación y estados alterados',
        descripcion: 'Combina reactivos en pleno combate para otorgar bufos de ataque, regeneración o corroer la armadura de las bestias abisales.',
        extra: 'Estadísticas Base: HP 95 | ATQ 72 | DEF 68 | VEL 82'
      },
      {
        nombre: '5. Cazador de Sombras (Dagas y Arco)',
        subtitulo: 'Agilidad extrema, evasión y ejecución crítica',
        descripcion: 'Actúa primero en la línea de turnos y posee doble salto extendido en las fases de plataformas.',
        extra: 'Estadísticas Base: HP 90 | ATQ 88 | DEF 58 | VEL 99'
      }
    ]
  },
  items: {
    titulo: 'Sección: Ítems y Reliquias',
    desc: 'Objetos que benefician con bufos particulares y circunstanciales al equipo durante su aventura.',
    items: [
      {
        nombre: 'Espada del Sol Quebrado',
        subtitulo: 'Arma Legendaria • Reliquia de Vanguardia',
        descripcion: 'Hoja forjada con meteorito áureo. Incrementa un +25% el daño crítico del equipo durante los primeros 3 turnos.',
        extra: 'Origen: Ruinas de la Ciudadela Dorada'
      },
      {
        nombre: 'Escudo de la Égida Eterna',
        subtitulo: 'Equipamiento Defensivo • Reliquia del Gremio',
        descripcion: 'Otorga una barrera que bloquea el primer ataque letal recibido en cada ciclo temporal.',
        extra: 'Origen: Recompensa de Rango Oro'
      },
      {
        nombre: 'Elixir de Dualidad Pura',
        subtitulo: 'Consumible Alquímico • Botica',
        descripcion: 'Restaura 50% de HP/MP y limpia cualquier corrupción aplicada por las Criaturas del Vacío.',
        extra: 'Origen: Elaborado por Seraphina'
      },
      {
        nombre: 'Reloj de Bolsillo del Ouroboros',
        subtitulo: 'Artefacto Místico • Control del Tiempo',
        descripcion: 'Permite retrasar el turno de un jefe enemigo o repetir una ronda de combate desfavorable una vez por mazmorra.',
        extra: 'Origen: Santuario del Eclipse'
      }
    ]
  },
  enemigos: {
    titulo: 'Sección: Criaturas del Vacío',
    desc: 'Bestias y seres principales que desafiaremos durante el gameplay, con sus estadísticas y debilidades.',
    items: [
      {
        nombre: 'Acechador de Ceniza (Criatura del Vacío)',
        subtitulo: 'Bestia Común • Bioma: Valle Esmeralda y Ruinas',
        descripcion: 'Lobos sombríos formados por materia oscura condensada. Atacan en manada buscando flanquear al personaje con menor defensa.',
        extra: 'Estadísticas: HP 95 | ATQ 35 | VEL 85 • Debilidad: Luz Solar'
      },
      {
        nombre: 'Devorador Abisal de Recuerdos',
        subtitulo: 'Élite del Vacío • Bioma: Cumbres y Catedral',
        descripcion: 'Entidad flotante con múltiples máscaras que intenta drenar los puntos de habilidad (MP) del grupo.',
        extra: 'Estadísticas: HP 240 | ATQ 58 | VEL 65 • Debilidad: Magia Astral'
      },
      {
        nombre: 'Coloso del Reloj Roto (Jefe de Región)',
        subtitulo: 'Jefe Mayor • Guardián del Bucle Temporal',
        descripcion: 'Antiguo autómata gigantesco corrompido por el Vacío. Solo puede ser dañado tras aturdirlo con ataques combinados.',
        extra: 'Estadísticas: HP 850 | ATQ 90 | VEL 40 • Recompensa: Fragmento de Ouroboros'
      }
    ]
  },
  gremio: {
    titulo: 'Sección: Gremio de Exploradores',
    desc: 'Historia de la organización, sistema de Rangos de aventura y tablón de Misiones.',
    items: [
      {
        nombre: 'El Gremio de Exploradores (Organización Central)',
        subtitulo: 'Baluarte de la humanidad frente a la expansión del Vacío',
        descripcion: 'Administra las misiones de reconocimiento, cartografía de biomas y resguardo de reliquias con sedes en cada ciudad principal.',
        extra: 'Color Oficial: Azul Real (#2F4A8A) y Oro (#D4A537)'
      },
      {
        nombre: 'Sistema de Rangos del Gremio (Progresión)',
        subtitulo: 'Bronce ➔ Plata ➔ Oro ➔ Platino ➔ Maestro del Vacío',
        descripcion: 'Desbloquea mejores pociones en la tienda, acceso a regiones restringidas del mapa y aliados adicionales.',
        extra: 'Impacto directo en la partida y finales desbloqueables'
      },
      {
        nombre: 'Tablón de Misiones Activas',
        subtitulo: 'Encargos de Cacería, Escolta y Recolección',
        descripcion: '1. Purificación del Bosque Esmeralda (Bronce) • 2. El Reloj Perdido de las Cumbres (Plata) • 3. Cacería del Coloso Abisal (Oro).',
        extra: 'Recompensas en Monedas de Oro y Puntos de Rango'
      }
    ]
  },
  razas: {
    titulo: 'Sección: Razas y Facciones',
    desc: 'Orígenes de los pueblos de Aethelgard y los grupos organizados que influyen en el entorno.',
    items: [
      {
        nombre: 'Hijos de Aethel (Humanos del Sol)',
        subtitulo: 'Raza Mayoritaria • Fundadores del Gremio',
        descripcion: 'Adaptables y tenaces. Su determinación les permite dominar todas las clases de combate a pesar del bucle.',
        extra: 'Rasgo Racial: +10% ganancia de experiencia por combate'
      },
      {
        nombre: 'Caminantes del Velo (Estirpe Crepuscular)',
        subtitulo: 'Raza Mística • Habitantes de los Bosques Antiguos',
        descripcion: 'Seres longevos de ojos plateados que perciben de forma natural las anomalías temporales.',
        extra: 'Rasgo Racial: Reducción de costo de MP en habilidades astrales'
      },
      {
        nombre: 'Forjadores de Ceniza (Clanes Volcánicos)',
        subtitulo: 'Raza de Artesanos y Guerreros Acorazados',
        descripcion: 'Maestros en la creación de armas capaces de herir a las criaturas intangibles del Vacío.',
        extra: 'Rasgo Racial: +15% resistencia física y de fuego'
      },
      {
        nombre: 'La Orden del Ouroboros (Facción Enigmática)',
        subtitulo: 'Grupo Organizado • Custodios del Secreto Temporal',
        descripcion: 'Facción secreta cuyos miembros veneran el bucle temporal como una forma de inmortalidad.',
        extra: 'Influencia: Controlan los Santuarios del Eclipse'
      }
    ]
  }
};

// 4. Regiones Interactivas del Mapa de Aethelgard (Mockup 7)
export const MAP_REGIONS = [
  {
    badge: 'BIOMA #1 • ZONA CENTRAL',
    title: 'Valle Esmeralda y Bastión del Gremio',
    desc: 'El corazón verde de Aethelgard. Aquí se alza la sede central del Gremio de Exploradores, rodeada de puentes colgantes y ruinas élficas que sirven como el primer gran escenario de plataformas del juego.',
    level: 'Rango Bronce (Niv. 1 - 10)',
    hazards: 'Lianas móviles, abismos de niebla y centinelas corruptos.',
    boss: 'Gólem de Raíz Hueca'
  },
  {
    badge: 'BIOMA #2 • FRONTERA NORTE',
    title: 'Cumbres Heladas de Escarcha Eterna',
    desc: 'Cordillera azotada por ventiscas donde el tiempo corre más lento. Las plataformas de hielo se fracturan al pisarlas y requieren usar la Dualidad para solidificar puentes de luz.',
    level: 'Rango Plata (Niv. 11 - 20)',
    hazards: 'Suelo resbaladizo, estalactitas y vientos que empujan al jugador.',
    boss: 'Valquiria del Reloj Congelado'
  },
  {
    badge: 'BIOMA #3 • TIERRAS DEL ESTE',
    title: 'Caldera Volcánica de Ceniza',
    desc: 'Antigua forja del mundo donde residen los maestros herreros y alquimistas. Ríos de magma ascendente obligan a escalar plataformas verticales a gran velocidad.',
    level: 'Rango Oro (Niv. 21 - 30)',
    hazards: 'Géiseres de fuego, plataformas giratorias de metal y humo tóxico.',
    boss: 'Draco de Escoria Abisal'
  },
  {
    badge: 'BIOMA #4 • RUINAS DEL SUROESTE',
    title: 'Desierto Ámbar y Reloj de Arena',
    desc: 'Un mar de dunas doradas que sepultó los templos solares originales. Las tormentas de arena cambian la disposición del escenario entre el Reino de la Luz y el Vacío.',
    level: 'Rango Maestro (Niv. 31+)',
    hazards: 'Arenas movedizas temporales y espejismos del Vacío.',
    boss: 'Arconte del Eclipse'
  }
];

// 5. Roles genéricos del Estudio Desarrollador (sin datos personales precargados)
export const STUDIO_TEAM = [
  { rol: 'Arquitectura & PWA', titulo: 'Líder de Arquitectura Web y Móvil', desc: 'Desarrollo de la Aplicación Web Progresiva (PWA), programación de Service Worker, Manifiesto Web, API de autenticación y arquitectura general.' },
  { rol: 'Dirección de Arte & UI', titulo: 'Dirección de Arte e Interfaz', desc: 'Diseño del sistema de contenedores de pergaminos (Scroll Kit y rollos fijos), curaduría de paleta de colores Dark Fantasy e iconografía.' },
  { rol: 'Diseño de Mundo y Mapas', titulo: 'Diseño de Niveles y Cartografía', desc: 'Diseño de los escenarios de plataformas 2D, cartografía de los biomas de Aethelgard y estructuración del Gremio de Exploradores.' },
  { rol: 'Sistema de Combate', titulo: 'Ingeniería de Gameplay y Balance', desc: 'Diseño de las mecánicas de combate por turnos, balance de las 5 Clases de personajes, árbol de habilidades y catálogo de ítems/bufos.' },
  { rol: 'Narrativa, Lore y Razas', titulo: 'Dirección Narrativa y Guion', desc: 'Creación de la trama principal, reglas narrativas del Bucle Temporal, trasfondo de personajes aliados y diseño de razas y facciones.' },
  { rol: 'Bestiario y Audio', titulo: 'Diseño Sonoro y Bestiario', desc: 'Creación del bestiario de Criaturas del Vacío, estadísticas de jefes, ambientación sonora y curaduría de la sección de Soundtrack.' }
];