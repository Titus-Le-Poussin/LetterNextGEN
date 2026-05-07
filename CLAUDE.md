# CLAUDE.md — LetterNextGEN / Portfolio de Timothée Ithier

> **Auteur :** Timothée Ithier
> **Projet :** Portfolio personnel dynamique + Générateur de lettres/CV avec IA
> **Dernière MAJ :** 4 Mai 2026

---

# PARTIE 1 — CONSIGNES POUR CLAUDE

## Règle n°1 — Rôles

- **Claude code** : tout le frontend React, les routes/modèles/contrôleurs Express pour le **portfolio**
- **Timothée code** : la logique IA (Gemini/Claude), les pipelines data, la config DevOps
- **Claude peut aussi** : mettre à jour ce CLAUDE.md, expliquer, débloquer Timothée sur sa partie

## Règle n°2 — Ce fichier

- Lire ce fichier entièrement en début de session
- Mettre à jour après chaque session significative (cocher les étapes, noter les décisions)

## Règle n°3 — Fichier `.env`

- NE JAMAIS afficher ou logger le contenu du `.env`
- NE PAS écraser sauf si Timothée le demande explicitement

## Règle n°4 — Sécurité portfolio

- **Lecture publique** : `/api/portfolio/*` (GET) est sans auth — tout le monde peut voir
- **Écriture admin** : POST/PUT/DELETE sur `/api/portfolio/*` nécessite un JWT valide
- Un seul compte admin : timotheeithier@gmail.com (user_id = 1 en base)
- Les compétences (skills) sont gérées via `/api/skills` (existant) + affichées publiquement via `/api/portfolio/skills`

## Règle n°5 — Corrections backend

Quand Timothée demande une correction sur sa partie :
- `Ligne X : TITRE DE L'ERREUR`
- Explication simple
- Solution expliquée sans écrire le code à sa place

---

# PARTIE 2 — DESCRIPTION DU PROJET

## Ce que fait l'application

**LetterNextGEN** est une application web en deux parties :

1. **Portfolio public** (`/portfolio`) — Vitrine professionnelle de Timothée. Projets, compétences, expériences. Entièrement éditable depuis une interface admin intégrée (bouton flottant si connecté). Les visiteurs voient, seul Timothée modifie.

2. **Outils job** (`/`) — Générateur de lettres de motivation et CV avec IA (Gemini + Claude fallback). Réservé aux utilisateurs connectés.

## Stack technique

| Composant | Technologie |
|-----------|------------|
| Frontend | React 19 + Vite + Tailwind CSS v4 |
| Backend | Node.js + Express |
| Base de données | PostgreSQL |
| Auth | JWT (jsonwebtoken + bcrypt) |
| IA | Google Gemini (+ Claude Anthropic fallback) |
| Conteneurisation | Docker + docker-compose |
| Déploiement | Frontend → Vercel · Backend → Railway · DB → Neon ou Railway |

---

# PARTIE 3 — ARCHITECTURE

## Structure des fichiers clés

```
LetterNextGEN/
├── front-end/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Portfolio.jsx       ← portfolio dynamique + mode admin
│   │   │   ├── JobTools.jsx        ← générateur lettres/CV
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── portfolio.service.js ← CRUD portfolio (nouveau)
│   │   └── context/AuthContext.jsx  ← token JWT
│   └── picture/                     ← assets (images, vidéos, PDF)
│       ⚠ Déplacer dans public/picture/ avant déploiement Vercel
│
├── back-end/
│   ├── controllers/
│   │   └── portfolio.controller.js  ← nouveau
│   ├── models/
│   │   └── portfolio.model.js       ← nouveau
│   ├── routes/
│   │   └── portfolio.routes.js      ← nouveau
│   └── db/
│       ├── init.sql    ← inclut les tables portfolio
│       └── seed.sql    ← inclut les données portfolio
│
└── docker-compose.yaml
```

## Variables d'environnement

### Backend (`back-end/.env`)
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=...
DB_NAME=letternextgen
JWT_SECRET=...
GEMINI_API_KEY=...
ANTHROPIC_API_KEY=...
PORT=8080
CORS_ORIGIN=http://localhost:5173
```
> Pour la prod, `CORS_ORIGIN` = URL Vercel (ex: `https://mon-portfolio.vercel.app`)
> Plusieurs origines supportées : `CORS_ORIGIN=https://a.vercel.app,https://b.vercel.app`

### Frontend (`front-end/.env.local`)
```
VITE_API_URL=http://localhost:8080
```

### Frontend prod (`front-end/.env.production`)
```
VITE_API_URL=https://ton-backend.railway.app
```

---

# PARTIE 4 — API ROUTES PORTFOLIO

### Publiques (sans auth)
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/portfolio/projects` | Projets visibles |
| GET | `/api/portfolio/experiences` | Expériences |
| GET | `/api/portfolio/about` | Infos "à propos" |
| GET | `/api/portfolio/skills` | Compétences groupées (user_id=1) |

### Admin (JWT Bearer requis)
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/portfolio/projects/all` | Tous projets (incl. masqués) |
| POST | `/api/portfolio/projects` | Créer un projet |
| PUT | `/api/portfolio/projects/:id` | Modifier un projet |
| DELETE | `/api/portfolio/projects/:id` | Supprimer un projet |
| POST | `/api/portfolio/experiences` | Créer une expérience |
| PUT | `/api/portfolio/experiences/:id` | Modifier |
| DELETE | `/api/portfolio/experiences/:id` | Supprimer |
| PUT | `/api/portfolio/about` | Modifier les infos |

### Compétences (admin via routes existantes)
- `GET /api/skills/me` — liste des compétences (auth requise)
- `POST /api/skills` — ajouter
- `DELETE /api/skills/:id` — supprimer

---

# PARTIE 5 — SCHÉMA BDD (tables portfolio)

```sql
portfolio_projects
──────────────────
id           SERIAL PRIMARY KEY
title        VARCHAR(255) NOT NULL
short_desc   TEXT
description  TEXT
tech_stack   JSONB DEFAULT '[]'
media_url    TEXT
media_type   VARCHAR(10)    -- 'image' | 'video'
github_url   TEXT
demo_url     TEXT
order_index  INTEGER DEFAULT 0
visible      BOOLEAN DEFAULT TRUE
created_at   TIMESTAMP DEFAULT NOW()
updated_at   TIMESTAMP DEFAULT NOW()

portfolio_experiences
─────────────────────
id           SERIAL PRIMARY KEY
company      VARCHAR(255) NOT NULL
role         VARCHAR(255) NOT NULL
period       VARCHAR(100)
description  TEXT
is_current   BOOLEAN DEFAULT FALSE
order_index  INTEGER DEFAULT 0
created_at   TIMESTAMP DEFAULT NOW()

portfolio_about
───────────────
id           SERIAL PRIMARY KEY
bio          TEXT
title        VARCHAR(255)
phone        VARCHAR(50)
email        VARCHAR(255)
age          INTEGER
languages    VARCHAR(255)
updated_at   TIMESTAMP DEFAULT NOW()
```

---

# PARTIE 6 — DÉPLOIEMENT VERCEL (guide pas à pas)

## Étape 1 — Préparer les assets

Les images/vidéos dans `front-end/picture/` ne sont pas copiées lors du build Vite.
Avant de déployer, déplace le dossier :
```bash
mv front-end/picture front-end/public/picture
```
Puis mets à jour les chemins dans le seed et dans le code : `/picture/...` reste le même (Vite sert `public/` à la racine).

## Étape 2 — Déployer le backend sur Railway

1. Aller sur **railway.app** → New Project → Deploy from GitHub
2. Sélectionner le repo, Root Directory : `back-end`
3. Ajouter un service **PostgreSQL** dans le même projet Railway
4. Copier les variables d'env depuis le `.env` (adapter DB_HOST etc. avec les valeurs Railway)
5. Lancer `init.sql` puis `seed.sql` via la console Railway ou psql
6. Copier l'URL publique de ton backend Railway (ex: `https://letternextgen-backend.up.railway.app`)

## Étape 3 — Déployer le frontend sur Vercel

1. Aller sur **vercel.com** → Add New Project → Importer le repo GitHub
2. Configurer :
   - **Framework** : Vite
   - **Root Directory** : `front-end`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
3. Ajouter les variables d'environnement :
   - `VITE_API_URL` = URL Railway de l'étape 2
4. Cliquer **Deploy**
5. Vercel redéploie automatiquement à chaque push sur `main`

## Étape 4 — Configurer CORS en production

Dans les variables d'env Railway, ajouter :
```
CORS_ORIGIN=https://ton-projet.vercel.app
```

---

# PARTIE 7 — ÉTAT D'AVANCEMENT

### Phase 1 — Base du projet : TERMINÉE
- [x] Auth JWT (register, login, me)
- [x] Générateur de lettres IA (Gemini + Claude fallback)
- [x] Générateur de CV IA
- [x] Gestionnaire de compétences
- [x] Portfolio statique initial

### Phase 2 — Portfolio dynamique : TERMINÉE
- [x] Tables BDD : `portfolio_projects`, `portfolio_experiences`, `portfolio_about`
- [x] Seed : données Timothée pré-remplies
- [x] `back-end/models/portfolio.model.js`
- [x] `back-end/controllers/portfolio.controller.js`
- [x] `back-end/routes/portfolio.routes.js`
- [x] `back-end/server.js` — route portfolio branchée + CORS multi-origines
- [x] `front-end/src/services/portfolio.service.js`
- [x] `Portfolio.jsx` — redesign dark pro + données dynamiques + mode admin

### Phase 3 — Déploiement : À FAIRE
- [ ] Déplacer `front-end/picture/` → `front-end/public/picture/`
- [ ] Backend sur Railway
- [ ] DB sur Railway (ou Neon)
- [ ] Lancer init.sql + seed.sql en production
- [ ] Frontend sur Vercel
- [ ] Configurer `VITE_API_URL` et `CORS_ORIGIN` en prod
- [ ] Test end-to-end en production
