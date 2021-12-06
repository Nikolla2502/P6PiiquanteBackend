const multer =require('multer');

const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg': 'jpg',
    'image/png':'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');                             // on supprime les espaces dans les noms originaux des fichiers pour les remplacer par des underscore
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage}).single('image');