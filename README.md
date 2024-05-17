# Piscine MERN - 4 Jours

## Description

Ce projet consiste à créer une application web en utilisant la stack MERN (MongoDB, Express.js, React.js, Node.js). Chaque journée est dédiée à l'apprentissage et à la mise en pratique de différentes composantes de cette stack.

## Jour 1 : Introduction à Node.js

- **Objectifs** : Installer Node.js, créer un serveur avec Express.js, et apprendre les bases du routage.
- **Exercice 1** : Installer Node.js et configurer un serveur sur le port 4242 en mode développement avec `localhost` comme hôte.
- **Exercice 2** : Créer une route GET `/` qui affiche "Great! It works.".
- **Exercice 3** : Modifier la route pour qu'elle renvoie du HTML valide W3C depuis un fichier.
- **Exercice 4** : Créer une route GET `/name/<name>` qui affiche "Hello <name>" ou "Hello unknown".
- **Exercice 5** : Modifier la route pour afficher "Hello <name>, you are <age> yo" en utilisant les paramètres d'URL.
- **Exercice 6** : Créer un module `myMERN_module.js` avec des fonctions pour créer, lire, mettre à jour et supprimer des fichiers.
- **Exercice 7** : Créer des routes pour appeler les fonctions du module.

## Jour 2 : Introduction à MongoDB

- **Objectifs** : Installer MongoDB et connecter Node.js à une base de données.
- **Exercice 1** : Installer MongoDB et le lancer sur le port 27042.
- **Exercice 2** : Créer une base de données `mern-pool` explicitement.
- **Exercice 3** : Créer une collection `students` avec des champs validés.
- **Exercice 4** : Connecter Node.js à MongoDB et afficher "Connection successful" ou "Connection failed".
- **Exercice 5** : Créer un formulaire pour ajouter un étudiant à la collection `students`.
- **Exercice 6** : Afficher une liste des étudiants avec `validated` en "in progress" triés par `lastname`.
- **Exercice 7** : Créer une application pour gérer la collection `students` avec des fonctionnalités CRUD et des filtres.
- **Exercice 8** : Sauvegarder et restaurer la collection `students`.

## Jour 3 : Introduction à Express.js

- **Objectifs** : Créer une API avec Express.js et MongoDB.
- **Exercice 1** : Installer Express et MongoDB.
- **Exercice 2** : Créer une API pour un espace membre avec des routes pour l'inscription (`POST /register`) et la connexion (`POST /login`).
- **Exercice 3** : Créer une boutique en ligne avec des pages pour afficher et détailler des produits.
- **Exercice 4** : Ajouter des produits via une page admin.
- **Exercice 5** : Ajouter des catégories de produits et les lier aux produits.
- **Bonus** : Compléter les CRUD pour les collections, ajouter des photos aux produits et implémenter des fonctionnalités de recherche et de filtre.

## Jour 4 : Introduction à React.js

- **Objectifs** : Créer une application full stack avec React.js pour le front-end et Express.js pour l'API.
- **Exercice 1** : Installer les paquets nécessaires avec NPM et mettre à jour `package.json`.
- **Exercice 2** : Créer un espace membre avec des fonctionnalités d'inscription et de connexion.
- **Exercice 3** : Créer un blog pour chaque membre avec des fonctionnalités CRUD pour les billets.
- **Exercice 4** : Permettre aux membres de voir et de commenter les billets des autres.
- **Exercice 5** : Lister tous les blogs existants sur la page d'accueil.

