# APRTF - Association parisienne de recherche et de travail avec les familles

Site web officiel de l'APRTF, une association fondée en 1981 spécialisée dans la formation en thérapie familiale systémique et l'accompagnement thérapeutique des familles et couples.

## Technologies utilisées

### Frontend
- **SvelteKit 2.0** - Framework full-stack moderne
- **TypeScript** - Développement type-safe
- **Vite** - Build tool et serveur de développement rapide
- **Bulma** - Framework CSS pour l'interface utilisateur
- **SCSS/Sass** - Préprocesseur CSS avec système de design personnalisé

### Backend & Gestion de contenu
- **Directus CMS** - CMS headless pour la gestion de contenu
- **SQLite** - Base de données
- **Docker** - Containerisation du CMS
- **API REST** - Architecture d'API pour l'intégration des données

### Validation & Formulaires
- **Zod** - Validation de schémas TypeScript
- **Validator.js** - Utilitaires de validation supplémentaires
- **Système multi-étapes** - Formulaires d'inscription complexes avec gestion de session

### Tests & Qualité
- **Playwright** - Tests end-to-end
- **Vitest** - Tests unitaires
- **ESLint + Prettier** - Linting et formatage du code

### Déploiement & Analytics
- **Vercel** - Plateforme de déploiement
- **Vercel Analytics & Speed Insights** - Monitoring des performances
- **Plausible Analytics** - Analytics respectueux de la vie privée

## Fonctionnalités principales

### 🎓 Gestion des formations
- Cycles de formation (Cycle 1, Cycle 2, TMF)
- Modules détaillés avec routage dynamique
- Système de tarification et d'inscription

### 📅 Gestion d'événements
- Modules courts et ateliers
- Colloques et conférences
- Formulaires d'inscription multi-étapes avec validation

### 💼 Services professionnels
- Tableau d'emploi avec offres dynamiques
- Formulaires de contact professionnels
- Système de prise de rendez-vous thérapeutiques

### 🎨 Expérience utilisateur
- Design responsive mobile-first
- Fonctionnalités d'accessibilité (ARIA, HTML sémantique)
- Validation progressive des formulaires

## Structure du projet

```
src/
├── lib/
│   ├── components/          # Composants Svelte réutilisables
│   │   ├── forms/          # Composants de formulaires
│   │   └── blocs/          # Blocs de contenu (sliders, cartes)
│   ├── stores/             # Stores Svelte pour la gestion d'état
│   └── utils/              # Fonctions utilitaires
├── routes/                 # Routage basé sur les fichiers
│   ├── formations/         # Section formations
│   ├── modules-courts/     # Modules courts/ateliers
│   ├── emploi/            # Offres d'emploi
│   ├── contact/           # Formulaires de contact
│   └── therapie/          # Services thérapeutiques
├── styles/                # Styles SCSS globaux et variables
└── static/                # Assets statiques
```

## Développement

### Prérequis
- Node.js (version recommandée : 18+)
- Docker (pour Directus CMS)

### Installation
```bash
# Cloner le repository
git clone [url-du-repo]
cd aprtf-svelte

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Commandes disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Aperçu du build de production
npm run test         # Tests Playwright
npm run test:unit    # Tests unitaires Vitest
npm run check        # Vérification TypeScript et Svelte
npm run lint         # ESLint + Prettier
npm run getdb        # Synchronisation de la base de données
npm run bo           # Démarrage du CMS Directus local
```

### Configuration de l'environnement

Créer un fichier `.env` avec :
```bash
PUBLIC_HOST_API=http://localhost:8055  # URL de l'API Directus
```

## Architecture

### API Endpoints
- `/items/formations` - Programmes de formation
- `/items/colloques` - Événements et conférences
- `/items/emploi` - Offres d'emploi
- `/items/contact` - Soumissions de formulaires de contact
- `/items/inscriptions_colloques` - Inscriptions aux événements

### Déploiement
- **Frontend** : Vercel (aprtfformations.fr)
- **CMS** : Serveur dédié (bo.aprtfformations.fr)
- **Base de données** : SQLite avec système de synchronisation

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## Tests

```bash
# Tests end-to-end
npm run test

# Tests unitaires
npm run test:unit

# Mode interactif
npm run test -- --ui
```

## Accessibilité

Le site respecte les standards d'accessibilité :
- HTML sémantique
- Labels ARIA appropriés
- Navigation au clavier
- Compatibilité avec les lecteurs d'écran

## SEO & Performance

- Meta tags dynamiques basés sur le contenu CMS
- Intégration Open Graph et Twitter Cards
- Analytics respectueux de la vie privée avec Plausible
- Optimisation des performances avec Vercel Speed Insights

---

**APRTF** - Accompagner les familles depuis 1981