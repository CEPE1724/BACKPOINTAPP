const express = require('express');
const router = express.Router();
const googleController = require('./controller');

// Ruta para subir un archivo a Google Cloud Storage
router.put('/googleApi/google', googleController.upload.single('file') , googleController.uploadFileToGCS);

module.exports = router;
