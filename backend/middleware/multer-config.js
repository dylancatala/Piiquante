const multer = require('multer');

// Type d'extensions d'images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};


// Enregistrement des images reçues dans notre fichier "images"
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage: storage }).single('image');