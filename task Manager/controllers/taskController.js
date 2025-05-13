
const asyncHandler = require("../utils/ayncHandler.js")
const apiResponse = require('../utils/apiresponse.js')
const apiError = require("../utils/apierror.js")
 const Task = require("../models/taskModel.js")




const getAllTasks = asyncHandler(async(req,res)=>{
    const tasks = await Task.find({})
    console.log(tasks);
    if(!tasks || tasks.length <1)
    {
        throw new apiError(500,"cannot find tasks ")
    }
    return res
    .status(200)
    .json(new apiResponse(200,"data fetched SuccessFully",tasks))
})


const createTask = asyncHandler( async (req,res)=>{
    console.log(req.body);
    const {name,completed} = req.body
    if(!(name&&name.trim()))
    {
        console.log(name);
        throw new apiError(401,"Name is Required")
    }


     const task = await Task.create({
        name:name,
        completed: completed?completed:false
     })
     console.log(task);
     if(!task)
      {
        throw new apiError(500,"something went wrong while saving task")
      }
      res.status(200)
      .json(new apiResponse(
       200,
       "task saved Successfully",
       task))
     


   })

const getTask = asyncHandler(async(req,res)=>{
    const {id} = req.params
   if(!id)
   {
    throw new apiError(400,"Id doesnot found")
   }

   const task = await Task.findOne({_id:id})
   if(!task)
   {
    throw new apiError(400,"Task doesnot exist ")
   }

   res.status(200)
   .json(new apiResponse(200,"Task fetched ",task))
}
)

const updateTask = asyncHandler( async(req,res)=>{

    const {id} = req.params
    const {name,completed} = req.body
    if(!(name&&name.trim()))
        {
            console.log(name);
            throw new apiError(401,"Name is Required")
        }
    if(!id)
      {
          throw new apiError(400,"Id doesnot found")
      }
      const task = await Task.findByIdAndUpdate(
          {_id:id},
          {name,completed:completed},
          {new:true,runValidators:true})
  
       if(!task)
       {
          throw new apiError(400,"task doesnot found for id ")
       }
  
       res.status(200)
       .json(new apiResponse(200,"updated successfully",task))
  
      
  })


const deleteTask = asyncHandler(async(req,res)=>{
    const {id} = req.params
    if(!id)
    {
        throw new apiError(400,"Id doesnot found")
    }
    const task = await Task.findByIdAndDelete({_id:id})
    if(!task)
    {
        throw new apiError(500,"task doesnot deleted")
    }

    return res
    .status(200)
    .json(new apiResponse(200,"task deleted successfully",task))
})

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTask
}
