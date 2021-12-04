const http = require('http');   //Importer package http, donne accès à l'objet http permettant de créer un serveur
const app = require('./app');

const normalizePort = val => {   //La fonction normalizePort renvoie un port valide
const port = parseInt(val, 10);

    if (isNaN(port)) {
    return val;
    }

    if (port >= 0) {
    return port;
    }

    return false;
    };

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//La fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
    throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
    case 'EACCES':
    console.error(bind + ' requires elevated privileges.');
    process.exit(1);
    break;
    case 'EADDRINUSE':
    console.error(bind + ' is already in use.');
    process.exit(1);
    break;
    default:
    throw error;
    }
};

//A chaque envoie de requête au serveur, cette fonction sera appelée
const server = http.createServer(app);

server.on('error', errorHandler);

server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

//Ecouteur d'évènement, consignant le port nommé sur lequel le serveur s'exécute dans la console. Ecoute et attend les requêtes envoyées
server.listen(port);