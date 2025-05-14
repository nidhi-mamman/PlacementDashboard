const express = require("express")
const { createAlumini, fetchAluminis, FetchAluminiByBranch, FetchAlumniByBranchDetails } = require('../Controller/alumini')

const router = express.Router()

router.post('/CreateAlumini', createAlumini)
router.get('/FetchAlumini', fetchAluminis)
router.get('/FetchAluminiByBranch', FetchAluminiByBranch)
router.get('/FetchAluminiByBranchDetails', FetchAlumniByBranchDetails)

module.exports = router