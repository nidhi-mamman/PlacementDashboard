const express = require('express');
const router = express.Router();
const { createJob, fetchjobs, fetchJobById, getAllBranchJobCounts } = require('../Controller/jobs');
router.post('/CreateJob', createJob);
router.get('/fetchjobs', fetchjobs);
router.get('/fetchjob/:id', fetchJobById);
router.get('/branch-count', getAllBranchJobCounts)

module.exports = router;
