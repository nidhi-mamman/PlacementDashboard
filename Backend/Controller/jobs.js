const placement = require('../model/jobs')

const createJob = async (req, res) => {
    try {
        const { title, description, company, branch, roomNumber, arrivingDate } = req.body

        if (!title || !description || !company || !branch || !roomNumber || !arrivingDate) {
            return res.status(400).json({
                msg: "All fields are required"
            });
        }

        const existingJob = await placement.findOne({ roomNumber, arrivingDate });
        if (existingJob) {
            return res.status(409).json({
                msg: `Room ${roomNumber} is already assigned for ${arrivingDate}`
            });
        }

        const jobData = {
            title: title,
            description: description,
            company: company,
            branch: branch,
            roomNumber: roomNumber,
            arrivingDate: arrivingDate
        }

        const jobs = await placement.create(jobData)

        if (jobs) {
            return res.status(200).json({
                msg: "Job Created successfully",
            });
        }
    } catch (error) {
        return res.status(500).json({ msg: error });
    }

}

const fetchjobs = async (req, res) => {
    try {
        const { branch } = req.query;
        let query = {};
        if (branch) {
            query.branch = { $regex: new RegExp(`^${branch}$`, 'i') }; // case-insensitive match
        }
        const jobs = await placement.find(query);
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({ msg: "Error fetching jobs", error: error.message });
    }
};



const fetchJobById = async (req, res) => {
    try {
        const job = await placement.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ msg: "Job not found" });
        }
        return res.status(200).json(job);
    } catch (error) {
        return res.status(500).json({ msg: "Error fetching job", error: error.message });
    }
};

const getAllBranchJobCounts = async (req, res) => {
    try {
        const counts = await placement.aggregate([
            {
                $group: {
                    _id: "$branch",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    branch: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        const formattedCounts = counts.reduce((acc, item) => {
            acc[item.branch] = item.count;
            return acc;
        }, {});

        return res.status(200).json(formattedCounts);
    } catch (error) {
        return res.status(500).json({
            msg: "Error fetching branch job counts",
            error: error.message,
        });
    }
};


module.exports = { createJob, fetchjobs, fetchJobById, getAllBranchJobCounts }