INSERT INTO users (username, email, password)
VALUES ('Timothée', 'timotheeithier@gmail.com', 'test123');



INSERT INTO prompts (user_id, name, content, is_default)
VALUES (1, 'default', $$A partir de l'offre d'emploi fournie, extrais les informations suivantes au format JSON :

{
  "field1": "Domaine de l'entreprise (ex: la mobilite et l'innovation ferroviaire)",
  "field2": "Type de projet, produit ou mission de l'entreprise (ex: digitalisation des services, optimisation des systemes)",
  "field3": "Langages, frameworks, outils recherches (ex: programmation full stack, Python, React)",
  "field4": "Technologies de l'entreprise / type de projet (ex: developpement d'applications web)",
  "field5": "Type de projet / technologie a mettre en avant par le candidat (ex: developpement web et informatique)",
  "field6": "Nom de l'entreprise",
  "field7": "Intitule exact du poste"
}

Regles importantes :
- Pour field1 : identifie le SECTEUR d'activite principal
- Pour field2 : liste les MISSIONS ou PROJETS concrets
- Pour field3 : extrais les COMPETENCES TECHNIQUES demandees
- Pour field4 : identifie les TECHNOLOGIES ou TYPES DE PROJETS de l'entreprise
- Pour field5 : suggere des projets pertinents que le candidat pourrait mettre en avant
- Reponds UNIQUEMENT avec le JSON, sans texte supplementaire$$, TRUE);












INSERT INTO letter_templates (user_id, name, content, is_default)
VALUES (1, 'default', $$Bonjour Madame, Monsieur,

Je souhaite vous proposer ma candidature, car votre entreprise correspond a ce que je recherche pour mon alternance.

Votre entreprise se demarque a mes yeux grace a son role dans {{field1}}, ce qui motive clairement ma candidature.

Votre organisation et la logique derriere vos travaux me donnent envie de m'y impliquer a mon tour, surtout pour participer a des projets comme {{field2}} et contribuer a leur realisation.

Je cherche un environnement ou je peux m'investir dans des projets utiles, monter en competences et comprendre en profondeur comment une equipe professionnelle fait evoluer un produit.

Je suis actuellement en formation chez EPITECH Lyon, et je developpe mes competences en {{field3}}. J'ai deja travaille sur des projets academiques et personnels {{field4}}. Ces projets m'ont permis de developper une approche autonome, methodique et orientee resultats.

Je peux ainsi apporter a votre equipe mes competences techniques tout en m'adaptant rapidement a vos outils et methodes.

Je peux apporter un profil polyvalent, capable de m'adapter a differents outils et technologies.

De plus, les projets que j'ai realises {{field5}} me donnent deja une experience concrete proche de vos activites, ce qui facilitera notre collaboration et l'atteinte de vos objectifs. En combinant ma polyvalence a la diversite de vos projets, nous pourrons atteindre des resultats concrets rapidement et efficacement.

Je serais ravi d'echanger avec vous pour vous montrer plus en detail mes competences et ma motivation.

Je vous remercie pour votre temps et votre consideration.

Timothee ITHIER$$, TRUE), 




(1, 'Modele 2', $$Madame, Monsieur,

Votre annonce pour le poste de {{field7}} a immediatement retenu mon attention. Je suis convaincu que {{field6}} et son role dans {{field1}} representent le cadre ideal pour mon debut de carriere.

Mon parcours, notamment ma formation a EPITECH Lyon, m'a permis d'acquerir de solides bases {{field3}}. J'ai egalement eu l'opportunite de travailler sur des projets concrets, y compris {{field4}}, demontrant mon engagement pour des projets orientes {{field5}}.

Je suis particulierement enthousiaste a l'idee de contribuer a des missions telles que {{field2}}. Je suis jeune diplome mais je suis pret a investir toute mon energie pour apprendre rapidement et m'integrer efficacement a votre equipe.

Ma motivation, ma soif d'apprendre et ma capacite d'adaptation sont mes principaux atouts. Je serais ravi de vous exposer mes competences plus en detail lors d'un entretien.

Dans l'attente de votre retour, veuillez agreer, Madame, Monsieur, l'expression de mes salutations distinguees.

Timothee ITHIER$$, FALSE),




(1, 'Modele 3', $$Bonjour Madame, Monsieur,

Votre entreprise retient mon attention grace {{field1}}.

Les projets que vous developpez, notamment {{field2}}, correspondent parfaitement a ce que je recherche.

Je developpe actuellement mes competences en {{field3}} et j'ai deja realise des projets personnels en {{field4}}.

Ces experiences m'ont permis de travailler de maniere autonome, efficace, et d'adopter une approche structuree.

Je pourrai ainsi m'impliquer rapidement dans vos projets et contribuer avec mes competences techniques.

Les similitudes entre vos activites et les projets que j'ai realises en {{field5}} constituent une base solide pour une collaboration productive.

Je serais ravi d'en discuter davantage avec vous.

Timothee ITHIER$$, FALSE),




(1, 'Modele 4', $$Bonjour Madame, Monsieur,

Je me permets de vous adresser ma candidature, car j'ai ete particulierement attire par votre travail dans {{field1}} et vos projets autour de {{field2}}.
Votre facon de transformer des besoins concrets en solutions fonctionnelles me parle beaucoup, car c'est ce type de contribution que j'aimerais apporter dans mon alternance.

Je progresse actuellement sur {{field3}} utilisant {{field4}}.
J'ai deja realise quelques projets qui m'ont permis de tester mes competences et de trouver des solutions concretes.
Cette polyvalence me permettra d'apporter rapidement ces acquis a vos equipes.

En mettant mes acquis au service de votre equipe sur {{field5}} pour le poste de {{field7}} chez {{field6}}, nous pourrons explorer de nouvelles idees, ameliorer vos solutions et progresser dans un cadre dynamique.

Merci pour votre attention, je reste a votre disposition pour un echange ou un entretien.

Timothee ITHIER$$, FALSE);







INSERT INTO skills (user_id, skill_name, category_name) VALUES
-- Data & IA
(1, 'Python', 'Data & IA'),
(1, 'SQL', 'Data & IA'),
(1, 'PostgreSQL', 'Data & IA'),
(1, 'Pandas', 'Data & IA'),
(1, 'Data Analytics', 'Data & IA'),
(1, 'Excel', 'Data & IA'),
(1, 'Microsoft Access', 'Data & IA'),
(1, 'LLM', 'Data & IA'),
(1, 'Machine Learning', 'Data & IA'),
(1, 'Algorithmes', 'Data & IA'),
(1, 'Analyse de données', 'Data & IA'),
(1, 'Modélisation de données', 'Data & IA'),
(1, 'KPI', 'Data & IA'),
(1, 'Prompt Engineering', 'Data & IA'),
(1, 'Architecture Chatbot IA', 'Data & IA'),

-- Développement
(1, 'Java', 'Développement'),
(1, 'JavaScript', 'Développement'),
(1, 'TypeScript', 'Développement'),
(1, 'Node.JS', 'Développement'),
(1, 'React', 'Développement'),
(1, 'HTML', 'Développement'),
(1, 'CSS', 'Développement'),
(1, 'Rust', 'Développement'),
(1, 'API REST', 'Développement'),
(1, 'Web Components', 'Développement'),

-- Outils
(1, 'Git', 'Outils'),
(1, 'GitHub', 'Outils'),
(1, 'GitLab', 'Outils'),
(1, 'Docker', 'Outils'),
(1, 'VSCode', 'Outils'),
(1, 'Linux', 'Outils'),
(1, 'CI/CD', 'Outils'),
(1, 'Test Unitaires', 'Outils'),
(1, 'Agile/Scrum', 'Outils'),
(1, 'Rédaction technique', 'Outils'),
(1, 'Pipelines DevOps', 'Outils'),
(1, 'Teams', 'Outils'),
(1, 'Office365', 'Outils'),
(1, 'Tableau', 'Outils'),
(1, 'Gouvernance Data', 'Outils'),

-- Autres Compétences
(1, 'UI/UX', 'Autres Compétences'),
(1, 'Infographie 3D', 'Autres Compétences'),
(1, 'Scripting', 'Autres Compétences'),
(1, 'Anglais B2', 'Autres Compétences'),

-- En apprentissage
(1, 'Power BI', 'En apprentissage'),
(1, 'SharePoint', 'En apprentissage'),
(1, 'Spring Boot', 'En apprentissage'),
(1, 'Angular', 'En apprentissage'),
(1, '.NET', 'En apprentissage'),
(1, 'PHP', 'En apprentissage'),
(1, 'Jenkins', 'En apprentissage'),
(1, 'Azure', 'En apprentissage'),
(1, 'AWS', 'En apprentissage'),
(1, 'RAG', 'En apprentissage'),
(1, 'LangChain', 'En apprentissage'),
(1, 'Bases vectorielles', 'En apprentissage'),
(1, 'FastAPI', 'En apprentissage'),
(1, 'C#', 'En apprentissage'),
(1, 'Django', 'En apprentissage'),
(1, 'Flask', 'En apprentissage'),
(1, 'Kubernetes', 'En apprentissage'),
(1, 'MongoDB', 'En apprentissage'),
(1, 'Kafka', 'En apprentissage'),
(1, 'Deep Learning', 'En apprentissage'),
(1, 'OpenAPI/Swagger', 'En apprentissage'),
(1, 'Power Apps', 'En apprentissage'),
(1, 'Power Automate', 'En apprentissage'),
(1, 'PeopleSoft', 'En apprentissage');