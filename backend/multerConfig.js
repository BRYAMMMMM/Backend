const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = '/mnt/images';
    cb(null, uploadPath); // Carpeta local
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Renombrar archivo con timestamp
  },
});

const upload = multer({ storage });

module.exports = upload;
