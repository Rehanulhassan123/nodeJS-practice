
const express = require("express")
const router = express.Router()


const {getAllTasks,createTask,updateTask,deleteTask,getTask} = require("../controllers/taskController.js")

/// adding routers 
router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getTask).patch(updateTask).post(deleteTask)


module.exports = router