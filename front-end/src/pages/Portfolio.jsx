function Portfolio() {
      return (
          <div>
<div className="bg-fond m-0 font-sans text-texte font-medium">


<header className="sticky top-0 bg-white flex items-center gap-8 px-8 py-4 z-[1000]">
    <img src="../picture/photoTim.png" className="w-20 h-20 rounded-full" alt="Photo de profil" />
    <h1 className="text-2xl font-bold">ITHIER Timothée</h1>

    <ul className="ml-auto hidden md:flex gap-6 list-none p-0">
        <li><a href="lettre-generateur-v1.html" className="no-underline font-bold text-texte">Générateur de Lettres</a></li>
        <li><a href="#projets" className="no-underline font-bold text-texte">Mes projets</a></li>
        <li><a href="#competences" className="no-underline font-bold text-texte">Mes compétences</a></li>
        <li><a href="#reseaux" className="no-underline font-bold text-texte">Mes réseaux</a></li>
        <li><a href="#contact" className="no-underline font-bold text-texte">Contact</a></li>
    </ul>
</header>


<section className="relative h-screen bg-hero flex flex-col justify-center text-center p-8">
    <div className="absolute top-8 left-8 bg-vert-fonce/25 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white text-base leading-tight w-max max-w-[250px] max-md:top-4 max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-[calc(100%-2rem)] max-md:text-center">
        <p><strong className="text-white font-semibold">Téléphone :</strong> 07 89 42 79 78</p>
        <p><strong className="text-white font-semibold">Email :</strong> timotheeithier@gmail.com</p>
        <p><strong className="text-white font-semibold">Âge :</strong> 22 ans</p>
        <p><strong className="text-white font-semibold">Langues :</strong> Français, Anglais</p>
    </div>
    <h2 className="text-5xl max-md:text-4xl">Timothée ITHIER</h2>
    <p className="text-xl">
        Développeur Full Stack (Data, IA, Web, Gestion, <br />
        Infographiste 3D Généraliste) à Epitech Lyon. <br />
        En recherche d'une alternance pour 2026 sur Lyon ou agglomération.
    </p>
</section>


<section id="projets" className="py-16 px-8">

    
    <div className="mb-24 p-10 bg-gradient-to-b from-vert-fonce to-vert-moyen rounded-2xl text-white shadow-xl border border-white/10">
        <h2 className="text-center text-4xl mb-10 tracking-wide">Silk and Steel</h2>

        <div className="flex flex-wrap gap-10 items-start">
            <div className="flex-1 min-w-[350px] p-7 bg-white/10 rounded-2xl backdrop-blur border border-white/15 leading-relaxed text-lg">
                <p>
                    Vous êtes une araignée robot fruit d'expérience en laboratoire.
                    Vous vous réveillez au moment où une défaillance du système a
                    entraîné la casse de votre cryotube.
                    <br /><br />
                    ...il faut évacuer.
                </p>
                <a className="inline-block mt-5 px-5 py-3 bg-white text-vert-fonce no-underline rounded-lg font-bold hover:bg-green-100 transition-colors" href="https://docs.google.com/presentation/d/1JNpSLsQ7HOj-iS-nLWMz3qm7ml0GTz2HRVCA0gtNYs4/edit#slide=id.p" target="_blank">
                    Game Design Document
                </a>
            </div>

            <div className="flex-1 min-w-[350px] p-6 bg-white/10 rounded-2xl border border-white/15 backdrop-blur">
                <video controls className="w-full h-80 rounded-lg">
                    <source src="../picture/NewTrailer _Silk and Steel_.mp4" type="video/mp4" />
                </video>
            </div>
        </div>

        <div className="mt-10 p-8 bg-white/12 rounded-2xl border border-white/15 leading-relaxed text-lg">
            <p>
                Développement d'un prototype jouable sur Unreal Engine 5.<br />
                Travail sur le gameplay, le rigging, l'animation et l'optimisation technique.<br />
                Système de déplacement, IA ennemie, comportements, blueprints complexes.
            </p>
        </div>

        <div className="mt-5">
            <ul className="list-disc pl-6">
                <li>Supervision de l'équipe de modélisation.</li>
                <li>Modélisation, rigging complet et animation.</li>
                <li>Programmation avec C++ des mécaniques.</li>
                <li>UI, UX</li>
                <li>Développement des IA (Behavior Trees, C++)</li>
            </ul>
        </div>
    </div>

    
    <div className="mb-24 p-10 bg-gradient-to-b from-vert-fonce to-vert-moyen rounded-2xl text-white shadow-xl border border-white/10">
        <h2 className="text-center text-4xl mb-10 tracking-wide">Job Board (Projet d'étude EPITECH)</h2>

        <div className="flex flex-wrap gap-10 items-start">
            <div className="flex-1 min-w-[350px] p-7 bg-white/10 rounded-2xl backdrop-blur border border-white/15 leading-relaxed text-lg">
                <p>
                    Développement d'une application web complète type Job Board.
                    Travail sur le front-end, l'intégration responsive, le back-end,
                    la gestion des utilisateurs et la base de données.
                </p>
            </div>

            <div className="flex-1 min-w-[350px] p-6 bg-white/10 rounded-2xl border border-white/15 backdrop-blur">
                <img src="../picture/mainpagejob.png" alt="Job Board aperçu" className="w-full max-h-80 object-contain rounded-lg" />
            </div>
        </div>

        <div className="mt-5 flex gap-4 flex-wrap">
            <img src="../picture/canndidaturepagejob.png" alt="Capture 1 JobBoard" className="w-[calc(30%-10px)] h-auto rounded-lg border border-white/25" />
            <img src="../picture/profilpagejob.png" alt="Capture 2 JobBoard" className="w-[calc(30%-10px)] h-auto rounded-lg border border-white/25" />
        </div>

        <div className="mt-10 p-8 bg-white/12 rounded-2xl border border-white/15 leading-relaxed text-lg">
            <p>
                Développement front-end avec HTML, React et Tailwind CSS.<br />
                Conception responsive et logique d'interface.<br />
                Développement back-end avec Node.js et Express.<br />
                Base de données SQL et système d'authentification.
            </p>
        </div>

        <div className="mt-5">
            <ul className="list-disc pl-6">
                <li>Front-end complet</li>
                <li>Intégration responsive</li>
                <li>Back-end Node.js</li>
                <li>Requêtes SQL</li>
                <li>Authentification utilisateurs</li>
            </ul>
        </div>
    </div>

    
    <div className="mb-24 p-10 bg-gradient-to-b from-vert-fonce to-vert-moyen rounded-2xl text-white shadow-xl border border-white/10">
        <h2 className="text-center text-4xl mb-10 tracking-wide">Endless Runner</h2>

        <div className="flex flex-wrap gap-10 items-start">
            <div className="flex-1 min-w-[350px] p-7 bg-white/10 rounded-2xl backdrop-blur border border-white/15 leading-relaxed text-lg">
                <p>
                    Développement d'un prototype mobile de type Endless Runner,
                    centré sur la vitesse, l'esquive et la génération infinie d'obstacles.
                </p>
            </div>

            <div className="flex-1 min-w-[350px] p-6 bg-white/10 rounded-2xl border border-white/15 backdrop-blur">
                <video controls className="w-full h-80 rounded-lg">
                    <source src="../picture/Prototype Endless game Easy game.mp4" type="video/mp4" />
                </video>
            </div>
        </div>

        <div className="mt-10 p-8 bg-white/12 rounded-2xl border border-white/15 leading-relaxed text-lg">
            <p>
                Système de génération procédurale d'obstacles.<br />
                Contrôles mobiles responsives.<br />
                Optimisations mobiles (LOD, pooling, draw calls).<br />
                Boucle de gameplay simple et efficace.
            </p>
        </div>

        <div className="mt-5">
            <ul className="list-disc pl-6">
                <li>Gameplay Programming</li>
                <li>Optimisation mobile</li>
                <li>Systèmes procéduraux</li>
                <li>Unreal</li>
            </ul>
        </div>
    </div>

    
    <div className="mb-24 p-10 bg-gradient-to-b from-vert-fonce to-vert-moyen rounded-2xl text-white shadow-xl border border-white/10">
        <h2 className="text-center text-4xl mb-10 tracking-wide">Pixmas</h2>

        <div className="flex flex-wrap gap-10 items-start">
            <div className="flex-1 min-w-[350px] p-7 bg-white/10 rounded-2xl backdrop-blur border border-white/15 leading-relaxed text-lg">
                <p>
                    PIXMAS : NOËL RENCONTRE LA TRAQUE ARCADE<br />
                    Un Survivor inspiré de Pac-Man où le Père Noël affronte l'invasion des Grinchs.
                </p>
                <a className="inline-block mt-5 px-5 py-3 bg-white text-vert-fonce no-underline rounded-lg font-bold hover:bg-green-100 transition-colors" href="https://github.com/EpitechMscProPromo2028/T-JAV-501-LYO_9" target="_blank">
                    GitHub Pixmas
                </a>
            </div>

            <div className="flex-1 min-w-[350px] p-6 bg-white/10 rounded-2xl border border-white/15 backdrop-blur">
                <video controls className="w-full h-80 rounded-lg">
                    <source src="../picture/Blue Illustration Game Presentation.mp4" type="video/mp4" />
                </video>
            </div>
        </div>

        <div className="mt-5 flex gap-4 flex-wrap">
            <img src="../picture/pixmas.png" alt="Screen 1 Pixmas" className="w-[calc(30%-10px)] rounded-lg border border-white/25" />
            <img src="../picture/pixmas2.png" alt="Screen 2 Pixmas" className="w-[calc(30%-10px)] rounded-lg border border-white/25" />
        </div>

        <div className="mt-10 p-8 bg-white/12 rounded-2xl border border-white/15 leading-relaxed text-lg">
            <p>
                Développement d'un jeu 2D en Java, créé dans un style rétro pixel-art.<br />
                Conçu pour être rapide, lisible et entièrement modulable, avec un<br />
                système d'entités, de collisions, et une boucle de rendu maison.
            </p>
        </div>

        <div className="mt-5">
            <ul className="list-disc pl-6">
                <li>Programmation Java orientée objet</li>
                <li>Labyrinthe (Génération Procédurale)</li>
                <li>Gestion des collisions des sprites</li>
                <li>Création des mécaniques de jeu</li>
                <li>Structure modulaire pour entités et niveaux</li>
            </ul>
        </div>
    </div>

</section>


<section id="competences" className="py-12 px-8">
    <h2 className="text-center text-3xl mb-8">Mes compétences</h2>

    <div className="flex flex-wrap gap-8 justify-center">
        
        <div className="bg-white p-8 rounded-2xl w-[280px] shadow-lg">
            <h3 className="text-xl font-bold mb-4">Web</h3>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/html.png" />
                <span className="text-base">Html</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/CSS.png" />
                <span className="text-base">CSS</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/javascript.png" />
                <span className="text-base">Javascript</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/react.png" />
                <span className="text-base">React</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/tailwind.png" />
                <span className="text-base">Tailwind</span>
            </div>
        </div>

        
        <div className="bg-white p-8 rounded-2xl w-[280px] shadow-lg">
            <h3 className="text-xl font-bold mb-4">Infographie</h3>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/Illustrator.png" />
                <span className="text-base">Illustrator</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/photoshop.png" />
                <span className="text-base">Photoshop</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/3ds max.png" />
                <span className="text-base">3ds max</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/maya.png" />
                <span className="text-base">Maya</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/substance.png" />
                <span className="text-base">Substance</span>
            </div>
        </div>

        
        <div className="bg-white p-8 rounded-2xl w-[280px] shadow-lg">
            <h3 className="text-xl font-bold mb-4">Other</h3>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/python.png" />
                <span className="text-base">Python</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/SQL.png" />
                <span className="text-base">MySQL</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/java.png" />
                <span className="text-base">Java</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <img className="w-12 h-12" src="../picture/php.png" />
                <span className="text-base">PHP</span>
            </div>
        </div>
    </div>
</section>


<section id="reseaux" className="py-12 px-8">
    <h2 className="text-center text-3xl mb-8">Mes réseaux</h2>
    <div className="flex justify-center gap-6">
        <a href="https://www.linkedin.com/in/timothée-ithier-570149224" className="bg-vert-bouton text-white px-6 py-3 rounded-lg no-underline font-bold hover:opacity-90 transition-opacity">LinkedIn</a>
        <a href="https://github.com/Titus-Le-Poussin" className="bg-vert-bouton text-white px-6 py-3 rounded-lg no-underline font-bold hover:opacity-90 transition-opacity">GitHub</a>
        <a href="https://linktr.ee/timothee_ithier" className="bg-vert-bouton text-white px-6 py-3 rounded-lg no-underline font-bold hover:opacity-90 transition-opacity">Linktree</a>
    </div>
</section>

<section id="cv" className="py-12 px-8">
    <h2 className="text-center text-3xl mb-8">Mon CV</h2>
    <div className="flex justify-center gap-6">
        <a href="../picture/CV_TimotheeITHIER_OCT2025.pdf" className="bg-vert-bouton text-white px-6 py-3 rounded-lg no-underline font-bold hover:opacity-90 transition-opacity">See</a>
        <a href="../picture/CV_TimotheeITHIER_OCT2025.pdf" download className="bg-vert-bouton text-white px-6 py-3 rounded-lg no-underline font-bold hover:opacity-90 transition-opacity">Download</a>
    </div>
</section>


<footer id="contact" className="text-center py-8 px-8 bg-white">
    <h2 className="text-3xl mb-8">Contact</h2>

    <p className="text-xl leading-relaxed">
        Téléphone : 07 89 42 79 78<br />
        Mail : timotheeithier@gmail.com
    </p>

    <form className="mt-6 flex flex-col gap-4 items-center max-w-md mx-auto" action="mailto:timotheeithier@gmail.com" method="post">
        <input type="text" className="w-full p-3 rounded border border-gray-400" placeholder="Nom" required />
        <input type="email" className="w-full p-3 rounded border border-gray-400" placeholder="Email" required />
        <textarea className="w-full p-3 rounded border border-gray-400" placeholder="Message" rows="5" required></textarea>
        <button type="submit" className="px-6 py-3 bg-vert-bouton text-white border-none rounded-lg cursor-pointer hover:opacity-90 transition-opacity">Envoyer</button>
    </form>
</footer>
</div>
          </div>
      )
  }
  export default Portfolio