const Alumini = require('../model/aluminis')
const createAlumini = async (req, res) => {
    try {
        const { Name, branch, passout, company, tel, linkedin } = req.body;
        if (!Name || !branch || !passout || !company || !tel) {
            return res.status(400).json({
                msg: "Please enter all fields."
            })
        }

        const alumini = await Alumini.create({
            Name: Name,
            branch: branch,
            passout: passout,
            company: company,
            tel: tel,
            linkedin: linkedin
        })
        if (alumini) {
            return res.status(200).json({
                msg: "Alumini Created Successfully"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: error
        })
    }
}

const fetchAluminis = async (req, res) => {
    try {
        const { branch } = req.query;
        let query = {};

        if (branch) {
            query.branch = { $regex: new RegExp(`^${branch}$`, 'i') };
        }

        const aluminis = await Alumini.find(query);
        res.status(200).json(aluminis);
    } catch (error) {
        return res.status(500).json(
            {
                msg: error
            }
        )
    }
}

const FetchAluminiByBranch = async (req, res) => {
    try {
        const data = await Alumini.aggregate([
            { $group: { _id: "$branch", count: { $sum: 1 } } }
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching alumni counts", error: err });
    }
}

const FetchAlumniByBranchDetails = async (req, res) => {
    try {
        const { branch } = req.query;
        const alumniData = await Alumini.find({
            branch: { $regex: new RegExp(`^${branch}$`, 'i') }
        });
        res.json(alumniData);
    } catch (err) {
        res.status(500).json({ message: "Error fetching alumni data", error: err });
    }
};

module.exports = { createAlumini, fetchAluminis, FetchAluminiByBranch, FetchAlumniByBranchDetails }