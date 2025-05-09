const express = require("express")
const { createAlumini,fetchAluminis } = require('../Controller/alumini')

const router = express.Router()

router.post('/CreateAlumini', createAlumini)
router.get('/FetchAlumini', fetchAluminis)

module.exports = router