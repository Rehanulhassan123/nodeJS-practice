require("express-async-errors")
const {StatusCodes} = require("http-status-codes")
const apiError = require("../utils/CustomApiError.js")
const apiResponse = require("../utils/CustomApiResponse.js")
const Job = require("../models/jobModel.js")


const getAllJobs = async(req,res)=>
    {
     const jobs = await Job.find({createdBy:req.user?._id}).sort("createdAt")
     console.log(jobs);

    if(!jobs)
    {
        throw new apiError(StatusCodes.INTERNAL_SERVER_ERROR,"something went wrong while fetching records")
    }
    res.status(StatusCodes.OK)
    .json(new apiResponse(StatusCodes.OK,"all jobs fetched",{jobs,length:jobs.length}))


    }



 const getJob = async(req,res)=>
    {
        const {id:jobid} = req.params
        if(!jobid)
        {
            throw new apiError(StatusCodes.BAD_REQUEST,"Id is required")
        }
        // console.log(jobid);
        const job = await Job.findOne({createdBy:req.user?._id,_id:jobid})
        console.log(job);
        if(!job)
        {
    throw new apiError(StatusCodes.NOT_FOUND,"job with this id doesnot exists ")
        }
        // console.log(job);
        return res.status(StatusCodes.OK)
        .json(new apiResponse(StatusCodes.OK,"Job fetched successfully",job))
    }


    const createJob = async(req,res)=>
    {
        const {position,company,status} = req.body
        if(!position || !company )
        {
            throw new apiError(StatusCodes.BAD_REQUEST,"All fields are required")
        }

        const job = await Job.create({
            position,
            company,
            createdBy:req.user?._id,
            status: status&&status.length>0? status:"Pending"
        })

        if(!job)
        {
            throw new apiError(StatusCodes.INTERNAL_SERVER_ERROR,"something went wrong while saving job")
        }

        return res.status(StatusCodes.OK)
                .json(new apiResponse(StatusCodes.OK,"job created Successfully",job))


    }



    const deleteJob = async(req,res)=>
    {
        const {params:{id:jobid},user:{_id:userId} } = req
        console.log(jobid,userId,req.user._id);

        if(!jobid || !userId)
        {
        throw new apiError(StatusCodes.BAD_REQUEST,"id is required")
        }
        const jobs = await Job.findOneAndDelete({ createdBy:userId,_id:jobid })

        if(!jobs)
        {
            throw new apiError(StatusCodes.NOT_FOUND,"job with this id doesnot exists ")
        }

        return res.status(StatusCodes.OK)
               .json(new apiResponse(StatusCodes.OK,"Deleted job successful",jobs))
    }
    const updateJob = async(req,res)=>
    {
    const{body:{company,position},params:{id:jobId},user:{_id:userId}} =req
    
    if(!company || !position || !jobId,!userId)
    {
        throw new apiError(StatusCodes.BAD_REQUEST,"All fields are required")
    }
    console.log(jobId);
    const job = await Job.findOneAndUpdate(
        {createdBy:userId,_id:jobId},
         {position,company},
         {new:true,runValidators:true})

         if(!job)
         {
            throw new apiError(StatusCodes.NOT_FOUND,"job with this id doesnot exists")
         }

         res.status(StatusCodes.OK)
            .json(new apiResponse(StatusCodes.OK,"update job successful",job))






    }

    module.exports = {
        getAllJobs,
        getJob,
        deleteJob,
        createJob,
        updateJob
    }
