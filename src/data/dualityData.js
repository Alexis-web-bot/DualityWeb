// src/data/dualityData.js

export const getDualityData = (lang = 'es') => {
  const isEn = lang === 'en';

  return {
    // 1. Catálogo Oficial del Soundtrack
    SOUNDTRACK_LIST: [
      { id: 0, titulo: isEn ? 'I. GUILD TAVERN' : 'I. Taberna del Gremio', subtitulo: isEn ? 'Warm atmosphere of the explorers hall • gremio_taberna.mp3' : 'Ambiente cálido del salón de exploradores • gremio_taberna.mp3', src: '/audio/gremio_taberna.mp3' },
      { id: 1, titulo: isEn ? 'II. REST AT THE GUILD' : 'II. Descanso en el Gremio (Camas)', subtitulo: isEn ? 'Serene melody of recovery and inn • gremio_camas.mp3' : 'Melodía serena de recuperación y posada • gremio_camas.mp3', src: '/audio/gremio_camas.mp3' },
      { id: 2, titulo: isEn ? 'III. FOREST TRAILS' : 'III. Senderos del Bosque', subtitulo: isEn ? 'Platform exploration in the forest • bosque_nivel.mp3' : 'Exploración de plataformas en el bosque • bosque_nivel.mp3', src: '/audio/bosque_nivel.mp3' },
      { id: 3, titulo: isEn ? 'IV. THE DARK FOREST' : 'IV. El Bosque Oscuro', subtitulo: isEn ? 'Zones contaminated by void energy • bosque_oscuro_nivel.mp3' : 'Zonas contaminadas por la energía del vacío • bosque_oscuro_nivel.mp3', src: '/audio/bosque_oscuro_nivel.mp3' },
      { id: 4, titulo: isEn ? 'V. SKIRMISH IN THE WOODS' : 'V. Escaramuza en el Bosque', subtitulo: isEn ? 'Turn-based combat theme in the thicket • combate_bosque.mp3' : 'Tema de combate por turnos en la espesura • combate_bosque.mp3', src: '/audio/combate_bosque.mp3' },
      { id: 5, titulo: isEn ? 'VI. AMBUSH IN THE DARK FOREST' : 'VI. Emboscada en el Bosque Oscuro', subtitulo: isEn ? 'Combat against dark corrosion masses • combate_bosque_oscuro.mp3' : 'Combate contra masas oscuras de corrosión • combate_bosque_oscuro.mp3', src: '/audio/combate_bosque_oscuro.mp3' },
      { id: 6, titulo: isEn ? 'VII. DUEL AT THE PEAKS' : 'VII. Duelo en las Cumbres', subtitulo: isEn ? 'Tactical combat in the mountain ranges • combate_montaña.mp3' : 'Combate táctico en las cordilleras • combate_montaña.mp3', src: '/audio/combate_montaña.mp3' },
      { id: 7, titulo: isEn ? 'VIII. PRIMORDIAL FURY (BOSS)' : 'VIII. Furia Primordial (Boss Theme)', subtitulo: isEn ? 'Decisive clash against regional bosses • combate_boss.mp3' : 'Enfrentamiento decisivo contra jefes de región • combate_boss.mp3', src: '/audio/combate_boss.mp3' }
    ],

    // 2. Fases del Bucle Temporal
    LOOP_PHASES: [
      {
        shortTitle: isEn ? 'I. Primordial Amnesia' : 'I. Amnesia Primordial',
        title: isEn ? 'Phase I: The Amnesiac Awakening' : 'Fase I: El Despertar Amnésico',
        badge: isEn ? 'Unconscious' : 'Inconsciente',
        desc: isEn ? 'The protagonist wakes up without identity. The Goddess of Destruction erased his memories leaving him in a deep sleep. He is rescued by a human mage and a hybrid rogue who take him to the guild.' : 'El protagonista despierta sin identidad. La Diosa de la Destrucción borró sus recuerdos dejándolo en un sueño profundo. Es rescatado por una maga humana y un pícaro híbrido que lo llevan al gremio.',
        effect: isEn ? 'Gameplay Effect: Exploration tutorial and basic combat mechanics.' : 'Efecto Gameplay: Tutorial de exploración y mecánicas básicas de combate.'
      },
      {
        shortTitle: isEn ? 'II. Visions & Déjà Vus' : 'II. Visiones y Déjà Vus',
        title: isEn ? 'Phase II: Echo of Past Lives' : 'Fase II: El Eco de Vidas Pasadas',
        badge: isEn ? 'Partial Awakening' : 'Despertar Parcial',
        desc: isEn ? 'The protagonist begins to experience déjà vus about people, traditions, and languages from previous loops, realizing the world is moving toward an imminent war.' : 'El protagonista comienza a experimentar déjà vus sobre personas, tradiciones e idiomas de bucles anteriores, dándose cuenta de que el mundo avanza hacia una guerra inminente.',
        effect: isEn ? 'Gameplay Effect: Unlocks hidden dialogues and civilian side quests.' : 'Efecto Gameplay: Desbloquea diálogos ocultos y misiones secundarias de civiles.'
      },
      {
        shortTitle: isEn ? 'III. Abyssal Corrosion' : 'III. Corrosión Abisal',
        title: isEn ? 'Phase III: The Advance of Destruction' : 'Fase III: El Avance de la Destrucción',
        badge: isEn ? 'High Corrosion' : 'Corrosión Alta',
        desc: isEn ? 'Zones become contaminated with void energy. Dark humanoid masses appear and deteriorate the environment. A single touch from these creatures disintegrates mortals.' : 'Las zonas se contaminan con energía del vacío. Masas humanoides oscuras aparecen y deterioran el ambiente. Un solo toque de estas criaturas desintegra a los mortales.',
        effect: isEn ? 'Gameplay Effect: Environmental damage in biomes. Enemies inflict "Corrosion" status.' : 'Efecto Gameplay: Daño ambiental en los biomas. Enemigos infligen estado "Corrosión".'
      },
      {
        shortTitle: isEn ? 'IV. Divine Revelation' : 'IV. Revelación Divina',
        title: isEn ? 'Phase IV: The Secret of the Time God' : 'Fase IV: El Secreto del Dios del Tiempo',
        badge: isEn ? 'Cycle Rupture' : 'Ruptura del Ciclo',
        desc: isEn ? 'The team finds the secluded Time God. He reveals that the loop is an infinite restart orchestrated by Creation after Destruction\'s annihilation. The protagonist must use their duality to break it.' : 'El equipo encuentra al Dios del tiempo recluido. Revela que el bucle es un reinicio infinito orquestado por la Creación tras la aniquilación de la Destrucción. El protagonista debe usar su dualidad para romperlo.',
        effect: isEn ? 'Gameplay Effect: "Primordial" mode activated (Control of Creation and Destruction).' : 'Efecto Gameplay: Se activa el modo "Primordial" (Control de Creación y Destrucción).'
      }
    ],

    // 3. Base de Conocimiento del Grimorio Wiki (RUTAS .WEBP CORREGIDAS)
    WIKI_CATEGORIES: {
      personajes: {
        titulo: isEn ? 'Section: Protagonists and Companions' : 'Sección: Protagonistas y Compañeros',
        desc: isEn ? 'The team of explorers in charge of facing the world\'s corrosion and breaking the loop.' : 'El equipo de exploradores encargado de enfrentar la corrosión del mundo y romper el bucle.',
        items: [
          {
            nombre: isEn ? 'Opal' : 'Ópalo',
            subtitulo: isEn ? 'Main Protagonist (He) • Primordial Being' : 'Protagonista Principal (Él) • Ser Primordial',
            descripcion: isEn ? 'Amnesiac and weakened. He is a second-generation primordial, fruit of a fleeting romance between the God of Creation and the Goddess of Destruction. He possesses the ability to create and destroy.' : 'Amnésico y debilitado. Es un primordial de segunda generación, fruto de un romance efímero entre el Dios de la Creación y la Diosa de la Destrucción. Posee la capacidad de crear y destruir.',
            extra: isEn ? 'Origin: Son of primal forces' : 'Origen: Hijo de las fuerzas primigenias',
            imagen: '/personajes/Opalo.webp'
          },
          {
            nombre: 'Zyren',
            subtitulo: isEn ? 'Main Protagonist (She) • Primordial Being' : 'Protagonista Principal (Ella) • Ser Primordial',
            descripcion: isEn ? 'Shares the same divine origin and destiny. Destruction cannot annihilate her existence because she herself is part of destruction, but it erases her memories in every loop.' : 'Comparte el mismo origen y destino divino. La destrucción no puede aniquilar su existencia porque ella misma es parte de la destrucción, pero borra sus recuerdos en cada bucle.',
            extra: isEn ? 'Origin: Daughter of primal forces' : 'Origen: Hija de las fuerzas primigenias',
            imagen: '/personajes/Zyren.webp'
          },
          {
            nombre: 'Elizaveta',
            subtitulo: isEn ? 'Initial Companion • Human Mage' : 'Compañera Inicial • Humana Maga',
            descripcion: isEn ? 'Ranged attack specialist. Along with the hybrid rogue, she rescues the amnesiac protagonist and guides him to the hidden guild city in the forest.' : 'Especialista en ataques a distancia. Junto al pícaro híbrido, rescata al protagonista amnésico y lo guía a la ciudad oculta del gremio en el bosque.',
            extra: isEn ? 'Affinity: Magic and ranged attack' : 'Afinidad: Magia y Ataque a distancia',
            imagen: '/personajes/Elizaveta.webp'
          },
          {
            nombre: 'Rasku',
            subtitulo: isEn ? 'Initial Companion • Hybrid Rogue' : 'Compañero Inicial • Híbrido Pícaro',
            descripcion: isEn ? 'A fast close-range attacking rogue. Teaches the protagonist the guild\'s survival rules and how to deal with primal beasts.' : 'Un pícaro veloz de ataques a corto alcance. Enseña al protagonista las reglas de supervivencia del gremio y cómo lidiar con las bestias primarias.',
            extra: isEn ? 'Affinity: Close range and stealth' : 'Afinidad: Corto alcance y Sigilo',
            imagen: '/personajes/Rasku.webp'
          },
          {
            nombre: isEn ? 'General Pumpkin' : 'General Calabaza',
            subtitulo: isEn ? 'Guild Commander • Armored Defender' : 'Comandante del Gremio • Defensor Acorazado',
            descripcion: isEn ? 'An imposing fully armored warrior guarding the hidden city. Coordinates adventurer contracts and defenses against corrosion.' : 'Un imponente guerrero con armadura completa que resguarda la ciudad oculta. Coordina los encargos de los aventureros y las defensas contra la corrosión.',
            extra: isEn ? 'Affinity: Defense and heavy intervention' : 'Afinidad: Defensa e Intervención Pesada',
            imagen: '/personajes/General Calabaza.webp'
          },
          {
            nombre: 'Vajrak',
            subtitulo: isEn ? 'Allied Explorer • Multi-armed Warrior' : 'Explorador Aliado • Guerrero Multibrazo',
            descripcion: isEn ? 'A strong multiracial combatant of the explorers guild. Helps pacify external conflicts and escorts civilian caravans affected by war.' : 'Un fuerte combatiente multirracial del gremio de exploradores. Ayuda a pacificar los conflictos externos y escoltar caravanas de civiles afectados por la guerra.',
            extra: isEn ? 'Affinity: Melee combat' : 'Afinidad: Combate cuerpo a cuerpo',
            imagen: '/personajes/Vajrak.webp'
          }
        ]
      },
      clases: {
        titulo: isEn ? 'Section: Combat Classes' : 'Sección: Clases de Combate',
        desc: isEn ? 'Fighting styles used by guild members to survive the impending war.' : 'Estilos de pelea utilizados por los miembros del gremio para sobrevivir a la guerra inminente.',
        items: [
          {
            nombre: isEn ? 'Duality Primordial (Opal / Zyren)' : 'Primordial de Dualidad (Ópalo / Zyren)',
            subtitulo: isEn ? 'Creation and Destruction Ability' : 'Habilidad de Creación y Destrucción',
            descripcion: isEn ? 'Unique class. Their inner power is unstable: they can heal using Creation energy or disintegrate enemies with Destruction, but risk corrupting themselves.' : 'Clase única. Su poder interno es inestable: pueden sanar usando energía de Creación o desintegrar enemigos con Destrucción, pero corren el riesgo de corromperse a sí mismos.',
            extra: isEn ? 'Second Generation Hidden Power' : 'Poder Oculto de Segunda Generación'
          },
          {
            nombre: isEn ? 'Ranged Mage (Elizaveta)' : 'Maga a Distancia (Elizaveta)',
            subtitulo: isEn ? 'Area control and magical projectiles' : 'Control de área y proyectiles mágicos',
            descripcion: isEn ? 'Attacks from the rear to avoid physical contact with the destructive corrosive creatures.' : 'Ataca desde la retaguardia para evitar el contacto físico con las criaturas corrosivas de la destrucción.',
            extra: isEn ? 'Role: Offensive Support' : 'Rol: Soporte Ofensivo'
          },
          {
            nombre: isEn ? 'Hybrid Rogue (Rasku)' : 'Pícaro Híbrido (Rasku)',
            subtitulo: isEn ? 'Speed and stealthy attacks' : 'Velocidad y ataques furtivos',
            descripcion: isEn ? 'Strikes at close range and quickly retreats before the enemy can respond. Excellent for agile exploration.' : 'Golpea a corto alcance y se retira rápidamente antes de que el enemigo pueda responder. Excelente para la exploración ágil.',
            extra: isEn ? 'Role: Burst Damage' : 'Rol: Daño Rápido'
          },
          {
            nombre: isEn ? 'Creation Exorcist' : 'Exorcista de la Creación',
            subtitulo: isEn ? 'Purification and Blessings' : 'Purificación y Bendiciones',
            descripcion: isEn ? 'Clerics of the Church of Creation capable of halting corrosion in people and healing environments contaminated by the Void.' : 'Clérigos de la Iglesia de la Creación capaces de frenar la corrosión en las personas y sanar el ambiente contaminado por el Vacío.',
            extra: isEn ? 'Role: Healer' : 'Rol: Sanador'
          },
          {
            nombre: isEn ? 'Heavy Defender (General Pumpkin)' : 'Defensor Pesado (General Calabaza)',
            subtitulo: isEn ? 'Tank and provocation' : 'Tanque y provocación',
            descripcion: isEn ? 'Draws damage toward his heavy shield to protect civilians and hold the frontline in the guild.' : 'Atrae el daño hacia su escudo pesado para proteger a los civiles y mantener la línea frontal en el gremio.',
            extra: isEn ? 'Role: Absolute Tank' : 'Rol: Tanque Absoluto'
          }
        ]
      },
      enemigos: {
        titulo: isEn ? 'Section: Forces of Destruction' : 'Sección: Fuerzas de Destrucción',
        desc: isEn ? 'Creatures sent to eradicate life and accelerate the time loop reset.' : 'Criaturas enviadas para erradicar la vida y acelerar el reinicio del bucle temporal.',
        items: [
          {
            nombre: isEn ? 'Dark Masses (Infected)' : 'Masas Oscuras (Infectados)',
            subtitulo: isEn ? 'Humanoid Destruction Creatures' : 'Criaturas de Destrucción Humanoides',
            descripcion: isEn ? 'Beings of terribly toxic dark energy. They seek to disintegrate mortals with a mere touch, spreading corrosion throughout the environment.' : 'Seres de energía oscura terriblemente tóxica. Buscan desintegrar a los mortales con solo tocarlos, esparciendo corrosión en el ambiente.',
            extra: isEn ? 'Weakness: Guild Enchanted Weapons' : 'Debilidad: Armas encantadas del Gremio'
          },
          {
            nombre: isEn ? 'Corrosion Beasts' : 'Bestias de Corrosión',
            subtitulo: isEn ? 'Fauna corrupted by the void' : 'Fauna corrompida por el vacío',
            descripcion: isEn ? 'Forest animals assimilated by destructive energy. Their bite leaves corrosive marks that sicken people.' : 'Animales del bosque asimilados por la energía destructiva. Su mordida deja marcas corrosivas que enferman a las personas.',
            extra: isEn ? 'Cure: Exorcist Blessing' : 'Cura: Bendición de Exorcistas'
          },
          {
            nombre: isEn ? 'Goddess of Destruction' : 'Diosa de la Destrucción',
            subtitulo: isEn ? 'Primal Deity' : 'Deidad Primigenia',
            descripcion: isEn ? 'Believes firmly that eternity does not exist; everything must die and fade into nothingness. Erases her son\'s (the protagonist) memories in every cycle.' : 'Cree firmemente que no existe la eternidad; todo debe morir y quedar en la nada. Borra los recuerdos de su hijo (el protagonista) en cada ciclo.',
            extra: isEn ? 'Absolute Affinity: The End of Existence' : 'Afinidad Absoluta: El Fin de la Existencia'
          }
        ]
      },
      gremio: {
        titulo: isEn ? 'Section: Society and the Guild' : 'Sección: La Sociedad y el Gremio',
        desc: isEn ? 'The state of the world and the organization sheltering the marginalized.' : 'El estado del mundo y la organización que refugia a los marginados.',
        items: [
          {
            nombre: isEn ? 'Hidden City of Explorers' : 'Ciudad Oculta de los Exploradores',
            subtitulo: isEn ? 'Multiracial Refuge' : 'Refugio Multirracial',
            descripcion: isEn ? 'A peaceful city hidden in a forest where race and origin do not matter. Civilians and warriors live united by their love for adventure.' : 'Una ciudad pacífica oculta en un bosque donde no importa la raza ni el origen. Civiles y guerreros conviven unidos por el gusto a las aventuras.',
            extra: isEn ? 'Leadership: Strict coexistence rules' : 'Liderazgo: Reglas estrictas de convivencia'
          },
          {
            nombre: isEn ? 'Impending War' : 'Guerra Inminente',
            subtitulo: isEn ? 'External World Tensions' : 'Tensiones del Mundo Exterior',
            descripcion: isEn ? 'Outside the forest, the world suffers from discrimination, political conflicts, and the fear of expanding corrosion.' : 'Fuera del bosque, el mundo sufre de discriminación, conflictos políticos y el miedo a la corrosión que se expande.',
            extra: isEn ? 'Consequence: Constant refugees' : 'Consecuencia: Refugiados constantes'
          },
          {
            nombre: isEn ? 'Church of Creation' : 'La Iglesia de la Creación',
            subtitulo: isEn ? 'Cult of Exorcists' : 'Culto de los Exorcistas',
            descripcion: isEn ? 'Believers in the God of Creation who fight to purify corrupted areas. However, they are not enough to halt Destruction\'s advance.' : 'Creyentes del Dios de la Creación que luchan para purificar las áreas corrompidas. Sin embargo, no son suficientes para frenar el avance de la Destrucción.',
            extra: isEn ? 'Magic: Healing and Purification' : 'Magia: Sanación y Purificación'
          }
        ]
      },
      razas: {
        titulo: isEn ? 'Section: Pantheon and Nature' : 'Sección: Panteón y Naturaleza',
        desc: isEn ? 'Cosmic entities and inhabitants of Aethelgard.' : 'Entidades cósmicas y habitantes de Aethelgard.',
        items: [
          {
            nombre: isEn ? 'God of Creation' : 'Dios de la Creación',
            subtitulo: isEn ? 'Primal Deity of Life' : 'Deidad Primigenia de la Vida',
            descripcion: isEn ? 'Wishes to preserve life for eternity and expand infinitely. Seeing his world annihilated, he rebuilds it by creating the infinite Loop.' : 'Desea preservar la vida por la eternidad y expandirse infinitamente. Al ver su mundo aniquilado, lo reconstruye creando el Bucle infinito.',
            extra: isEn ? 'Ideal: Eternal Life' : 'Ideal: Vida Eterna'
          },
          {
            nombre: isEn ? 'Time God' : 'Dios del Tiempo',
            subtitulo: isEn ? 'The Secluded Observer' : 'El Observador Recluido',
            descripcion: isEn ? 'Hidden from the rest of the world, he is the only one besides the deities who knows the truth about the infinite loops. He is the one who reveals the secret to the protagonist.' : 'Escondido del resto del mundo, es el único además de las deidades que conoce la verdad sobre los bucles infinitos. Es él quien revela el secreto al protagonista.',
            extra: isEn ? 'Absolute Knowledge' : 'Conocimiento Absoluto'
          },
          {
            nombre: isEn ? 'Humans and Civilians' : 'Humanos y Civiles',
            subtitulo: isEn ? 'Common Population' : 'Población Común',
            descripcion: isEn ? 'Highly susceptible to destructive corrosion. Many suffer amid war tensions and depend on adventurers to survive.' : 'Altamente susceptibles a la corrosión destructiva. Muchos sufren en medio de las tensiones bélicas y dependen de los aventureros para sobrevivir.',
            extra: isEn ? 'Weakness: Mortals' : 'Debilidad: Mortales'
          },
          {
            nombre: isEn ? 'Hybrids' : 'Híbridos',
            subtitulo: isEn ? 'Bestial Races (e.g. Dog/Human)' : 'Razas Bestiales (Ej. Perro/Humano)',
            descripcion: isEn ? 'Discriminated against in large cities, they often find refuge and total freedom within the Explorers Guild facilities.' : 'Discriminados en las ciudades grandes, suelen encontrar refugio y libertad total en las instalaciones del Gremio de Exploradores.',
            extra: isEn ? 'Traits: Adaptive physique' : 'Rasgos: Físico adaptativo'
          }
        ]
      },
      items: {
        titulo: isEn ? 'Section: Items and Blessings' : 'Sección: Ítems y Bendiciones',
        desc: isEn ? 'Essential tools to purify corrosion and survive.' : 'Herramientas esenciales para purificar la corrosión y sobrevivir.',
        items: [
          {
            nombre: isEn ? 'Guild Enchanted Weapon' : 'Arma Encantada del Gremio',
            subtitulo: isEn ? 'Standard Military Equipment' : 'Equipamiento Militar Estándar',
            descripcion: isEn ? 'Forged with special magic, these are the only weapons capable of dealing physical damage to humanoid dark masses.' : 'Forjadas con magia especial, son las únicas armas capaces de hacer daño físico a las masas oscuras humanoides.',
            extra: isEn ? 'Use: Combat against Destruction' : 'Uso: Combate contra la Destrucción'
          },
          {
            nombre: isEn ? 'Creation Blessing' : 'Bendición de la Creación',
            subtitulo: isEn ? 'Exorcist Holy Water' : 'Agua Sagrada Exorcista',
            descripcion: isEn ? 'Healing channeled by the Church capable of halting deterioration on the skin of the wounded and cleaning contaminated terrain.' : 'Sanación canalizada por la Iglesia capaz de frenar el deterioro en la piel de los heridos y limpiar terrenos contaminados.',
            extra: isEn ? 'Use: Corrosion Purification' : 'Uso: Purificación de Corrosión'
          }
        ]
      }
    },

    // 4. Regiones Interactivas del Mapa Oficial (KAIROS ES #1)
    MAP_REGIONS: [
      {
        id: 0,
        name: isEn ? 'Kairos' : 'Kairos',
        x: 20,
        y: 30,
        badge: isEn ? 'WESTERN FOREST • BORDER BASTION' : 'BOSQUE OCCIDENTAL • BASTIÓN FRONTERIZO',
        title: isEn ? 'Kairos, Watcher of Broken Time' : 'Kairos, Vigía del Tiempo Quebrado',
        desc: isEn ? 'Fortified settlement among thick pine forests and rushing rivers. It is the first checkpoint where explorers perceive the anomalies of the ancestral clock.' : 'Asentamiento fortificado entre pinares espesos y ríos caudalosos. Es el primer punto de control donde los exploradores perciben las anomalías del reloj ancestral.',
        level: isEn ? 'Bronze Rank (Lvl. 5 - 12)' : 'Rango Bronce (Niv. 5 - 12)',
        hazards: isEn ? 'Hunter traps, dense fog in low platforms, and shadow beasts.' : 'Trampas de cazadores, niebla densa en plataformas bajas y bestias de sombra.',
        boss: isEn ? 'Kairos Elder Stalker' : 'Acechador Mayor de Kairos'
      },
      {
        id: 1,
        name: isEn ? 'Vlaskaya' : 'Vlaskaya',
        x: 29,
        y: 12,
        badge: isEn ? 'NORTHWEST FORTRESS • EMERALD PEAKS' : 'FORTALEZA DEL NOROESTE • CUMBRES ESMERALDA',
        title: isEn ? 'Vlaskaya, Citadel of the Green Spires' : 'Vlaskaya, Ciudadela de las Agujas Verdes',
        desc: isEn ? 'Nestled in the dark northwestern mountain range and guarded by winged serpents. Its emerald crystal towers safeguard the ancient astral archives before the loop\'s winter freezes the mountain passes.' : 'Enclavada en la cordillera oscura del noroeste y custodiada por sierpes aladas. Sus torres de cristal esmeralda resguardan los antiguos archivos astrales antes de que el invierno del bucle congele los pasos de montaña.',
        level: isEn ? 'Silver Rank (Lvl. 15 - 22)' : 'Rango Plata (Niv. 15 - 22)',
        hazards: isEn ? 'Cutting winds on cornices, brittle stone bridges, and aerial ambushes.' : 'Vientos cortantes en cornisas, puentes de piedra quebradizos y emboscadas aéreas.',
        boss: isEn ? 'Archon of the Jade Spires' : 'Arconte de las Agujas de Jade'
      },
      {
        id: 2,
        name: isEn ? 'Silvaris' : 'Silvaris',
        x: 31,
        y: 38,
        badge: isEn ? 'CONTINENT HEART • CENTRAL VALLEY' : 'CORAZÓN DEL CONTINENTE • VALLE CENTRAL',
        title: isEn ? 'Silvaris, Crossroads of Rivers' : 'Silvaris, Encrucijada de los Ríos',
        desc: isEn ? 'The green and commercial core of the western continent. Surrounded by crystal lakes and suspension bridges, it connects paths to the southern desert and northern mountains.' : 'El núcleo comercial y verde del continente occidental. Rodeada de lagos cristalinos y puentes colgantes, conecta los caminos hacia el desierto del sur y las montañas del norte.',
        level: isEn ? 'Bronze Rank (Lvl. 1 - 10)' : 'Rango Bronce (Niv. 1 - 10)',
        hazards: isEn ? 'Floating platforms over the river, moving vines, and flooded ruins.' : 'Plataformas flotantes sobre el río, lianas móviles y ruinas inundadas.',
        boss: isEn ? 'Hollow Root Golem' : 'Gólem de Raíz Hueca'
      },
      {
        id: 3,
        name: isEn ? 'Shkaldrim' : 'Shkaldrim',
        x: 56,
        y: 16,
        badge: isEn ? 'FROZEN RANGE • NORTHERN MINES' : 'CORDILLERA HELADA • MINAS DEL NORTE',
        title: isEn ? 'Shkaldrim, Bastion of Frost' : 'Shkaldrim, Bastión de Escarcha',
        desc: isEn ? 'Carved into snowy slopes across the great northern bridge. Its inhabitants master heavy forging to resist creatures emerging from glacial caves.' : 'Excavada en las laderas nevadas al cruzar el gran puente del norte. Sus habitantes dominan la forja pesada para resistir a las criaturas que emergen de las cavernas glaciares.',
        level: isEn ? 'Gold Rank (Lvl. 20 - 28)' : 'Rango Oro (Niv. 20 - 28)',
        hazards: isEn ? 'Slippery ice ground, falling icicles, and whiteout storms.' : 'Suelo resbaladizo de hielo, caída de estalactitas y tormentas blancas.',
        boss: isEn ? 'Colossus of Eternal Frost' : 'Coloso de Escarcha Eterna'
      },
      {
        id: 4,
        name: isEn ? 'Durnhelm' : 'Durnhelm',
        x: 78,
        y: 16,
        badge: isEn ? 'BOREAL BORDER • ICE PEAKS' : 'CONFÍN BOREAL • PICOS DE HIELO',
        title: isEn ? 'Durnhelm, Throne of Perpetual Winter' : 'Durnhelm, Trono del Invierno Perpetuo',
        desc: isEn ? 'The northernmost and coldest fortress in the known world, situated facing the frozen lake. Time passes here with unnatural slowness due to the proximity of a Void rift.' : 'La fortaleza más septentrional y fría del mundo conocido, situada frente al lago congelado. Aquí el tiempo transcurre con una lentitud antinatural debido a la cercanía de una grieta del Vacío.',
        level: isEn ? 'Gold Rank (Lvl. 26 - 34)' : 'Rango Oro (Niv. 26 - 34)',
        hazards: isEn ? 'Collapsing ice platforms and blizzards reducing visibility.' : 'Plataformas de hielo que colapsan al pisarlas y ventiscas que reducen la visibilidad.',
        boss: isEn ? 'Valkyrie of the Frozen Clock' : 'Valquiria del Reloj Congelado'
      },
      {
        id: 5,
        name: isEn ? 'Valcordia' : 'Valcordia',
        x: 60,
        y: 44,
        badge: isEn ? 'CENTRAL ISLAND • GUILD HQ' : 'ISLA CENTRAL • SEDE MAYOR DEL GREMIO',
        title: isEn ? 'Valcordia, Capital of Purple Spires' : 'Valcordia, Capital de las Torres Púrpuras',
        desc: isEn ? 'Imposing walled metropolis on the central island, connected to the continent by two grand stone bridges. It is the supreme headquarters of the Explorers Guild and command center against the loop.' : 'Imponente metrópoli amurallada en la isla central, unida al continente por dos grandes puentes de piedra. Es el cuartel supremo del Gremio de Exploradores y centro de mando contra el bucle.',
        level: isEn ? 'Safe Zone / Silver Rank (Lvl. 12 - 25)' : 'Zona Segura / Rango Plata (Niv. 12 - 25)',
        hazards: isEn ? 'Underground crypts beneath the castle and sentinel gargoyles on rooftops.' : 'Criptas subterráneas bajo el castillo y gárgolas centinelas en los tejados.',
        boss: isEn ? 'Corrupted Inquisitor of the Eclipse' : 'Inquisidor Corrompido del Eclipse'
      },
      {
        id: 6,
        name: isEn ? 'Gorak-Thul' : 'Gorak-Thul',
        x: 28,
        y: 73,
        badge: isEn ? 'SOUTHWEST DESERT • AMBER DUNES' : 'DESIERTO DEL SUROESTE • DUNAS ÁMBAR',
        title: isEn ? 'Gorak-Thul, Oasis of Red Sands' : 'Gorak-Thul, Oasis de las Arenas Rojas',
        desc: isEn ? 'Nomadic bastion raised among burning dunes, rocky canyons, and ancient watchtowers. Beneath its sands lie solar temples buried by forgotten cycles.' : 'Bastión nómada levantado entre dunas ardientes, cañones rocosos y torres de vigilancia antiguas. Bajo sus arenas yacen templos solares sepultados por ciclos olvidados.',
        level: isEn ? 'Silver Rank (Lvl. 16 - 24)' : 'Rango Plata (Niv. 16 - 24)',
        hazards: isEn ? 'Temporal quicksand, dust storms, and armored scorpions.' : 'Arenas movedizas temporales, tolvaneras y escorpiones acorazados.',
        boss: isEn ? 'Lord of the Ash Dunes' : 'Señor de las Dunas de Ceniza'
      },
      {
        id: 7,
        name: isEn ? 'Shivara' : 'Shivara',
        x: 51,
        y: 72,
        badge: isEn ? 'SOUTHERN BORDER • CRIMSON FOREST' : 'FRONTERA SUR • BOSQUE CARMESÍ',
        title: isEn ? 'Shivara, Sanctuary of the Southern Pass' : 'Shivara, Santuario del Paso Sur',
        desc: isEn ? 'Strategic settlement located between the arid dunes of Gorak-Thul and the eastern coasts. Its red tents house alchemists, mercenaries, and relic seekers.' : 'Poblado estratégico situado entre las dunas áridas de Gorak-Thul y las costas orientales. Sus carpas rojas albergan a alquimistas, mercenarios y buscadores de reliquias.',
        level: isEn ? 'Silver Rank (Lvl. 14 - 20)' : 'Rango Plata (Niv. 14 - 20)',
        hazards: isEn ? 'Soporific spores in the forest and Veil bandits.' : 'Esporas somníferas en el bosque y bandidos del Velo.',
        boss: isEn ? 'Red Veil Chimera' : 'Quimera del Velo Rojo'
      },
      {
        id: 8,
        name: isEn ? 'Lorialis' : 'Lorialis',
        x: 71,
        y: 81,
        badge: isEn ? 'SOUTHEAST PENINSULA • LAGOON SANCTUARY' : 'PENÍNSULA SURESTE • SANTUARIO DEL LAGO',
        title: isEn ? 'Lorialis, Alcazar of the Sacred Lagoon' : 'Lorialis, Alcázar de la Laguna Sagrada',
        desc: isEn ? 'Majestic white stone castle next to a mystical lagoon guarding a submerged altar. Its waters reflect the world\'s two realities simultaneously.' : 'Majestuoso castillo de piedra blanca junto a una laguna mística que custodia un altar sumergido. Sus aguas reflejan las dos realidades del mundo simultáneamente.',
        level: isEn ? 'Gold Rank (Lvl. 24 - 30)' : 'Rango Oro (Niv. 24 - 30)',
        hazards: isEn ? 'Submersible platforms shifting with Duality and aquatic specters.' : 'Plataformas sumergibles que cambian con la Dualidad y espectros acuáticos.',
        boss: isEn ? 'Astral Mirror Leviathan' : 'Leviatán del Espejo Astral'
      },
      {
        id: 9,
        name: isEn ? 'Thalania & Undeara' : 'Thalania & Undeara',
        x: 86,
        y: 55,
        badge: isEn ? 'EASTERN ARCHIPELAGO • NAVAL ROUTES' : 'ARCHIPIÉLAGO ORIENTAL • RUTAS NAVALES',
        title: isEn ? 'Islands of Thalania and Undeara' : 'Islas de Thalania y Undeara',
        desc: isEn ? 'Insular ports connected by fleets of galleons from Valcordia. Their deep waters are patrolled by abyssal sea serpents and guard access to oceanic ruins.' : 'Puertos insulares conectados por flotas de galeones desde Valcordia. Sus aguas profundas son patrulladas por serpientes marinas abisales y guardan el acceso a las ruinas oceánicas.',
        level: isEn ? 'Master Rank (Lvl. 30+)' : 'Rango Maestro (Niv. 30+)',
        hazards: isEn ? 'Combat on moving ship decks, reefs, and sea storms.' : 'Combate sobre cubiertas de barcos en movimiento, arrecifes y tormentas marinas.',
        boss: isEn ? 'Abyssal Serpent of the Eastern Seas' : 'Sierpe Abisal de los Mares del Este'
      }
    ],

    // 5. Roles del Estudio Desarrollador
    STUDIO_TEAM: [
      { rol: isEn ? 'Architecture & PWA' : 'Arquitectura & PWA', titulo: isEn ? 'Lead Web and Mobile Architect' : 'Líder de Arquitectura Web y Móvil', desc: isEn ? 'Progressive Web Application (PWA) development, Service Worker programming, Web Manifest, auth API, and general architecture.' : 'Desarrollo de la Aplicación Web Progresiva (PWA), programación de Service Worker, Manifiesto Web, API de autenticación y arquitectura general.' },
      { rol: isEn ? 'Art Direction & UI' : 'Dirección de Arte & UI', titulo: isEn ? 'Art and Interface Direction' : 'Dirección de Arte e Interfaz', desc: isEn ? 'Scroll container system design (Scroll Kit and fixed rolls), Dark Fantasy color palette curation, and iconography.' : 'Diseño del sistema de contenedores de pergaminos (Scroll Kit y rollos fijos), curaduría de paleta de colores Dark Fantasy e iconografía.' },
      { rol: isEn ? 'World Design & Maps' : 'Diseño de Mundo y Mapas', titulo: isEn ? 'Level Design and Cartography' : 'Diseño de Niveles y Cartografía', desc: isEn ? '2D platforming stage design, Aethelgard biomes cartography, and Explorers Guild structuring.' : 'Diseño de los escenarios de plataformas 2D, cartografía de los biomas de Aethelgard y estructuración del Gremio de Exploradores.' },
      { rol: isEn ? 'Combat System' : 'Sistema de Combate', titulo: isEn ? 'Gameplay and Balance Engineering' : 'Ingeniería de Gameplay y Balance', desc: isEn ? 'Turn-based combat mechanics design, character class balancing, skill trees, and items/buffs catalog.' : 'Diseño de las mecánicas de combate por turnos, balance de las Clases de personajes, árbol de habilidades y catálogo de ítems/bufos.' },
      { rol: isEn ? 'Narrative, Lore & Races' : 'Narrativa, Lore y Razas', titulo: isEn ? 'Narrative Direction and Script' : 'Dirección Narrativa y Guion', desc: isEn ? 'Main plot creation, Time Loop narrative rules, allied character backgrounds, and races/factions design.' : 'Creación de la trama principal, reglas narrativas del Bucle Temporal, trasfondo de personajes aliados y diseño de razas y facciones.' },
      { rol: isEn ? 'Bestiary & Audio' : 'Bestiario y Audio', titulo: isEn ? 'Sound Design and Bestiary' : 'Diseño Sonoro y Bestiario', desc: isEn ? 'Void Creatures bestiary creation, boss stats, soundscaping, and Soundtrack section curation.' : 'Creación del bestiario de Criaturas del Vacío, estadísticas de jefes, ambientación sonora y curaduría de la sección de Soundtrack.' }
    ]
  };
};