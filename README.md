# GRAN-abaque-m-1 — Apprendre à utiliser l’abaque des longueurs

- `GRAN` : domaine Grandeurs.
- `abaque` : outil travaillé.
- `m` : longueurs, avec le mètre comme unité de référence.
- `1` : premier parcours d’apprentissage.

Ce dépôt est la source de l’application. Les évolutions du moteur et de son accueil se font ici. Mathas-Connect intègre une copie d’une version Git précise et conserve ses adaptateurs de connexion séparément.

Le nom GitHub demandé est `Mr-Tat/GRAN-abaque-m-1`. Au 2 novembre 2026, l’API de renommage est refusée dans le cloud ; le dépôt distant est encore accessible sous `Mr-Tat/abaque-m-1`. Le dossier local porte déjà le nouveau nom. Renommer ce dépôt existant, sans créer un deuxième dépôt ni perdre son historique.

## Utilisation

Application statique : `python3 -m http.server 8001 --bind 127.0.0.1` depuis ce dossier. Aucun service ni compte n’est nécessaire au jeu autonome.

Le mode normal conserve le stockage historique de l’application. `?demo=1` ouvre les trois profils visuels du Laboratoire dans un stockage distinct, sans écriture Connect. Les aperçus connectés sont fictifs et restent en mémoire. `environment.js` est le seul adaptateur changé dans la copie de démonstration Connect ; ses données ne sont jamais importées dans un compte Connect.

Les trois activités, les deux modes record et les six coupes suivent les décisions du 2 novembre 2026. Les deux modes record demandent 80 % dans chacun des formats classiques. Les trois coupes Mort subite correspondent à 3/5/8 pages justes dans une même partie ; 3 vies n’en donne aucune. L’or classique reste indépendant. Aucun trophée ne dépend d’un seuil de points.

## Vérification

Node 22.22.0 et Playwright 1.57.0, puis `node --test tests/*.test.mjs tests/*.browser.mjs`. Définir `CHROME_BIN` pour utiliser Chromium système, ou installer Chromium via Playwright. Les tests bloquent tout réseau extérieur et utilisent le vrai moteur au clavier.

Les assets restent locaux. Les clés de stockage ne suivent pas le nom du dossier : cela conserve les résultats existants sur une même origine. Un changement d’adresse GitHub Pages doit être répercuté dans les liens ; il ne déplace pas le stockage vers une autre origine.
