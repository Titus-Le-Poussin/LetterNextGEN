# CLAUDE.md — Projet Portfolio + Generateur de Lettres IA

> **Auteur :** Timothee Ithier
> **Projet :** T-ENT-500-LYN (Epitech Lyon)
> **Derniere MAJ :** 17 Fevrier 2026

---

# ========================================
# PARTIE 1 — CONSIGNES POUR CLAUDE
# ========================================

> Tout ce qui est dans cette partie concerne le comportement de Claude.
> Claude DOIT lire cette section en debut de chaque session.

## Regle n1 — C'est Timothee qui code

- Claude **NE CODE PAS** les fichiers du projet
- Claude peut : creer des dossiers, mettre a jour ce fichier, guider, expliquer, debloquer
- Claude ne peut PAS : ecrire du code dans les fichiers du projet a la place de Timothee
- Si Timothee demande de l'aide, Claude explique comment faire, il ne le fait pas

## Regle n2 — Dossier `_original/`

- **NE JAMAIS modifier, supprimer ou ecraser** ces fichiers
- Demander l'autorisation AVANT toute modification
- Sert de reference visuelle pour le design original

## Regle n3 — Ce fichier (`CLAUDE.md`)

- Lire ce fichier au debut de chaque session
- **METTRE A JOUR** apres chaque session (ce qui a ete fait, prochaines etapes)
- C'est le seul fichier de consignes du projet (pas de consigne.txt)

## Regle n4 — Fichier `README.txt`

- NE PAS ECRASER sauf si Timothee le demande explicitement

## Regle n5 — Commentaires dans les nouveaux fichiers

Si Claude cree un fichier (structure, config), il doit contenir un commentaire :
- Pourquoi ce fichier existe
- Son role dans le projet
- Concis, pas de blabla


## Regle n6 — CLAUDE.md

Le fichier CLAUDE.md contient des consignes pour claude (celle-ci), mais contient également des consigne pour Timothée!!
- Claude NE DOIT PAS executer ces etapes dans les consignes de Timothée. C'est un plan de reference
- Si timothée demande à modifier les consigne de claude, alors claude pourra le faire mais il doit EXPLICITEMENT demander l'autorisation. 
- Claude peut modifier les ETAPES du plan de travail (après avoir demander EXPLLICITEMENT l'autorisation) avec l'autorisation MANUEL de timothée. si par exemple, à la fin d'une session, Timothée à avancer sur le projet, il faut que Claude mette à jour les étape! et ça, il doit le faire à chaque fois qu'une consigne est REMPLIS! (Etat d'avancement du projet) 
- Même si claude a interdiction de modifier le plan de travail de Timothée, Claude doit IMPERATIVEMENT être informé de ce qu'il y a dans la Partie 2! ne pas modifier ne veut pas dire "ne pas lire". Il faut lire ENTIEREMENT CLAUDE.md et prendre connaissance de l'intégralité du projet. 



## Regle n7 — Les correction
 La correction de claude doit être claire, pas de vocabulaire trop poussé, explication simple. Pas de commentaire inutile pour ne pas polluer l'espace de travail(Exemple pas de "Ligne 1 — Bien."
).  Voici comment claude doit corrigé quand timothée demande une correction:

- numéro de la ligne/ ou ligne n°. a n°. = Titre de l'erreur
- Explication de l'erreur / commentaire de Claude
- Solution mais sans code! 
- EXEMPLE: 
- "Ligne 3 : COPY package.json
                                                           
  Deux problemes. D'abord, COPY a besoin de deux arguments : la source et la destination. La c'est COPY [source] [destination]. Ensuite, cette ligne doit etre APRES le WORKDIR, sinon Docker 
  ne sait pas ou copier le fichier."



---

# ========================================
# PARTIE 2 — PLAN DE TRAVAIL POUR TIMOTHEE
# ========================================

> Tout ce qui est dans cette partie, c'est **Timothee qui le fait**.
> Claude NE DOIT PAS executer ces etapes. C'est un plan de reference.
> Claude peut côcher les étapes réalisé dans Etat d'avancement.

---

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| BDD | PostgreSQL local + `pg` (SQL brut) |
| Auth | JWT (jsonwebtoken + bcrypt) |
| APIs IA | Gemini + Claude (appels cote serveur) |
| PDF | jsPDF (cote client) |
| CSS | Tailwind CSS v4 |
| Tests API | Postman |

---

## Etat d'avancement

### Phase 1 — Configuration initiale : TERMINEE
- [x] Structure `_original/` creee
- [x] Node.js verifie (v22.20.0)
- [x] npm initialise (package.json)
- [x] Tailwind CSS installe (v4.1.18)
- [x] Fichier CLAUDE.md cree
- [x] Fichier .env configure

### Phase 2 — Migration Tailwind : TERMINEE
- [x] `portfolio-v1.html` cree avec Tailwind
- [x] `lettre-generateur-v1.html` cree avec Tailwind
- [x] Design verifie et ameliore
- [x] Responsive teste

### Phase 3 — Backend Express + Docker : EN COURS
> **C'est Timothee qui code tout ca.**

#### Etape 3.1 — Docker (faire en premier, Docker gere tout)
- [x] Structure de dossiers `back-end/` creee (9 Fevrier 2026)
- [x] Creer `docker-compose.yml` a la racine (3 services : db, server, client) (16 Fevrier 2026)
- [x] Creer `back-end/Dockerfile` (c'est Docker qui fait le `npm install`) (16 Fevrier 2026)
- [x] Creer `front-end/Dockerfile` (16 Fevrier 2026)
- [x] Creer `back-end/package.json` (liste des dependances, pas besoin de `npm install` en local) (16 Fevrier 2026)
- [x] Coder `server.js` minimal (Express qui repond "hello" sur `/`) (16 Fevrier 2026)
- [x] Coder `db/init.sql` — CREATE TABLE + table skills ajoutee (16 Fevrier 2026)
- [x] Coder `db/seed.sql` — INSERT donnees par defaut (1 user, 1 prompt, 4 templates lettres, 68 skills) (17 Fevrier 2026)
- [x] `docker compose up` — verifie, tout demarre (PostgreSQL + backend + frontend) (17 Fevrier 2026)

#### Etape 3.2 — Backend complet
- [x] Coder `config/db.js` — connexion PostgreSQL (pool pg) (17 Fevrier 2026)
- [x] Coder les models (requetes SQL brutes) (17 Fevrier 2026) :
  - [x] `models/user.model.js`
  - [x] `models/prompt.model.js`
  - [x] `models/letter_template.model.js`
  - [x] `models/letter_generated.model.js`
  - [x] `models/resume_template.model.js`
  - [x] `models/resume_generated.model.js`
  - [x] `models/skills.model.js`
- [ ] Coder les controllers (logique CRUD) :
  - [ ] `controllers/auth.controller.js`
  - [ ] `controllers/prompts.controller.js`
  - [ ] `controllers/templates.controller.js`
  - [ ] `controllers/letters.controller.js`
  - [ ] `controllers/ai.controller.js`
- [ ] Coder les routes :
  - [ ] `routes/auth.routes.js`
  - [ ] `routes/prompts.routes.js`
  - [ ] `routes/templates.routes.js`
  - [ ] `routes/letters.routes.js`
  - [ ] `routes/ai.routes.js`
- [ ] Coder le middleware :
  - [ ] `middleware/auth.middleware.js` — verification JWT
  - [ ] `middleware/error.middleware.js` — gestion d'erreurs
- [ ] Completer `server.js` — point d'entree Express complet
- [ ] Tester toutes les routes avec Postman

### Phase 4 — Frontend React : EN COURS
> **C'est Timothee qui code tout ca.**

- [x] Structure de dossiers `front-end/` creee (9 Fevrier 2026)
- [x] Initialiser avec `npm create vite@latest` (React + Vite) (17 Fevrier 2026)
- [x] Integrer Tailwind CSS dans React (plugin @tailwindcss/vite) (17 Fevrier 2026)
- [ ] Migrer le portfolio vers React (composants)
- [x] Migrer le generateur de lettres vers React (composants : OfferSection, EditorSection, PreviewSection, Header avec toggle) (17 Fevrier 2026)
- [ ] Creer pages Login / Register
- [ ] Creer les services API (connexion frontend → backend)
- [ ] `AuthContext.jsx` pour gerer la session JWT

### Phase 5 — Integration IA : A FAIRE
> **C'est Timothee qui code tout ca.**

- [ ] Route `/api/ai/analyze` cote serveur
- [ ] Appel API Gemini depuis le backend
- [ ] Appel API Claude depuis le backend
- [ ] Parser la reponse JSON → retourner les 7 champs
- [ ] Connecter au frontend (bouton "Remplir Automatiquement")

### Phase 6 — Tests + Deploiement : A FAIRE
- [ ] Tests locaux complets
- [ ] Deploiement

---

## Structure du projet

```
T-ENT-500-LYN_timothee-ithier/
│
├── front-end/                      # FRONTEND React + Vite
│   ├── src/
│   │   ├── components/             # Header.jsx, LetterPreview.jsx, FieldInput.jsx
│   │   ├── pages/                  # Portfolio.jsx, LetterGenerator.jsx, Login.jsx, Register.jsx
│   │   ├── services/               # api.js, auth.service.js, prompts/templates/letters/ai.service.js
│   │   ├── context/                # AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/picture/             # Images/videos (pour React)
│   ├── picture/                    # Images/videos (actuel)
│   ├── css/                        # Tailwind CSS (input.css, output.css)
│   ├── HTMLRef/                    # HTML de reference (portfolio-v1, lettre-generateur-v1)
│   ├── Dockerfile                  # Image Docker du frontend
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── back-end/                       # BACKEND Node.js + Express
│   ├── config/                     # db.js (connexion PostgreSQL)
│   ├── db/                         # init.sql, seed.sql
│   ├── models/                     # user, prompt, template, letter (.model.js)
│   ├── controllers/                # auth, prompts, templates, letters, ai (.controller.js)
│   ├── routes/                     # auth, prompts, templates, letters, ai (.routes.js)
│   ├── middleware/                 # auth.middleware.js, error.middleware.js
│   ├── server.js
│   ├── Dockerfile                  # Image Docker du backend
│   └── package.json
│
├── docker-compose.yml              # Orchestre les 3 services (db, server, client)
├── _original/                      # NE PAS TOUCHER (reference visuelle)
├── .env                            # Variables d'environnement (NE PAS PARTAGER)
├── CLAUDE.md                       # Ce fichier
└── .gitignore
```

---

## Schema de la base de donnees

> **C'est Timothee qui cree ces tables** dans `db/init.sql`.

```
users
─────
id          SERIAL PRIMARY KEY
username    VARCHAR(100) NOT NULL
email       VARCHAR(255) UNIQUE NOT NULL
password    VARCHAR(255) NOT NULL
created_at  TIMESTAMP DEFAULT NOW()

prompts
───────
id          SERIAL PRIMARY KEY
user_id     → users(id) ON DELETE CASCADE
name        VARCHAR(255) NOT NULL
content     TEXT NOT NULL
is_default  BOOLEAN DEFAULT FALSE
created_at  TIMESTAMP DEFAULT NOW()
updated_at  TIMESTAMP DEFAULT NOW()

letter_templates
────────────────
id          SERIAL PRIMARY KEY
user_id     → users(id) ON DELETE CASCADE
name        VARCHAR(255) NOT NULL
content     TEXT NOT NULL
is_default  BOOLEAN DEFAULT FALSE
created_at  TIMESTAMP DEFAULT NOW()
updated_at  TIMESTAMP DEFAULT NOW()

generated_letters
─────────────────
id              SERIAL PRIMARY KEY
user_id         → users(id) ON DELETE CASCADE
company_name    VARCHAR(255)
job_title       VARCHAR(255)
job_offer       TEXT
letter_content  TEXT
template_id     → letter_templates(id) ON DELETE SET NULL
created_at      TIMESTAMP DEFAULT NOW()

resume_templates
────────────────
id          SERIAL PRIMARY KEY
user_id     → users(id) ON DELETE CASCADE
name        VARCHAR(255) NOT NULL
content     TEXT NOT NULL
is_default  BOOLEAN DEFAULT FALSE
created_at  TIMESTAMP DEFAULT NOW()
updated_at  TIMESTAMP DEFAULT NOW()

generated_resume
────────────────
id              SERIAL PRIMARY KEY
user_id         → users(id) ON DELETE CASCADE
company_name    VARCHAR(255)
job_title       VARCHAR(255)
job_offer       TEXT
resume_content  TEXT
template_id     → resume_templates(id) ON DELETE SET NULL
created_at      TIMESTAMP DEFAULT NOW()

skills
──────
id              SERIAL PRIMARY KEY
user_id         → users(id) ON DELETE CASCADE
skill_name      VARCHAR(255)
category_name   VARCHAR(255)
created_at      TIMESTAMP DEFAULT NOW()
```

**Relations :**
```
users (1) ──── (N) prompts
users (1) ──── (N) letter_templates
users (1) ──── (N) generated_letters
users (1) ──── (N) resume_templates
users (1) ──── (N) generated_resume
users (1) ──── (N) skills
letter_templates (1) ──── (N) generated_letters
resume_templates (1) ──── (N) generated_resume
```

---

## API Routes

> **C'est Timothee qui code ces routes** dans `routes/` et `controllers/`.

### Auth (`/api/auth`)
| Methode | Route | Action |
|---------|-------|--------|
| POST | `/api/auth/register` | Creer un compte |
| POST | `/api/auth/login` | Se connecter (retourne JWT) |
| GET | `/api/auth/me` | Recuperer l'utilisateur connecte |

### Prompts (`/api/prompts`) — Auth requise
| Methode | Route | Action |
|---------|-------|--------|
| POST | `/api/prompts` | Creer un prompt |
| GET | `/api/prompts` | Lister mes prompts |
| GET | `/api/prompts/:id` | Voir un prompt |
| PUT | `/api/prompts/:id` | Modifier un prompt |
| DELETE | `/api/prompts/:id` | Supprimer un prompt |

### Templates (`/api/templates`) — Auth requise
| Methode | Route | Action |
|---------|-------|--------|
| POST | `/api/templates` | Creer un template |
| GET | `/api/templates` | Lister mes templates |
| GET | `/api/templates/:id` | Voir un template |
| PUT | `/api/templates/:id` | Modifier un template |
| DELETE | `/api/templates/:id` | Supprimer un template |

### Letters (`/api/letters`) — Auth requise
| Methode | Route | Action |
|---------|-------|--------|
| POST | `/api/letters` | Sauvegarder une lettre |
| GET | `/api/letters` | Lister mes lettres |
| GET | `/api/letters/:id` | Voir une lettre |
| DELETE | `/api/letters/:id` | Supprimer une lettre |

### IA (`/api/ai`) — Auth requise
| Methode | Route | Action |
|---------|-------|--------|
| POST | `/api/ai/analyze` | Analyser une offre d'emploi |

---

## Structure Postman

> **C'est Timothee qui cree cette collection** dans Postman pour tester ses routes.

**Variables d'environnement Postman :**
- `{{base_url}}` = `http://localhost:8080`
- `{{token}}` = *(se remplit auto apres login)*

**Collection :**

```
Portfolio API/
│
├── Auth/
│   ├── POST Register        {{base_url}}/api/auth/register
│   ├── POST Login           {{base_url}}/api/auth/login
│   └── GET  Me              {{base_url}}/api/auth/me
│
├── Prompts/
│   ├── POST Create          {{base_url}}/api/prompts
│   ├── GET  List            {{base_url}}/api/prompts
│   ├── GET  By ID           {{base_url}}/api/prompts/:id
│   ├── PUT  Update          {{base_url}}/api/prompts/:id
│   └── DEL  Remove          {{base_url}}/api/prompts/:id
│
├── Templates/
│   ├── POST Create          {{base_url}}/api/templates
│   ├── GET  List            {{base_url}}/api/templates
│   ├── GET  By ID           {{base_url}}/api/templates/:id
│   ├── PUT  Update          {{base_url}}/api/templates/:id
│   └── DEL  Remove          {{base_url}}/api/templates/:id
│
├── Letters/
│   ├── POST Save            {{base_url}}/api/letters
│   ├── GET  List            {{base_url}}/api/letters
│   ├── GET  By ID           {{base_url}}/api/letters/:id
│   └── DEL  Remove          {{base_url}}/api/letters/:id
│
└── AI/
    └── POST Analyze         {{base_url}}/api/ai/analyze
```

**Astuce — Auto-set du token apres login :**
Dans Postman, onglet "Tests" de la requete POST Login, ajouter :
```js
const response = pm.response.json();
pm.environment.set("token", response.token);
```

**Routes protegees :**
Onglet "Authorization" → Type : Bearer Token → Token : `{{token}}`

---

## Ordre d'execution pour Timothee

> Suivre ces etapes dans l'ordre. Demander a Claude si tu es bloque.

1. Mettre a jour `.env` (ajouter `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`)
2. Creer `docker-compose.yml` a la racine (3 services : db, server, client)
3. Creer `back-end/Dockerfile` (Docker fait le `npm install`)
4. Creer `back-end/package.json` (liste des dependances, pas de `npm install` local)
5. Coder `server.js` minimal (Express "hello" sur `/`)
6. Coder `db/init.sql` — CREATE TABLE (PostgreSQL l'execute auto au premier `docker compose up`)
7. `docker compose up` — tout doit demarrer
8. Coder `config/db.js` — connexion PostgreSQL (pool pg)
9. Coder `db/seed.sql` — INSERT donnees par defaut
10. Coder les models (user → prompt → template → letter)
11. Coder les controllers (auth → prompts → templates → letters → ai)
12. Coder les routes
13. Coder les middleware (auth, error)
14. Completer `server.js` — point d'entree Express complet
15. Tester avec Postman
16. `cd front-end/ && npm create vite@latest . -- --template react`
17. Migrer le frontend
18. Connecter frontend ↔ backend
19. Integrer les APIs IA

---

## Commandes utiles

```bash
# Tout lancer avec Docker (depuis la racine)
docker compose up              # lance db + server + client
docker compose up --build      # rebuild les images si modification Dockerfile
docker compose down            # arrete tout
docker compose down -v         # arrete tout + supprime les volumes (reset BDD)

# Backend seul (depuis back-end/, sans Docker)
npm run dev

# Frontend seul (depuis front-end/, sans Docker)
npm run dev

# Base de donnees (sans Docker)
psql -U postgres -f back-end/db/init.sql
psql -U postgres -d portfolio_db -f back-end/db/seed.sql
```
