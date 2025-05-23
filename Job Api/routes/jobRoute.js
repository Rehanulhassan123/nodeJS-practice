
const express = require("express")
const {getAllJobs,getJob,createJob,deleteJob,updateJob} = require("../controllers/jobController.js")

const router = express.Router()

router.route("/").get(getAllJobs).post(createJob)
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob)


module.exports = router