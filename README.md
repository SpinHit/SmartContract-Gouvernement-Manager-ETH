# Smart Contract GouvernementsManager
Ce contrat est un exemple de gestion des gouvernements et des profils associés. Il permet d'ajouter des gouvernements et des profils, ainsi que de récupérer les profils associés à un gouvernement.

## Prérequis
- Connaissances en Solidity et Ethereum
- Connaissances en JavaScript pour les tests
- Un environnement de développement Ethereum (par exemple, Ganache)

## Démarrage
1. Clonez ce repository
2. Installez les dépendances avec la commande `npm install`
3. Exécutez les tests avec la commande `npm test`

## Fonctionnalités
- Ajout d'un gouvernement avec une addresse Ethereum
- Ajout d'un profil pour un gouvernement donné
- Récupération des profils associés à un gouvernement

## Notes
- Si vous essayez d'ajouter un gouvernement avec une addresse déjà utilisée, une erreur sera levée
- Si vous essayez d'ajouter un profil à un gouvernement inconnu, une erreur sera levée

## Tests
Les tests sont écrits avec Mocha et Chai. Ils couvrent les cas d'utilisation suivants:
- Ajout d'un gouvernement
- Ajout d'un profil pour un gouvernement existant
- Récupération des profils associés à un gouvernement

## Contribuer
Si vous avez des idées d'amélioration ou de nouvelles fonctionnalités à ajouter, n'hésitez pas à soumettre une pull request.

