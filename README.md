# LetterNextGEN

Portfolio personnel et générateur de lettres de motivation avec IA.

Timothée Ithier — EPITECH Lyon, Pre-MSc Intelligence Artificielle & Data Science.

---

## Ce que fait l'application

Le projet se divise en deux parties distinctes.

**Portfolio public** (`/portfolio`) — Vitrine professionnelle accessible à tous. Projets, expériences, compétences, section contact. Le contenu est entièrement gérable depuis une interface d'administration intégrée, accessible uniquement après connexion.

**Générateur de lettres** — Outil d'aide à la candidature qui analyse une offre d'emploi via IA (Google Gemini avec Claude Anthropic en fallback) et génère les éléments clés pour adapter une lettre de motivation. Inclut la gestion de templates, l'export PDF et un gestionnaire de compétences pour le CV.

Pour les visiteurs extérieurs, une version invité est disponible à `/tools` après création d'un compte. Elle propose le générateur de lettres avec un set de compétences pré-rempli, sans le générateur de CV (fonctionnalité réservée).

---

## Stack

| Composant | Technologie |
|-----------|-------------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express |
| Base de données | PostgreSQL |
| Authentification | JWT (jsonwebtoken, bcrypt) |
| IA | Google Gemini, Claude Anthropic (fallback) |
| Déploiement | Frontend sur Vercel, Backend sur Railway, DB sur Railway |

---

## Lancer en local

Prérequis : Node.js, Docker.

```bash
# Démarrer la base de données
docker compose up -d

# Backend
cd back-end
npm install
npm run dev

# Frontend (dans un autre terminal)
cd front-end
npm install
npm run dev
```

Le frontend tourne sur `http://localhost:5173`, le backend sur `http://localhost:8080`.

Pour réinitialiser la base de données depuis zéro :

```bash
docker compose down -v && docker compose up --build
```

---

## Variables d'environnement

**Backend** (`back-end/.env`) :

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

**Frontend** (`front-end/.env.local`) :

```
VITE_API_URL=http://localhost:8080
```

---

## Structure

```
LetterNextGEN/
├── front-end/
│   ├── src/
│   │   ├── pages/          Portfolio, JobTools, GuestTools, Login, Register
│   │   ├── components/     Composants lettre, CV, aperçu, header
│   │   └── services/       Appels API
│   └── public/picture/     Assets statiques (images, vidéos, PDF)
│
├── back-end/
│   ├── controllers/        Logique métier
│   ├── models/             Requêtes SQL
│   ├── routes/             Endpoints Express
│   └── db/
│       ├── init.sql        Schéma de la base
│       └── seed.sql        Données initiales
│
└── docker-compose.yaml
```

---

## Accès

Deux niveaux d'accès existent.

**Timothée Ithier** (compte admin) : accès complet, générateur de CV inclus, mode édition du portfolio.

**Visiteurs** : portfolio en lecture seule. Peuvent créer un compte pour accéder au générateur de lettres avec compétences pré-remplies.

---

## Déploiement

Backend sur Railway, base de données sur Railway (PostgreSQL), frontend sur Vercel.

Avant le déploiement Vercel, les assets sont dans `front-end/public/picture/` et `vercel.json` configure le routing SPA. La variable `VITE_API_URL` dans Vercel pointe vers l'URL Railway du backend.
