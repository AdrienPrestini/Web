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

## Installation

### Côté Client
Pour installer l'application cliente, il suffit d'utiliser la commande 
```
  $ npm install
  ```
Ceci va installer tous les modules et dépendances nécessaires pour la partie **Client/Client** et **Client/Management**. Cette partie utilise de nombreux modules dont un important, AGM ([Angular Google Maps](https://angular-maps.com/guides/getting-started/)) qui permet d'exploiter la cartographie de Google Maps pour Angular. Nous utilisons également Bootstrap et [Google Material Angular](https://material.angular.io/) pour la gestion de popup et de gestion des panneaux d'affichage.
Pour lancer l'application côté cliente : 
```
$ ng serve
```
Cela lancera la compilation du code d'Angular et s'executera sur http://localhost:4200/ avec la partie cliente (http://localhost:4200/client) et la partie gestion (http://localhost:4200/management).

### Côté Serveur
