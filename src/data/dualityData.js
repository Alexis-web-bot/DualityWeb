/**
 * ARCHIVO DE DATOS CENTRALIZADOS DE DUALITY
 * Incluye rutas organizadas en /audio/ y /personajes/
 */

// 1. Catálogo Oficial del Soundtrack (8 pistas reales desde public/audio/)
export const SOUNDTRACK_LIST = [
  {
    id: 0,
    titulo: 'I. Taberna del Gremio',
    subtitulo: 'Ambiente cálido del salón de exploradores • gremio_taberna.mp3',
    src: '/audio/gremio_taberna.mp3'
  },
  {
    id: 1,
    titulo: 'II. Descanso en el Gremio (Camas)',
    subtitulo: 'Melodía serena de recuperación y posada • gremio_camas.mp3',
    src: '/audio/gremio_camas.mp3'
  },
  {
    id: 2,
    titulo: 'III. Senderos del Bosque',
    subtitulo: 'Exploración de plataformas en el bosque • bosque_nivel.mp3',
    src: '/audio/bosque_nivel.mp3'
  },
  {
    id: 3,
    titulo: 'IV. El Bosque Oscuro',
    subtitulo: 'Zonas contaminadas por la energía del vacío • bosque_oscuro_nivel.mp3',
    src: '/audio/bosque_oscuro_nivel.mp3'
  },
  {
    id: 4,
    titulo: 'V. Escaramuza en el Bosque',
    subtitulo: 'Tema de combate por turnos en la espesura • combate_bosque.mp3',
    src: '/audio/combate_bosque.mp3'
  },
  {
    id: 5,
    titulo: 'VI. Emboscada en el Bosque Oscuro',
    subtitulo: 'Combate contra masas oscuras de corrosión • combate_bosque_oscuro.mp3',
    src: '/audio/combate_bosque_oscuro.mp3'
  },
  {
    id: 6,
    titulo: 'VII. Duelo en las Cumbres',
    subtitulo: 'Combate táctico en las cordilleras • combate_montaña.mp3',
    src: '/audio/combate_montaña.mp3'
  },
  {
    id: 7,
    titulo: 'VIII. Furia Primordial (Boss Theme)',
    subtitulo: 'Enfrentamiento decisivo contra jefes de región • combate_boss.mp3',
    src: '/audio/combate_boss.mp3'
  }
];

// 2. Fases del Bucle Temporal (Basado en la Historia Oficial)
export const LOOP_PHASES = [
  {
    shortTitle: 'I. Amnesia Primordial',
    title: 'Fase I: El Despertar Amnésico',
    badge: 'Inconsciente',
    desc: 'El protagonista despierta sin identidad. La Diosa de la Destrucción borró sus recuerdos dejándolo en un sueño profundo. Es rescatado por una maga humana y un pícaro híbrido que lo llevan al gremio.',
    effect: 'Efecto Gameplay: Tutorial de exploración y mecánicas básicas de combate.'
  },
  {
    shortTitle: 'II. Visiones y Déjà Vus',
    title: 'Fase II: El Eco de Vidas Pasadas',
    badge: 'Despertar Parcial',
    desc: 'El protagonista comienza a experimentar déjà vus sobre personas, tradiciones e idiomas de bucles anteriores, dándose cuenta de que el mundo avanza hacia una guerra inminente.',
    effect: 'Efecto Gameplay: Desbloquea diálogos ocultos y misiones secundarias de civiles.'
  },
  {
    shortTitle: 'III. Corrosión Abisal',
    title: 'Fase III: El Avance de la Destrucción',
    badge: 'Corrosión Alta',
    desc: 'Las zonas se contaminan con energía del vacío. Masas humanoides oscuras aparecen y deterioran el ambiente. Un solo toque de estas criaturas desintegra a los mortales.',
    effect: 'Efecto Gameplay: Daño ambiental en los biomas. Enemigos infligen estado "Corrosión".'
  },
  {
    shortTitle: 'IV. Revelación Divina',
    title: 'Fase IV: El Secreto del Dios del Tiempo',
    badge: 'Ruptura del Ciclo',
    desc: 'El equipo encuentra al Dios del tiempo recluido. Revela que el bucle es un reinicio infinito orquestado por la Creación tras la aniquilación de la Destrucción. El protagonista debe usar su dualidad para romperlo.',
    effect: 'Efecto Gameplay: Se activa el modo "Primordial" (Control de Creación y Destrucción).'
  }
];

// 3. Base de Conocimiento del Grimorio Wiki (Imágenes en /personajes/)
export const WIKI_CATEGORIES = {
  personajes: {
    titulo: 'Sección: Protagonistas y Compañeros',
    desc: 'El equipo de exploradores encargado de enfrentar la corrosión del mundo y romper el bucle.',
    items: [
      {
        nombre: 'Ópalo',
        subtitulo: 'Protagonista Principal (Él) • Ser Primordial',
        descripcion: 'Amnésico y debilitado. Es un primordial de segunda generación, fruto de un romance efímero entre el Dios de la Creación y la Diosa de la Destrucción. Posee la capacidad de crear y destruir.',
        extra: 'Origen: Hijo de las fuerzas primigenias',
        imagen: '/personajes/Opalo.jpg'
      },
      {
        nombre: 'Zyren',
        subtitulo: 'Protagonista Principal (Ella) • Ser Primordial',
        descripcion: 'Comparte el mismo origen y destino divino. La destrucción no puede aniquilar su existencia porque ella misma es parte de la destrucción, pero borra sus recuerdos en cada bucle.',
        extra: 'Origen: Hija de las fuerzas primigenias',
        imagen: '/personajes/Zyren.jpg'
      },
      {
        nombre: 'Elizaveta',
        subtitulo: 'Compañera Inicial • Humana Maga',
        descripcion: 'Especialista en ataques a distancia. Junto al pícaro híbrido, rescata al protagonista amnésico y lo guía a la ciudad oculta del gremio en el bosque.',
        extra: 'Afinidad: Magia y Ataque a distancia',
        imagen: '/personajes/Elizaveta.jpg'
      },
      {
        nombre: 'Rasku',
        subtitulo: 'Compañero Inicial • Híbrido Pícaro',
        descripcion: 'Un pícaro veloz de ataques a corto alcance. Enseña al protagonista las reglas de supervivencia del gremio y cómo lidiar con las bestias primarias.',
        extra: 'Afinidad: Corto alcance y Sigilo',
        imagen: '/personajes/Rasku.jpg'
      },
      {
        nombre: 'General Calabaza',
        subtitulo: 'Comandante del Gremio • Defensor Acorazado',
        descripcion: 'Un imponente guerrero con armadura completa que resguarda la ciudad oculta. Coordina los encargos de los aventureros y las defensas contra la corrosión.',
        extra: 'Afinidad: Defensa e Intervención Pesada',
        imagen: '/personajes/General Calabaza.webp'
      },
      {
        nombre: 'Vajrak',
        subtitulo: 'Explorador Aliado • Guerrero Multibrazo',
        descripcion: 'Un fuerte combatiente multirracial del gremio de exploradores. Ayuda a pacificar los conflictos externos y escoltar caravanas de civiles afectados por la guerra.',
        extra: 'Afinidad: Combate cuerpo a cuerpo',
        imagen: '/personajes/Vajrak.jpg'
      }
    ]
  },
  clases: {
    titulo: 'Sección: Clases de Combate',
    desc: 'Estilos de pelea utilizados por los miembros del gremio para sobrevivir a la guerra inminente.',
    items: [
      {
        nombre: 'Primordial de Dualidad (Ópalo / Zyren)',
        subtitulo: 'Habilidad de Creación y Destrucción',
        descripcion: 'Clase única. Su poder interno es inestable: pueden sanar usando energía de Creación o desintegrar enemigos con Destrucción, pero corren el riesgo de corromperse a sí mismos.',
        extra: 'Poder Oculto de Segunda Generación'
      },
      {
        nombre: 'Maga a Distancia (Elizaveta)',
        subtitulo: 'Control de área y proyectiles mágicos',
        descripcion: 'Ataca desde la retaguardia para evitar el contacto físico con las criaturas corrosivas de la destrucción.',
        extra: 'Rol: Soporte Ofensivo'
      },
      {
        nombre: 'Pícaro Híbrido (Rasku)',
        subtitulo: 'Velocidad y ataques furtivos',
        descripcion: 'Golpea a corto alcance y se retira rápidamente antes de que el enemigo pueda responder. Excelente para la exploración ágil.',
        extra: 'Rol: Daño Rápido'
      },
      {
        nombre: 'Exorcista de la Creación',
        subtitulo: 'Purificación y Bendiciones',
        descripcion: 'Clérigos de la Iglesia de la Creación capaces de frenar la corrosión en las personas y sanar el ambiente contaminado por el Vacío.',
        extra: 'Rol: Sanador'
      },
      {
        nombre: 'Defensor Pesado (General Calabaza)',
        subtitulo: 'Tanque y provocación',
        descripcion: 'Atrae el daño hacia su escudo pesado para proteger a los civiles y mantener la línea frontal en el gremio.',
        extra: 'Rol: Tanque Absoluto'
      }
    ]
  },
  enemigos: {
    titulo: 'Sección: Fuerzas de Destrucción',
    desc: 'Criaturas enviadas para erradicar la vida y acelerar el reinicio del bucle temporal.',
    items: [
      {
        nombre: 'Masas Oscuras (Infectados)',
        subtitulo: 'Criaturas de Destrucción Humanoides',
        descripcion: 'Seres de energía oscura terriblemente tóxica. Buscan desintegrar a los mortales con solo tocarlos, esparciendo corrosión en el ambiente.',
        extra: 'Debilidad: Armas encantadas del Gremio'
      },
      {
        nombre: 'Bestias de Corrosión',
        subtitulo: 'Fauna corrompida por el vacío',
        descripcion: 'Animales del bosque asimilados por la energía destructiva. Su mordida deja marcas corrosivas que enferman a las personas.',
        extra: 'Cura: Bendición de Exorcistas'
      },
      {
        nombre: 'Diosa de la Destrucción',
        subtitulo: 'Deidad Primigenia',
        descripcion: 'Cree firmemente que no existe la eternidad; todo debe morir y quedar en la nada. Borra los recuerdos de su hijo (el protagonista) en cada ciclo.',
        extra: 'Afinidad Absoluta: El Fin de la Existencia'
      }
    ]
  },
  gremio: {
    titulo: 'Sección: La Sociedad y el Gremio',
    desc: 'El estado del mundo y la organización que refugia a los marginados.',
    items: [
      {
        nombre: 'Ciudad Oculta de los Exploradores',
        subtitulo: 'Refugio Multirracial',
        descripcion: 'Una ciudad pacífica oculta en un bosque donde no importa la raza ni el origen. Civiles y guerreros conviven unidos por el gusto a las aventuras.',
        extra: 'Liderazgo: Reglas estrictas de convivencia'
      },
      {
        nombre: 'Guerra Inminente',
        subtitulo: 'Tensiones del Mundo Exterior',
        descripcion: 'Fuera del bosque, el mundo sufre de discriminación, conflictos políticos y el miedo a la corrosión que se expande.',
        extra: 'Consecuencia: Refugiados constantes'
      },
      {
        nombre: 'La Iglesia de la Creación',
        subtitulo: 'Culto de los Exorcistas',
        descripcion: 'Creyentes del Dios de la Creación que luchan para purificar las áreas corrompidas. Sin embargo, no son suficientes para frenar el avance de la Destrucción.',
        extra: 'Magia: Sanación y Purificación'
      }
    ]
  },
  razas: {
    titulo: 'Sección: Panteón y Naturaleza',
    desc: 'Entidades cósmicas y habitantes de Aethelgard.',
    items: [
      {
        nombre: 'Dios de la Creación',
        subtitulo: 'Deidad Primigenia de la Vida',
        descripcion: 'Desea preservar la vida por la eternidad y expandirse infinitamente. Al ver su mundo aniquilado, lo reconstruye creando el Bucle infinito.',
        extra: 'Ideal: Vida Eterna'
      },
      {
        nombre: 'Dios del Tiempo',
        subtitulo: 'El Observador Recluido',
        descripcion: 'Escondido del resto del mundo, es el único además de las deidades que conoce la verdad sobre los bucles infinitos. Es él quien revela el secreto al protagonista.',
        extra: 'Conocimiento Absoluto'
      },
      {
        nombre: 'Humanos y Civiles',
        subtitulo: 'Población Común',
        descripcion: 'Altamente susceptibles a la corrosión destructiva. Muchos sufren en medio de las tensiones bélicas y dependen de los aventureros para sobrevivir.',
        extra: 'Debilidad: Mortales'
      },
      {
        nombre: 'Híbridos',
        subtitulo: 'Razas Bestiales (Ej. Perro/Humano)',
        descripcion: 'Discriminados en las ciudades grandes, suelen encontrar refugio y libertad total en las instalaciones del Gremio de Exploradores.',
        extra: 'Rasgos: Físico adaptativo'
      }
    ]
  },
  items: {
    titulo: 'Sección: Ítems y Bendiciones',
    desc: 'Herramientas esenciales para purificar la corrosión y sobrevivir.',
    items: [
      {
        nombre: 'Arma Encantada del Gremio',
        subtitulo: 'Equipamiento Militar Estándar',
        descripcion: 'Forjadas con magia especial, son las únicas armas capaces de hacer daño físico a las masas oscuras humanoides.',
        extra: 'Uso: Combate contra la Destrucción'
      },
      {
        nombre: 'Bendición de la Creación',
        subtitulo: 'Agua Sagrada Exorcista',
        descripcion: 'Sanación canalizada por la Iglesia capaz de frenar el deterioro en la piel de los heridos y limpiar terrenos contaminados.',
        extra: 'Uso: Purificación de Corrosión'
      }
    ]
  }
};

// 4. Regiones Interactivas del Mapa Oficial de DUALITY
export const MAP_REGIONS = [
  {
    id: 0,
    name: 'Vlaskaya',
    x: 29,
    y: 12,
    badge: 'FORTALEZA DEL NOROESTE • CUMBRES ESMERALDA',
    title: 'Vlaskaya, Ciudadela de las Agujas Verdes',
    desc: 'Enclavada en la cordillera oscura del noroeste y custodiada por sierpes aladas. Sus torres de cristal esmeralda resguardan los antiguos archivos astrales antes de que el invierno del bucle congele los pasos de montaña.',
    level: 'Rango Plata (Niv. 15 - 22)',
    hazards: 'Vientos cortantes en cornisas, puentes de piedra quebradizos y emboscadas aéreas.',
    boss: 'Arconte de las Agujas de Jade'
  },
  {
    id: 1,
    name: 'Kairos',
    x: 20,
    y: 30,
    badge: 'BOSQUE OCCIDENTAL • BASTIÓN FRONTERIZO',
    title: 'Kairos, Vigía del Tiempo Quebrado',
    desc: 'Asentamiento fortificado entre pinares espesos y ríos caudalosos. Es el primer punto de control donde los exploradores perciben las anomalías del reloj ancestral.',
    level: 'Rango Bronce (Niv. 5 - 12)',
    hazards: 'Trampas de cazadores, niebla densa en plataformas bajas y bestias de sombra.',
    boss: 'Acechador Mayor de Kairos'
  },
  {
    id: 2,
    name: 'Silvaris',
    x: 31,
    y: 38,
    badge: 'CORAZÓN DEL CONTINENTE • VALLE CENTRAL',
    title: 'Silvaris, Encrucijada de los Ríos',
    desc: 'El núcleo comercial y verde del continente occidental. Rodeada de lagos cristalinos y puentes colgantes, conecta los caminos hacia el desierto del sur y las montañas del norte.',
    level: 'Rango Bronce (Niv. 1 - 10)',
    hazards: 'Plataformas flotantes sobre el río, lianas móviles y ruinas inundadas.',
    boss: 'Gólem de Raíz Hueca'
  },
  {
    id: 3,
    name: 'Shkaldrim',
    x: 56,
    y: 16,
    badge: 'CORDILLERA HELADA • MINAS DEL NORTE',
    title: 'Shkaldrim, Bastión de Escarcha',
    desc: 'Excavada en las laderas nevadas al cruzar el gran puente del norte. Sus habitantes dominan la forja pesada para resistir a las criaturas que emergen de las cavernas glaciares.',
    level: 'Rango Oro (Niv. 20 - 28)',
    hazards: 'Suelo resbaladizo de hielo, caída de estalactitas y tormentas blancas.',
    boss: 'Coloso de Escarcha Eterna'
  },
  {
    id: 4,
    name: 'Durnhelm',
    x: 78,
    y: 16,
    badge: 'CONFÍN BOREAL • PICOS DE HIELO',
    title: 'Durnhelm, Trono del Invierno Perpetuo',
    desc: 'La fortaleza más septentrional y fría del mundo conocido, situada frente al lago congelado. Aquí el tiempo transcurre con una lentitud antinatural debido a la cercanía de una grieta del Vacío.',
    level: 'Rango Oro (Niv. 26 - 34)',
    hazards: 'Plataformas de hielo que colapsan al pisarlas y ventiscas que reducen la visibilidad.',
    boss: 'Valquiria del Reloj Congelado'
  },
  {
    id: 5,
    name: 'Valcordia',
    x: 60,
    y: 44,
    badge: 'ISLA CENTRAL • SEDE MAYOR DEL GREMIO',
    title: 'Valcordia, Capital de las Torres Púrpuras',
    desc: 'Imponente metrópoli amurallada en la isla central, unida al continente por dos grandes puentes de piedra. Es el cuartel supremo del Gremio de Exploradores y centro de mando contra el bucle.',
    level: 'Zona Segura / Rango Plata (Niv. 12 - 25)',
    hazards: 'Criptas subterráneas bajo el castillo y gárgolas centinelas en los tejados.',
    boss: 'Inquisidor Corrompido del Eclipse'
  },
  {
    id: 6,
    name: 'Gorak-Thul',
    x: 28,
    y: 73,
    badge: 'DESIERTO DEL SUROESTE • DUNAS ÁMBAR',
    title: 'Gorak-Thul, Oasis de las Arenas Rojas',
    desc: 'Bastión nómada levantado entre dunas ardientes, cañones rocosos y torres de vigilancia antiguas. Bajo sus arenas yacen templos solares sepultados por ciclos olvidados.',
    level: 'Rango Plata (Niv. 16 - 24)',
    hazards: 'Arenas movedizas temporales, tolvaneras y escorpiones acorazados.',
    boss: 'Señor de las Dunas de Ceniza'
  },
  {
    id: 7,
    name: 'Shivara',
    x: 51,
    y: 72,
    badge: 'FRONTERA SUR • BOSQUE CARMESÍ',
    title: 'Shivara, Santuario del Paso Sur',
    desc: 'Poblado estratégico situado entre las dunas áridas de Gorak-Thul y las costas orientales. Sus carpas rojas albergan a alquimistas, mercenarios y buscadores de reliquias.',
    level: 'Rango Plata (Niv. 14 - 20)',
    hazards: 'Esporas somníferas en el bosque y bandidos del Velo.',
    boss: 'Quimera del Velo Rojo'
  },
  {
    id: 8,
    name: 'Lorialis',
    x: 71,
    y: 81,
    badge: 'PENÍNSULA SURESTE • SANTUARIO DEL LAGO',
    title: 'Lorialis, Alcázar de la Laguna Sagrada',
    desc: 'Majestuoso castillo de piedra blanca junto a una laguna mística que custodia un altar sumergido. Sus aguas reflejan las dos realidades del mundo simultáneamente.',
    level: 'Rango Oro (Niv. 24 - 30)',
    hazards: 'Plataformas sumergibles que cambian con la Dualidad y espectros acuáticos.',
    boss: 'Leviatán del Espejo Astral'
  },
  {
    id: 9,
    name: 'Thalania & Undeara',
    x: 86,
    y: 55,
    badge: 'ARCHIPIÉLAGO ORIENTAL • RUTAS NAVALES',
    title: 'Islas de Thalania y Undeara',
    desc: 'Puertos insulares conectados por flotas de galeones desde Valcordia. Sus aguas profundas son patrulladas por serpientes marinas abisales y guardan el acceso a las ruinas oceánicas.',
    level: 'Rango Maestro (Niv. 30+)',
    hazards: 'Combate sobre cubiertas de barcos en movimiento, arrecifes y tormentas marinas.',
    boss: 'Sierpe Abisal de los Mares del Este'
  }
];

// 5. Roles genéricos del Estudio Desarrollador
export const STUDIO_TEAM = [
  { rol: 'Arquitectura & PWA', titulo: 'Líder de Arquitectura Web y Móvil', desc: 'Desarrollo de la Aplicación Web Progresiva (PWA), programación de Service Worker, Manifiesto Web, API de autenticación y arquitectura general.' },
  { rol: 'Dirección de Arte & UI', titulo: 'Dirección de Arte e Interfaz', desc: 'Diseño del sistema de contenedores de pergaminos (Scroll Kit y rollos fijos), curaduría de paleta de colores Dark Fantasy e iconografía.' },
  { rol: 'Diseño de Mundo y Mapas', titulo: 'Diseño de Niveles y Cartografía', desc: 'Diseño de los escenarios de plataformas 2D, cartografía de los biomas de Aethelgard y estructuración del Gremio de Exploradores.' },
  { rol: 'Sistema de Combate', titulo: 'Ingeniería de Gameplay y Balance', desc: 'Diseño de las mecánicas de combate por turnos, balance de las Clases de personajes, árbol de habilidades y catálogo de ítems/bufos.' },
  { rol: 'Narrativa, Lore y Razas', titulo: 'Dirección Narrativa y Guion', desc: 'Creación de la trama principal, reglas narrativas del Bucle Temporal, trasfondo de personajes aliados y diseño de razas y facciones.' },
  { rol: 'Bestiario y Audio', titulo: 'Diseño Sonoro y Bestiario', desc: 'Creación del bestiario de Criaturas del Vacío, estadísticas de jefes, ambientación sonora y curaduría de la sección de Soundtrack.' }
];