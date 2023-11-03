# Y
[![](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Y. The new way to chat. Join us now and start chatting with millions other users on our [website](https://yoyo53.github.io/Y).

## Démonstration

Afin de démontrer la viabilité de cette solution, une version de démonstration a été déployée depuis ce dépôt GitHub.  
La base de données PostgreSQL est déployée sur [neon.tech](https://neon.tech), le back-end sur [Fly.io](https://fly.io) et le front-end sur [GitHub Pages](https://pages.github.com/).  
URL de l'API (back-end) : <https://y-back.fly.dev/>  
URL du site web (front-end) : <https://yoyo53.github.io/Y>

## Installation

Cette application web ayant été réalisée en mode n-tier, cela signifie qu’elle est constituée de trois parties distinctes pouvant ainsi être déployée de manière indépendante (possiblement sur des serveurs différents) :
- La bases de données utilisée par l’application (PostgreSQL)
- Le back-end (API Express.js pour interagir avec la base de données)
- Le front-end (site web statique qui interagit avec l’API)

### Création de la base de données PostgreSQL

La première étape du déploiement consiste donc à créer et configurer cette base de données utilisées par l’application.
\
1. Créez une nouvelle instance PostgreSQL sur l’hébergeur de votre choix (ou votre propre serveur).
2. Dans cette instance, créez une nouvelle base de données ainsi qu’un nouvel utilisateur ayant tous les droits sur cette base de données.
3. Conservez le nom de domaine de l’instance PostgreSQL, le nom de la base de donnée ainsi que le nom et le mot de passe de l’utilisateur pour les étapes suivantes.

### Déploiement du back-end

Assurez-vous d'avoir Node.js et Git installés sur votre machine avant de commencer.

\
**Étape 1 : Cloner le dépôt GitHub**
1. Ouvrez une ligne de commande ou un terminal.
2. Naviguez vers le répertoire où vous souhaitez cloner le projet.
3. Exécutez la commande suivante pour cloner le dépôt depuis GitHub :
```bash
git clone https://github.com/yoyo53/Y.git
```

\
**Étape 2 : Configuration du back-end**
1. Accédez au répertoire du back-end :
```bash
cd Y/back
```
2. Exécutez la commande suivante pour installer les dépendances :
```bash
npm install
```

\
**Étape 3 : Configuration des variables d'environnement**
1. Dans le répertoire du back-end, recherchez un fichier `.env.example`.
2. Dupliquez ce fichier et renommez la copie en `.env`.
3. Ouvrez le fichier `.env` dans un éditeur de texte.
4. Configurez les variables d'environnement avec les informations de connexion pour la base de données PostgreSQL créée précédemment.

\
**Étape 4 : Exécution du back-end**
1. Exécutez la commande suivante pour démarrer le serveur :
```bash
npm run start
```
Le serveur back-end est désormais en cours d'exécution.

### Déploiement du front-end

Assurez-vous d'avoir Node.js et Git installés sur votre machine avant de commencer. Si le déploiement est fait sur la même machine que le back-end, commencez directement à l’étape 2.

\
**Étape 1 : Cloner le dépôt GitHub**
1. Ouvrez une ligne de commande ou un terminal.
2. Naviguez vers le répertoire où vous souhaitez cloner le projet.
3. Exécutez la commande suivante pour cloner le dépôt depuis GitHub :
```bash
git clone https://github.com/yoyo53/Y.git
```

\
**Étape 2 : Configuration du front-end**
1. Accédez au répertoire du front-end :
```bash
cd Y/front
```
2. Exécutez la commande suivante pour installer les dépendances :
```bash
npm install
```

\
**Étape 3 : Configuration de des paramètres du front-end**
1. Dans le répertoire du front-end, recherchez un fichier `next.config.js`.
2. Ouvrez le fichier `next.config.js` dans un éditeur de texte.
3. Remplacez la valeur de la variable **ROOTAPI** par l’url de votre back-end.
4. Remplacez la valeur des variables **basePath** et **BASE_PATH** par l'url de base sur laquelle votre application sera déployée.

\
**Étape 4 : Compilation du front-end**
1. Exécutez la commande suivante pour compiler le front-end en un site web statique :
```bash
npm run build
```
Le résultat de cette compilation sera disponible dans le dossier out. Le contenu de ce dossier peut ensuite être déployé comme un site internet statique sur le fournisseur d’hébergement web de votre choix.
