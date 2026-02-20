# Tests Unitaires

## Configuration

Tests unitaires configurés avec **Jest** et **ts-jest** pour couvrir les services métier critiques.

### Structure

```
src/
  modules/
    auth/
      __tests__/
        auth.service.test.ts
    persons/
      __tests__/
        persons.service.test.ts
    accounting/
      __tests__/
        accounting.service.test.ts
    common/
      __tests__/
        business.service.test.ts
```

## Commandes

### Exécuter tous les tests
```bash
npm test
```

### Exécuter en mode watch (re-run à chaque modification)
```bash
npm run test:watch
```

### Générer rapport de couverture
```bash
npm run test:coverage
```

## Couverture actuelle

Les tests couvrent les services critiques :

- **AuthService** (auth.service.test.ts)
  - ✓ Hachage et vérification de mots de passe
  - ✓ Génération de tokens
  - ✓ Enregistrement d'utilisateurs
  - ✓ Connexion avec validation
  - ✓ Récupération de profil

- **PersonService** (persons.service.test.ts)
  - ✓ CRUD complet (Get, Create, Update)
  - ✓ Filtres par rôle (borrower, buyer, donor, etc.)
  - ✓ Récupération des emprunts, achats, ventes
  - ✓ Soft delete avec audit trail
  - ✓ Validation emails uniques

- **AccountingService** (accounting.service.test.ts)
  - ✓ Calcul balance de vérification
  - ✓ Calcul balances des comptes
  - ✓ Génération bilan
  - ✓ Génération compte de résultat
  - ✓ Grand livre par compte
  - ✓ Journal de caisse

- **ValidationService** (business.service.test.ts)
  - ✓ Validation nombre d'emprunts (max 3)
  - ✓ Validation stock suffisant
  - ✓ Validation rôles utilisateur
  - ✓ Calcul valuations d'inventaire
  - ✓ Calculs d'écritures comptables

## Stratégie de test

### Mocks Prisma

Les services utilisent Prisma pour accéder à la base de données. Les tests mockent Prisma pour :
- Éviter dépendances à une vraie base de données
- Tester rapidement (+ de 100 tests/sec vs lenteur DB)
- Isoler la logique métier des I/O

### Cas de succès et erreurs

Chaque test couvre :
- **Happy path** : utilisation normale
- **Edge cases** : limites, zéro, null
- **Error handling** : validation, exceptions

### Exemple test

```typescript
describe("AuthService", () => {
  it("should login user successfully", async () => {
    // Setup
    const password = "test123";
    const hash = hashPassword(password);
    
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "user-123",
      email: "test@example.com",
      passwordHash: hash,
      isActive: true,
    });

    // Execution
    const result = await AuthService.login({
      email: "test@example.com",
      password,
    });

    // Assertion
    expect(result.user.email).toBe("test@example.com");
    expect(result.refreshToken).toBeDefined();
  });
});
```

## Couverture minimale

Configuration dans `jest.config.js` :
- Branches: 60%
- Functions: 60%
- Lines: 60%
- Statements: 60%

Pour voir la couverture actuelle :
```bash
npm run test:coverage
```

## À tester manuellement (API)

Les points suivants doivent être testés via l'API HTTP :

1. **Routes** : Les routes Express (auth.routes.ts, etc.)
2. **Middleware** : Authentification, erreurs
3. **Intégration** : Transactions multi-étapes (emprunt + mouvements stock)
4. **Concurrence** : Modifications simultanées stock
5. **Performance** : Requêtes lourdes (rapports sur gros volumes)

Voir [API_ENDPOINTS.md](../API_ENDPOINTS.md) pour les tests manuels.

## À ajouter

Pour plus de couverture :

1. **TransactionsService tests** - Mouvements de stock, emprunts, ventes
2. **ReportsService tests** - Calculs rapports
3. **Routes tests** - Intégration Express
4. **End-to-end tests** - Scénarios complets (emprunt → retour → write-off)
5. **Performance tests** - Benchmark sur gros volumes

## Intégration CI/CD

Pour ajouter à GitHub Actions / GitLab CI :

```yaml
test:
  script:
    - npm install
    - npm run test:coverage
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
```

## Dépannage

### Module not found
```
Module "@prisma/client" not found
```
Solution: `npm install`

### Tests timeouts
```
Jest did not exit one second after the test run has completed
```
Solution: Ajouter `afterAll` pour fermer les mocks

### Coverage trop basse
```
Jest: Coverage thresholds not met
```
Solution: Ajouter plus de tests ou réduire seuils dans jest.config.js

---

Généré: February 19, 2026
