# Architecture Backend (Version clarifiee)

## Objectif
Ce backend suit la logique du document metier en priorisant:
- la coherence metier (bibliotheque, stock, dons, ventes, emprunts),
- la coherence comptable (partie double, journaux, etats derives),
- la robustesse technique (Prisma valide, structure modulaire, soft delete).

## Structure recommandee
- `src/config`: configuration (`env`, `prisma`)
- `src/common`: utilitaires communs HTTP/erreurs
- `src/modules`: modules metiers par domaine
- `src/routes`: composition des routes API
- `prisma/schema.prisma`: modele de donnees unifie

## Ce qui doit etre respecte
- Une operation de stock genere un `StockMovement` avec signe explicite via `movementType`.
- Un emprunt peut contenir jusqu'a 3 livres (regle a appliquer dans le service API).
- Les ventes et achats supportent plusieurs lignes d'articles.
- Les ecritures comptables respectent la partie double:
  - total debit = total credit pour chaque `JournalEntry`.
- Les etats (balance, grand livre, bilan, compte de resultat) sont derives des journaux.
- Les suppressions metier passent par soft delete + `DeletedItem` (retention 30 jours).

## Ce qui ne doit pas etre fait
- Ne pas ecrire directement le bilan/compte de resultat comme donnees "manuelles".
- Ne pas modifier le stock sans trace dans `StockMovement`.
- Ne pas stocker un mot de passe en clair (utiliser uniquement `passwordHash`).
- Ne pas accepter une ecriture comptable desequilibree.
- Ne pas supprimer definitivement un enregistrement sans journalisation dans la corbeille metier.

## Points comptables
- `JournalEntry` + `JournalLine` = source de verite comptable.
- `JournalType` distingue journal general, caisse, achats, ventes, banque.
- `SourceType` relie une ecriture a son operation metier (vente, achat, don, etc.).
- Le N-1 doit renvoyer 0 si aucune donnee precedente n'existe (regle de calcul etat financier).
