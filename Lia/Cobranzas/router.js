const express = require('express')
const router = express.Router()
const controller = require('./controller')
const validateToken = require('../auth')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/cobranzas/bancos', validateToken, controller.getBancos)
router.post(
  '/cobranzas/insert',
  validateToken,
  upload.single('file'),
  controller.subirDeposito
)

module.exports = router
