
class apiResponse
{
    constructor(statusCode,message="Request Successful",data)
    {
         this.statusCode = statusCode || 200
         this.message = message
         this.data = data  || []
         this.success = true
    }
}

module.exports = apiResponse