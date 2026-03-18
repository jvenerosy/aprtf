# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commandes principales

```bash
npm run dev          # Serveur de développement (port 5173)
npm run build        # Build de production
npm run preview      # Aperçu du build (port 4173)
npm run check        # Vérification TypeScript + Svelte
npm run lint         # ESLint + Prettier
npm run format       # Formatage automatique
npm run test         # Tests Playwright E2E
npm run test:unit    # Tests Vitest
npm run getdb        # Synchronise la BDD depuis le serveur distant
npm run bo           # Lance Directus local via Docker (port 8055)
```

## Architecture

Site SvelteKit pour l'APRTF (association de thérapie familiale), déployé sur Vercel avec un CMS Directus headless.

### Stack technique
- **SvelteKit 2** avec adapter Vercel
- **Directus SDK** pour l'accès au CMS (`src/lib/directus.js`)
- **Bulma** + SCSS pour le styling (`src/styles/`)
- **Zod + validator.js** pour la validation des formulaires

### Structure des routes
Les routes suivent le pattern SvelteKit standard :
- `+page.server.ts` : chargement des données via l'API Directus
- `+page.svelte` : rendu du composant

Routes dynamiques avec `[slug]` : articles, emploi, formations/modules, modules-courts, legals

### Pattern de données
Les données viennent de l'API Directus via `PUBLIC_HOST_API` :
```typescript
const response = await fetch(`${PUBLIC_HOST_API}/items/{collection}`);
const data = await response.json();
// data.data contient les résultats
```

### Formulaires multi-étapes
Les formulaires d'inscription utilisent un pattern avec :
- Actions SvelteKit (`step1`, `step2`, etc.)
- Cookies pour persister les données entre étapes
- Validation Zod à chaque étape
- Authentification Directus pour l'envoi final (via `DIRECTUS_EMAIL`/`DIRECTUS_PASSWORD`)

Exemple : `src/routes/modules-courts/[slug]/inscription/+page.server.ts`

### Collections Directus principales
- `informations` - Articles accueil
- `formations` - Programmes de formation
- `colloques` - Événements/conférences
- `emploi` - Offres d'emploi
- `inscriptions_colloques` - Inscriptions aux modules courts
- `page_seo` - Métadonnées SEO
- `legals` - Pages légales

## Variables d'environnement

```bash
PUBLIC_HOST_API=http://localhost:8055   # URL API Directus (public)
DIRECTUS_EMAIL=...                       # Auth pour écriture API (privé)
DIRECTUS_PASSWORD=...                    # Auth pour écriture API (privé)
```

## Backoffice local

Le dossier `bo/` contient la config Docker pour Directus local :
1. `npm run getdb` pour récupérer la BDD et uploads du serveur
2. `npm run bo` pour lancer le conteneur Directus
