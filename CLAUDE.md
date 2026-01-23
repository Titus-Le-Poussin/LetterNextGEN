# Consignes pour Claude

## Projet
- **Auteur:** Timothee Ithier
- **Projet:** T-ENT-500-LYN (Epitech Lyon)
- **Description:** Portfolio personnel + Generateur de lettres de motivation IA

---

## Regles obligatoires

### 1. Dossier `_original/` - NE PAS MODIFIER
Ce dossier contient le travail original de Timothee en HTML/CSS brut.
- Ne jamais modifier, supprimer ou ecraser ces fichiers
- Demander l'autorisation AVANT toute modification
- Utiliser comme reference visuelle pour la migration Tailwind

### 2. Commentaires dans les nouveaux fichiers
Chaque nouveau fichier cree doit contenir un commentaire explicatif:
- Pourquoi ce fichier existe
- Son role dans le projet
- Exemple simple d'utilisation (si pertinent)

Le commentaire doit etre concis, pas de blabla.

### 3. Fichier `consigne.txt`
- Lire ce fichier au debut de chaque session
- Contient l'etat d'avancement du projet
- METTRE A JOUR apres chaque session de travail (ce qui a ete fait, prochaines etapes)

### 4. Fichier `README.txt`
- NE PAS ECRASER sauf si explicitement demande par Timothee
- Ce fichier sert aux autres utilisateurs pour comprendre le projet

---

## Structure du projet

```
T-ENT-500-LYN_TIMOTHEE-ITHIER/
|
|-- _original/                    <- NE PAS TOUCHER
|   |-- portfolio/
|   |   |-- portfolio.html
|   |   |-- portfolio.css
|   |-- lettre/
|       |-- lettre-generateur.html
|       |-- lettre-generateur.css
|
|-- portfolio-v1.html             <- Le fichier est BON, la migration tailwind a réussis  
|-- lettre-generateur-v1.html     <- Le fichier est BON, la migration tailwind a réussis
|
|-- css/
|   |-- input.css                 <- Source Tailwind
|   |-- output.css                <- Compile (auto-genere)
|
|-- js/                           
|-- assets/                       <- Images/videos/docs
|-- tailwind.config.js
|-- package.json
|-- .env
|-- consigne.txt
|-- .gitignore
|-- CLAUDE.md
|-- package-lock.json
```

---

## Workflow de migration

1. LIRE `_original/` pour comprendre le design (couleurs, geometrie, texte)
2. CREER de nouveaux fichiers avec Tailwind (`portfolio-v1.html`, `lettre-generateur-v1.html`)
3. REPRODUIRE exactement le meme visuel avec les classes Tailwind
4. `_original/` reste intact = reference pour comparaison

---

## Etat d'avancement (Mise a jour: 23 Janvier 2026)

### Phase 1 - Configuration initiale: TERMINEE
- [x] Structure `_original/` creee
- [x] Node.js verifie (v22.20.0)
- [x] npm initialise (package.json)
- [x] Tailwind CSS installe (v4.1.18)
- [x] Fichier CLAUDE.md cree
- [x] Comptes Supabase et Google AI Studio crees
- [x] Fichier .env configure (Supabase + Gemini)

### Phase 2 - Migration Tailwind: TERMINEE
- [x] `portfolio-v1.html` cree avec Tailwind
- [x] `lettre-generateur-v1.html` cree avec Tailwind
- [x] Design verifie et ameliore
- [x] Responsive teste

### Phase 3 - Base de donnees Supabase: A FAIRE
- [ ] Table "prompts" a creer
- [ ] Table "letter_templates" a creer
- [ ] Table "generated_letters" a creer
- [ ] Politiques RLS a configurer

### Phases 4-6: A FAIRE
- Authentification, APIs IA, Deploiement

---

## Commandes utiles

```bash
# Compiler Tailwind CSS
npm run build:css

# Mode watch (recompile automatiquement)
npm run watch:css
```

---

## Fichiers cles

| Fichier | Role |
|---------|------|
| `portfolio-v1.html` | Portfolio Tailwind (TERMINE) |
| `lettre-generateur-v1.html` | Generateur de lettres Tailwind (TERMINE) |
| `css/input.css` | Source Tailwind avec couleurs custom |
| `css/output.css` | CSS compile (auto-genere) |
| `.env` | Cles API (Supabase, Gemini) - NE PAS PARTAGER |
| `consigne.txt` | Guide complet du projet |
