<img src="images/piiquante_resize.png">
<h2>Projet 6 du parcours "Developpeur Web" pour Openclassroom</h2>
<p>L'objectif est le developpement du Backend du site Web "Piiquante".<br>
Ce site permet aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent.</p>
<p>Le Frontend est fourni dans le projet.<br>
Ce projet utilise NodeJS.<br>
MongoDB a été choisi pour la base de données.</p>
<h3>Frontend</h3>
Le front-end de l'application a été développé à l'aide d'Angular.<br>
Executer<br>
<span style="background:grey; padding:0 5px;border:solid 1px black;">
npm install
</span><br>
<span style="background:grey; padding:0 5px;border:solid 1px black;">
npm install --save-dev run-script-os
</span><br>
<a href="https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6">Le Repositorie Frontend</a><br>
Après récuperation du frontend lancer le serveur frontend avec la commande : <br>
<span  style="background:grey;padding:0 5px;border:solid 1px black;">
npm start
</span><br>

 <h3>Backend</h3> 
 Les dependances NPM suivantes ont été utilisé :
   <ul>
   <li>npm install -g nodemon</li>
   <li>npm install express</li>
   <li>npm install mongoose</li>
   <li>npm install mongoose-unique-validator</li>
   <li>npm install bcrypt</li>
   <li>npm install jsonwebtoken</li>
   <li>npm install dotenv</li>
   <li>npm install multer</li>
   </ul>
 Après récuperation de ce repositorie :<br>

 <strong>Fichier ".env.dist" :</strong><br>
 Ouvrir le fichier ".env.dist"<br>
 Inserer votre identifiant et mot de passe MongoDB.<br>
 Renseigner votre chaîne secrète.<br>
 Modifier l'extension du fichier ".env.dist" par ".env".<br>
 La connexion à MongoDB sera alors possible.<br>

Lancer le serveur backend avec la commande :<br>
<span  style="background:grey;padding:0 5px;border:solid 1px black;">
nodemon server
</span><br>
