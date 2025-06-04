const Company = require('../model/company')
const placement = require('.././model/jobs')

const createCompany = async (req, res) => {
    try {
        const { companyName, location, tel, email, companyType, remark } = req.body
        if (!companyName || !location || !tel || !email || !companyType) {
            return res.status(400).json({
                msg: "Please enter all fields."
            })
        }

        const company = await Company.create({
            companyName: companyName,
            location: location,
            tel: tel,
            email: email,
            companyType: companyType,
            remark: remark
        })
        if (company) {
            return res.status(200).json({
                msg: "Company Created successfully"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: error
        })
    }
}

const fetchCompany = async (req, res) => {
    try {
        const companies = await Company.find()
        res.status(200).json(companies);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error })
    }
}

const getActiveCompanies = async (req, res) => {
    try {
        const today = new Date();
        const activeJobs = await placement.find({ arrivingDate: { $gte: today.toISOString().split('T')[0] } });
        const activeCompanyNames = [...new Set(activeJobs.map(job => job.company))];

        const activeCompanies = await Company.find({ companyName: { $in: activeCompanyNames } });

        res.status(200).json({
            activeCompanyCount: activeCompanies.length,
            activeJobCount: activeJobs.length,
            activeCompanies,
            activeJobs,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}
module.exports = { createCompany, fetchCompany, getActiveCompanies }