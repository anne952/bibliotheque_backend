# Instructions de Déploiement - Render.com

## Prérequis
1. Compte Render.com
2. Repository Git (GitHub/GitLab/Bitbucket)
3. Base de données PostgreSQL (Render PostgreSQL ou externe)

## Configuration Render

### 1. Créer une base de données PostgreSQL
- Dashboard Render → **New** → **PostgreSQL**
- Nom: `bibliotheque-vgr-db`
- Plan: Free ou Starter selon besoin
- Copier la **Internal Database URL** (commence par `postgresql://`)

### 2. Créer le Web Service
- Dashboard Render → **New** → **Web Service**
- Connecter votre repository Git
- Configuration:
  ```
  Name: bibliotheque-vgr-backend
  Region: Frankfurt (ou plus proche de vos utilisateurs)
  Branch: main
  Root Directory: (vide si backend à la racine, sinon `back`)
  Runtime: Node
  Build Command: npm install && npm run build
  Start Command: npm run deploy
  ```

### 3. Variables d'environnement
Ajouter dans **Environment Variables**:
```
DATABASE_URL = [coller l'Internal Database URL de votre PostgreSQL Render]
NODE_ENV = production
```

**Note**: `PORT` est automatiquement défini par Render, ne pas l'ajouter manuellement.

### 4. Déploiement
- Cliquer sur **Create Web Service**
- Render va:
  1. Cloner le repo
  2. Exécuter `npm install` (installe deps + génère client Prisma via `postinstall`)
  3. Exécuter `npm run build` (génère Prisma client + compile TypeScript)
  4. Exécuter `npm run deploy` (migrations + démarre serveur)

### 5. Vérification
Une fois déployé, tester:
```bash
curl https://votre-app.onrender.com/api/init/health
```

Résultat attendu:
```json
{"status":"ok","timestamp":"..."}
```

## Scripts NPM utilisés par Render

| Script | Commande | Exécuté quand |
|--------|----------|---------------|
| `postinstall` | `prisma generate` | Après `npm install` |
| `build` | `prisma generate && tsc` | Build command Render |
| `deploy` | `prisma migrate deploy && npm start` | Start command Render |
| `start` | `node dist/server.js` | Après migrations |

## Mise à jour du CODE_URL
Après déploiement, mettre à jour votre frontend avec la nouvelle URL:
```
VITE_API_BASE_URL=https://votre-app.onrender.com/api
```

## Migrations futures
Les migrations sont appliquées automatiquement au démarrage via `npm run deploy`.
Pour créer une nouvelle migration:
```bash
npm run prisma:migrate -- --name nom_migration
git add prisma/migrations
git commit -m "Migration: nom_migration"
git push
```

Render détectera le push et redéploiera automatiquement.

## Notes importantes
- ⚠️ Plan **Free** Render: service s'endort après 15min d'inactivité (cold start ~30s)
- ✅ Prisma génère le client dans `src/generated/prisma` (inclus dans le build)
- ✅ Les migrations sont versionnées dans `prisma/migrations/`
- ⚠️ Pour logs détaillés: Dashboard Render → votre service → **Logs**

## Troubleshooting

### Erreur "DATABASE_URL est obligatoire"
→ Vérifier que `DATABASE_URL` est bien définie dans Environment Variables

### Erreur "column does not exist" 
→ Migrations non appliquées. Vérifier les logs du script `deploy`.

### Erreur "Cannot find module 'src/generated/prisma'"
→ `prisma generate` n'a pas tourné. Vérifier que `postinstall` s'exécute.

### Service inaccessible
→ Vérifier que le `PORT` n'est pas hardcodé (doit venir de `process.env.PORT`)
