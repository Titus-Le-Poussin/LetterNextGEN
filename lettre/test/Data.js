// Données des templates de lettres
const letterTemplates = {
  "default": "<p>Bonjour Madame, Monsieur,</p><p>Je souhaite vous proposer ma candidature, car votre entreprise correspond à ce que je recherche pour mon alternance.</p><p>Votre entreprise se démarque à mes yeux grâce à son rôle dans <span class=\"dynamic-field\" id=\"preview1\"></span>, ce qui motive clairement ma candidature.</p><p>Votre organisation et la logique derrière vos travaux me donnent envie de m'y impliquer à mon tour, surtout pour participer à des projets comme <span class=\"dynamic-field\" id=\"preview2\"></span> et contribuer à leur réalisation.</p><p>Je cherche un environnement où je peux m'investir dans des projets utiles, monter en compétences et comprendre en profondeur comment une équipe professionnelle fait évoluer un produit.</p><p>Je suis actuellement en formation chez EPITECH Lyon, et je développe mes compétences en <span class=\"dynamic-field\" id=\"preview3\"></span>. J'ai déjà travaillé sur des projets académiques et personnels <span class=\"dynamic-field\" id=\"preview4\"></span>. Ces projets m'ont permis de développer une approche autonome, méthodique et orientée résultats.</p><p>Je peux ainsi apporter à votre équipe mes compétences techniques tout en m'adaptant rapidement à vos outils et méthodes.</p><p>Je peux apporter un profil polyvalent, capable de m'adapter à différents outils et technologies.</p><p>De plus, les projets que j'ai réalisés <span class=\"dynamic-field\" id=\"preview5\"></span> me donnent déjà une expérience concrète proche de vos activités, ce qui facilitera notre collaboration et l'atteinte de vos objectifs. En combinant ma polyvalence à la diversité de vos projets, nous pourrons atteindre des résultats concrets rapidement et efficacement.</p><p>Je serais ravi d'échanger avec vous pour vous montrer plus en détail mes compétences et ma motivation.</p><p>Je vous remercie pour votre temps et votre considération.</p><p class=\"signature\">Timothée ITHIER</p>",
  
  "2": "<p>Madame, Monsieur,</p><p>Votre annonce pour le poste de <span class=\"dynamic-field\" id=\"preview7\"></span> a immédiatement retenu mon attention. Je suis convaincu que <span class=\"dynamic-field\" id=\"preview6\"></span> et son rôle dans <span class=\"dynamic-field\" id=\"preview1\"></span> représentent le cadre idéal pour mon début de carrière.</p><p>Mon parcours, notamment ma formation à EPITECH Lyon, m'a permis d'acquérir de solides bases <span class=\"dynamic-field\" id=\"preview3\"></span>. J'ai également eu l'opportunité de travailler sur des projets concrets, y compris <span class=\"dynamic-field\" id=\"preview4\"></span>, démontrant mon engagement pour des projets orientés <span class=\"dynamic-field\" id=\"preview5\"></span>.</p><p>Je suis particulièrement enthousiaste à l'idée de contribuer à des missions telles que <span class=\"dynamic-field\" id=\"preview2\"></span>. Je suis jeune diplômé mais je suis prêt à investir toute mon énergie pour apprendre rapidement et m'intégrer efficacement à votre équipe.</p><p>Ma motivation, ma soif d'apprendre et ma capacité d'adaptation sont mes principaux atouts. Je serais ravi de vous exposer mes compétences plus en détail lors d'un entretien.</p><p>Dans l'attente de votre retour, veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p><p class=\"signature\">Timothée ITHIER</p>",
  
  "3": "<p>Bonjour Madame, Monsieur,</p><p>Votre entreprise retient mon attention grâce <span class=\"dynamic-field\" id=\"preview1\"></span>.</p><p>Les projets que vous développez, notamment <span class=\"dynamic-field\" id=\"preview2\"></span>, correspondent parfaitement à ce que je recherche.</p><p>Je développe actuellement mes compétences en <span class=\"dynamic-field\" id=\"preview3\"></span> et j'ai déjà réalisé des projets personnels en <span class=\"dynamic-field\" id=\"preview4\"></span>.</p><p>Ces expériences m'ont permis de travailler de manière autonome, efficace, et d'adopter une approche structurée.</p><p>Je pourrai ainsi m'impliquer rapidement dans vos projets et contribuer avec mes compétences techniques.</p><p>Les similitudes entre vos activités et les projets que j'ai réalisés en <span class=\"dynamic-field\" id=\"preview5\"></span> constituent une base solide pour une collaboration productive.</p><p>Je serais ravi d'en discuter davantage avec vous.</p><p>Timothée ITHIER</p>",
  
  "4": "<p>Bonjour Madame, Monsieur,</p><p>Je me permets de vous adresser ma candidature, car j'ai été particulièrement attiré par votre travail dans <span class=\"dynamic-field\" id=\"preview1\">(Domaine de l'entreprise)</span> et vos projets autour de <span class=\"dynamic-field\" id=\"preview2\">(type de projet, produit ou mission)</span>.<br>Votre façon de transformer des besoins concrets en solutions fonctionnelles me parle beaucoup, car c'est ce type de contribution que j'aimerais apporter dans mon alternance.</p><p>Je progresse actuellement sur <span class=\"dynamic-field\" id=\"preview3\">(langages, frameworks, outils du candidat)</span> utilisant <span class=\"dynamic-field\" id=\"preview4\">(technologies de l'entreprise / type de projet)</span>.<br>J'ai déjà réalisé quelques projets qui m'ont permis de tester mes compétences et de trouver des solutions concrètes.<br>Cette polyvalence me permettra d'apporter rapidement ces acquis à vos équipes.</p><p>En mettant mes acquis au service de votre équipe sur <span class=\"dynamic-field\" id=\"preview5\">(type de projet / technologie du candidat)</span> pour le poste de <span class=\"dynamic-field\" id=\"preview7\">(intitulé du poste)</span> chez <span class=\"dynamic-field\" id=\"preview6\">(nom de l'entreprise)</span>, nous pourrons explorer de nouvelles idées, améliorer vos solutions et progresser dans un cadre dynamique.</p><p>Merci pour votre attention, je reste à votre disposition pour un échange ou un entretien.</p><p class=\"signature\">Timothée ITHIER</p>"
};

// Données des jobs
const jobData = {
  "Développeur Web": {
    "field3": "programmation full stack, développement web front/back",
    "field5": "création d'un prototype de site portfolio en HTML/CSS : j'ai créé un site simple et responsive pour présenter mes projets, avec une navigation fluide entre les sections "Projets", "Compétences" et "Contact". L'accent est mis sur la clarté visuelle et l'accessibilité."
  },
  "Infographiste": {
    "field3": "modélisation, rigging, animation, optimisation d'assets",
    "field5": "réalisation d'assets 3D optimisés pour différents supports, incluant modélisation, texturing et rigging. Travail sur l'animation technique et la résolution de problèmes liés aux performances dans des projets personnels et scolaires."
  },
  "Développeur Python": {
    "field3": "programmation Python, automatisation, scripts utilitaires",
    "field5": "développement de petits projets Python pour automatiser des tâches ou manipuler des données, dans le but de renforcer mes bases en programmation et de les appliquer à des projets plus complexes."
  }
};

// Données des entreprises
const companyData = {
  "SNCF": {
    "field1": "la mobilité et l'innovation ferroviaire",
    "field2": "la digitalisation des services, l'optimisation des systèmes de transport ou la gestion des infrastructures",
    "field4": "comme le développement d'applications et d'outils interactifs"
  },
  "Google": {
    "field1": "la technologie et l'innovation numérique",
    "field2": "le développement de solutions cloud, intelligence artificielle et services web",
    "field4": "le développement d'applications web scalables"
  },
  "Airbus": {
    "field1": "l'aéronautique et l'innovation technologique",
    "field2": "la conception d'aéronefs, systèmes embarqués et digitalisation industrielle",
    "field4": "le développement de systèmes embarqués et logiciels critiques"
  },
  "Orange": {
    "field1": "la télécommunications et la transformation digitale",
    "field2": "le déploiement de réseaux, services cloud et cybersécurité",
    "field4": "le développement d'infrastructures réseau et applications telecom"
  },
  "Capgemini": {
    "field1": "le conseil en transformation numérique",
    "field2": "l'accompagnement des entreprises dans leur digitalisation et projets IT",
    "field4": "le développement de solutions sur mesure pour divers clients"
  },
  "Thales": {
    "field1": "défense, aéronautique et cybersécurité",
    "field2": "conception de systèmes critiques, intelligence artificielle et cyberdéfense",
    "field4": "développement de systèmes sécurisés et critiques"
  },
  "Société Générale": {
    "field1": "services financiers et l'innovation bancaire",
    "field2": "développement d'applications bancaires, fintech et services digitaux",
    "field4": "développement d'applications financières et systèmes transactionnels"
  },
  "EDF": {
    "field1": "énergie et la transition écologique",
    "field2": "production d'énergie, smart grids et digitalisation énergétique",
    "field4": "développement de solutions énergétiques intelligentes"
  },
  "Renault": {
    "field1": "automobile et la mobilité durable",
    "field2": "véhicules connectés, systèmes embarqués et innovation automobile",
    "field4": "développement de logiciels automobiles et systèmes connectés"
  },
  "Dassault Systèmes": {
    "field1": "conception 3D et simulation numérique",
    "field2": "développement de solutions CAO, PLM et jumeau numérique",
    "field4": "développement de logiciels de conception et simulation"
  },
  "Ubisoft": {
    "field1": "jeu vidéo et divertissement interactif",
    "field2": "création de jeux AAA, moteurs de jeu et technologies immersives",
    "field4": "développement de jeux vidéo et systèmes de gameplay"
  },
  "Atos": {
    "field1": "transformation digitale et services IT",
    "field2": "cloud computing, cybersécurité et big data",
    "field4": "développement de solutions cloud et applications d'entreprise"
  },
  "Schneider Electric": {
    "field1": "gestion de l'énergie et automatisation",
    "field2": "IoT industriel, smart buildings et efficacité énergétique",
    "field4": "développement de solutions IoT et systèmes automatisés"
  },
  "L'Oréal": {
    "field1": "beauté et l'innovation digitale",
    "field2": "e-commerce, applications beauty-tech et réalité augmentée",
    "field4": "développement d'applications e-commerce et expériences digitales"
  },
  "Decathlon": {
    "field1": "sport et l'innovation retail",
    "field2": "e-commerce, applications mobiles et expérience client digitale",
    "field4": "développement d'applications e-commerce et retail"
  },
  "BNP Paribas": {
    "field1": "services bancaires et fintech",
    "field2": "banque digitale, paiements innovants et services financiers",
    "field4": "développement d'applications bancaires et solutions fintech"
  },
  "Criteo": {
    "field1": "publicité digitale et marketing technologique",
    "field2": "machine learning, big data et plateformes publicitaires",
    "field4": "développement de systèmes de recommandation et traitement massif de données"
  },
  "Deezer": {
    "field1": "streaming musical et innovation audio",
    "field2": "plateformes de streaming, recommandation musicale et applications mobiles",
    "field4": "développement d'applications de streaming et services audio"
  },
  "Doctolib": {
    "field1": "e-santé et digitalisation médicale",
    "field2": "gestion de rendez-vous médicaux, téléconsultation et dossiers patients",
    "field4": "développement d'applications de santé et services patients"
  },
  "Blablacar": {
    "field1": "mobilité partagée et transport collaboratif",
    "field2": "plateforme de covoiturage, applications mobiles et optimisation d'itinéraires",
    "field4": "développement de plateformes de mise en relation et services mobiles"
  }
};