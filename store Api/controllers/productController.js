const apiErrors = require('../utils/apiError')
const Products = require("../models/productModel.js")



require('express-async-errors')


const getProduct = async(req,res)=>{
    // const products = await Products.find({})
    // if(!products)
    // {
    //     throw new apiErrors(500,"error occured during fetching ")
    // }

    // ++++++++++++++ based on query parameters ++++++++++++++++++++++++++++
  const{name,featured,company,sort,fields,numericFilters} = req.query

   const conditions = [];
   if (featured) {
  conditions.push({ featured });
}
if (company) {
  conditions.push({ company: company.trim() });
}
if (name) {
  conditions.push({ name: { $regex: name, $options: 'i' } });
}
// console.log(sort);
 if(sort)
 {
    var sortList = sort.split(",").join(" ")
 }
 if(fields)
 {
    var fieldList = fields.split(",").join(" ")
 }

 const page = Number(req.query.page)||1
 const limit = Number(req.query.limit) || 10
 const skip = (page-1)*limit

 const operatorMap = {
     "<":"$lt",
     ">":"$gt",
     "<=":"$lte",
     ">=":"$gte",
     "=":"$eq",
}

const regex = /\b(<|>|<=|>=|=)\b/g

let filters = numericFilters.replace(regex,(match)=>{
    return `-${operatorMap[match]}-`
})

const options = ["price","rating"]

 filters = filters.split(",").forEach((item)=>{

   const [field,operator,value] = item.split("-")

   if(options.includes(field))
   {
    conditions.push({[field]:{[operator]:Number(value)}})
    console.log(conditions);
   }
   

})






 

     const product =    await Products
    .find(conditions.length > 0 ? { $and: conditions } : {})
     .sort(sortList?sortList:"createdAt")
     .select(fieldList?fieldList:" ")
     .skip(skip)
     .limit(limit)
     


    if(!product)
        {
            throw new apiErrors(500,"error occured during fetching ")
        }


      return res
      .status(200)
      .json({statusCode:200,data:product,msg:"all data fetched successfully",nbHits:product.length})
                 
       
    


















}








const getProductStatic = async(req,res)=>{
     const products = await Products.find({}).sort("name -price")
     if(!products)
     {
        throw new apiErrors(500,"product doesnot exists")
     }

     res.status(200)
     .json({data:products})
    
}

module.exports = {getProduct,getProductStatic}