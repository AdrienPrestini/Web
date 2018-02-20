# Projet Web
Projet de Serveur/Client Web, mise en application des concepts vus en classe de programmation serveur et client.
### Étudiants Côté Serveur
* Kevin Duglue - <kevin.duglue@gmail.com>
* Gaspard Lacroix - <gaspard.lacroix@hotmail.fr> 

### Étudiants Côté Client
* Thomas Monzein-Stocky - **Partie Client/Management** - <thomas.monzein-stocky@etu.unice.fr>
* Adrien Prestini - **Partie Client/Client** - <adrienprestini@hotmail.fr>

## Description du projet
Ce projet est découpé en deux parties : un côté serveur qui s'occupe de l'administration des données, fait le lien entre la couche persistente et le client. De plus, il effectue des calculs sur le trajet à emprunter entre deux points d'une carte.
Le côté client s'occupe d'afficher les résultats de la base de données, la géolocalisation de l'utilisateur et les zones d'accidents potentielles sous différentes formes (textuels ou sur une carte).
Le côté client se distingue en deux parties : une partie cliente (client) qui permet de visualiser les accidents autour de l'utilisateur et de voir ceux qui sont sur notre trajet. Une partie de gestion (management) permet de contrôler les données de l'application. Dans cette deuxième partie, un manager peut ajouter un accident sur une carte ou de façon textuelle, peut filtrer les accidents en fonction de la date et d'une zone géographique (par exemple, la région Provence-Alpes-Côte-D'Azur).

## Technologies utilisées

Des versions supérieures peuvent bien sûr être utilisées

* **NodeJS** v6.11.4
* **npm** v5.6.0

### Côté Serveur
* **MongoDB** v3.6.2

### Côté Client
* **Angular CLI** v1.6.7

## Installation

### Côté Serveur

Pour installer l'application serveur, il faut en tout premier initialiser la base de donnée. Pour cela, commencez par allumer votre base MongoDB dans un terminal indépendant (n'oubliez pas de créer le dossier _C:/data/db_ ou utilisez le praramètre _--dbpath=\<votre-chemin\>_) :
```
$ mongod
```
Depuis la racine, éxécutez le fichier qui va importer toutes les données des accidents, départements, régions, ... dans la base de donnée (dont celle de tests).
```
$ ./databases/initDatabases.sh
```
Si un problème de droits apparait (selon les OS), n'hésitez pas à faire un **chmod +x ./databases/initDatabases.sh** au préalable

Déplacez vous ensuite dans le dossier server
```
$ cd server
```
Installez tous les modules utiles au serveur grâce à la commande
```
$ npm install
```
Il ne vous reste plus qu'à lancer le serveur à l'aide de la commande
```
$ npm start
```
Notre client communique avec le serveur à travers l'URL http://localhost:3000/ mais un autre client REST (comme Postman) peut également y envoyer des requêtes.

Pour lancer les tests du serveur, exécutez la commande :
```
$ npm test
```


### Côté Client
Depuis la racine, accédez au répertoire client
```
$ cd ClientSide/angularClient/app-project
```
Pour installer l'application cliente, il suffit d'utiliser la commande 
```
$ npm install
```
Ceci va installer tous les modules et dépendances nécessaires pour la partie **Client/Client** et **Client/Management**. Cette partie utilise de nombreux modules dont un important, AGM ([Angular Google Maps](https://angular-maps.com/guides/getting-started/)) qui permet d'exploiter la cartographie de Google Maps pour Angular. Nous utilisons également [Bootstrap](https://getbootstrap.com/) et [Google Material Angular](https://material.angular.io/) pour la gestion de popup et de gestion des panneaux d'affichage.
Pour lancer l'application côté cliente : 
```
$ ng serve
```
Cela lancera la compilation du code d'Angular et s'executera sur http://localhost:4200/ avec la partie cliente (http://localhost:4200/client) et la partie gestion (http://localhost:4200/management).
