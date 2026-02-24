# 🔧 Guide de Résolution - CORS & Routes

## 📡 Problème: CORS bloqué

### Symptômes
- Erreur dans la console du navigateur: `Access to fetch at 'http://localhost:4000/api/...' from origin 'http://localhost:XXXX' has been blocked by CORS policy`
- Requêtes qui fonctionnent avec Postman/curl mais pas depuis le navigateur

### Solution 1: Ajouter votre origine dans .env

Si votre frontend tourne sur un port différent (ex: 3000, 5174):

```env
# Ajoutez dans .env
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:5174
```

### Solution 2: Autoriser toutes les origines (DÉVELOPPEMENT SEULEMENT)

```env
# ⚠️ NE PAS UTILISER EN PRODUCTION
CORS_ALLOWED_ORIGINS=*
```

### Solution 3: Autoriser origine null (pour fichiers HTML locaux)

```env
CORS_ALLOW_NULL_ORIGIN=true
```

### Vérification
Après modification du .env:
1. Redémarrer le serveur backend
2. Tester: `curl -H "Origin: http://localhost:3000" http://localhost:4000/health`
3. Vérifier la réponse contient: `Access-Control-Allow-Origin: http://localhost:3000`

---

## 🛣️ Problème: Routes 404

### Symptômes
- Erreur: `Cannot GET /api/...` ou `404 Not Found`
- Route qui devrait exister mais retourne 404

### Vérifications

#### 1. Le serveur est-il démarré ?
```bash
curl http://localhost:4000/health
# Doit retourner: {"status":"ok"}
```

#### 2. Utilisez-vous le bon préfixe ?
Toutes les routes doivent commencer par `/api/`:
- ✅ `http://localhost:4000/api/accounting/entries`
- ❌ `http://localhost:4000/accounting/entries`

#### 3. Vérifiez la méthode HTTP
```bash
# Correct
POST /api/accounting/entries

# Incorrect (retourne 404 ou 405)
GET /api/accounting/entries  # Si la route n'existe qu'en POST
```

#### 4. Routes disponibles

**Init:**
- `POST /api/init/setup` - Initialiser la base de données
- `GET /api/init/health` - Health check
- `GET /health` - Health check (sans /api)

**Auth:**
- `GET /api/auth/register-status`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`

**Matériaux (Bibliothèque):**
- `GET /api/materials`
- `GET /api/materials/:id`
- `POST /api/materials`
- `PUT /api/materials/:id`
- `DELETE /api/materials/:id`

**Personnes:**
- `GET /api/persons`
- `GET /api/persons/:id`
- `POST /api/persons`
- `PUT /api/persons/:id`
- `DELETE /api/persons/:id`

**Transactions:**
- `POST /api/transactions/purchase`
- `POST /api/transactions/sale`
- `POST /api/transactions/loan`
- `POST /api/transactions/donation`
- `GET /api/transactions/:id`

**Comptabilité:**
- `GET /api/accounting/entries` - Liste des écritures
- `GET /api/accounting/entries/:id` - Détail d'une écriture
- `POST /api/accounting/entries` - Créer une écriture
- `PUT /api/accounting/entries/:id` - Modifier une écriture
- `DELETE /api/accounting/entries/:id` - Supprimer une écriture
- `PUT /api/accounting/entries/:id/validate` - Valider une écriture
- `GET /api/accounting/trial-balance?fiscalYearId=<id>` - Balance de vérification
- `GET /api/accounting/balance-sheet?fiscalYearId=<id>` - Bilan
- `GET /api/accounting/income-statement?fiscalYearId=<id>` - Compte de résultat
- `GET /api/accounting/cash-journal?fiscalYearId=<id>` - Journal de caisse
- `GET /api/accounting/accounts/resolve?accountNumber=<num>` - Résoudre un numéro de compte
- `GET /api/accounting/export/excel` - Export Excel

**Rapports:**
- `GET /api/reports/summary?fiscalYearId=<id>` - Résumé

**Corbeille:**
- `GET /api/deleted-items` - Liste des éléments supprimés
- `POST /api/deleted-items/:id/restore` - Restaurer un élément

#### 5. Aliases disponibles
Ces routes ont des aliases (fonctionnent aussi):
- `/api/bibliotheque` → `/api/materials`
- `/api/materiel` → `/api/materials`
- `/api/comptabilite` → `/api/accounting`
- `/api/rapport` → `/api/reports`
- `/api/corbeille` → `/api/deleted-items`

---

## 🔍 Tests de diagnostic

### Test 1: Serveur actif
```bash
curl http://localhost:4000/health
# ✅ Retourne: {"status":"ok"}
```

### Test 2: Route API basique
```bash
curl http://localhost:4000/api/init/health
# ✅ Retourne: {"status":"ok","timestamp":"..."}
```

### Test 3: CORS depuis le frontend
Ouvrez la console de votre navigateur:
```javascript
fetch('http://localhost:4000/api/init/health')
  .then(res => res.json())
  .then(data => console.log('✅ CORS OK:', data))
  .catch(err => console.error('❌ CORS bloqué:', err))
```

### Test 4: Route avec paramètres
```bash
# Vérifier qu'un compte existe
curl "http://localhost:4000/api/accounting/accounts/resolve?accountNumber=57"
# ✅ Retourne: {"id":"...","accountNumber":"57","name":"CAISSE","type":"ASSET"}
```

---

## 🚀 Déploiement Render

### Origines à autoriser en production
Ajoutez dans les variables d'environnement Render:
```
CORS_ALLOWED_ORIGINS=https://votre-frontend.onrender.com,https://votre-domaine.com
```

### Routes publiques accessibles
- `https://bibliotheque-backend-1.onrender.com/health`
- `https://bibliotheque-backend-1.onrender.com/api/init/health`
- `https://bibliotheque-backend-1.onrender.com/api/auth/register-status`

---

## 📝 Checklist de dépannage

- [ ] Le serveur backend est démarré (`npm run dev`)
- [ ] Le port 4000 est accessible (pas d'autre processus)
- [ ] L'URL contient `/api/` avant le nom de la route
- [ ] La méthode HTTP est correcte (GET, POST, PUT, DELETE)
- [ ] L'origine du frontend est dans CORS_ALLOWED_ORIGINS
- [ ] Le serveur a été redémarré après modification du .env
- [ ] Les logs du serveur n'affichent pas d'erreur

---

## 🆘 Commandes utiles

```bash
# Exécuter le diagnostic
npx tsx scripts/diagnostic.ts

# Voir les comptes disponibles
npx tsx scripts/check-accounts.ts

# Tester une route spécifique
curl -v http://localhost:4000/api/accounting/entries

# Voir les logs du serveur en temps réel
npm run dev

# Vérifier les processus Node en cours
Get-Process -Name node
```
