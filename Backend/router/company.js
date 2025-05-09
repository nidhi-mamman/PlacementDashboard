const express = require("express")
const { createCompany,getActiveCompanies,fetchCompany} = require('../Controller/company')
const router = express.Router()

router.post('/CreateCompany', createCompany)
router.get('/FetchCompany',  fetchCompany)
router.get('/ActiveCompany', getActiveCompanies)

module.exports = router