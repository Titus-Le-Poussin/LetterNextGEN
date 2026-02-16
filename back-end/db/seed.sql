INSERT INTO users (username, email)
VALUES ('Timothée', 'timotheeithier@gmail.com');



INSERT INTO prompt (name, content, is_default)
VALUES ('default', 'A partir de l'offre d'emploi fournie, extrais les informations suivantes au format JSON :

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
- Reponds UNIQUEMENT avec le JSON, sans texte supplementaire', 'TRUE');

INSERT INTO letter_templates (name, content, is_default)
VALUES ('default', '', 'TRUE');