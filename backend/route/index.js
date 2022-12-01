const express = require('express')
const router = express.Router()
const vent = require('../controller/index.js')

router.get('/', vent.getVent)
router.post('/', vent.createVent)
router.put('/', vent.updateVent)

module.exports = router
