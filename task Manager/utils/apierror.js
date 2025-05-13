class ApiError  extends Error
{
    constructor(
        statusCode,
        message = "something went wrong",
        stack = '',
        errors= []
    )
    {
        super(message)
        this.statusCode = statusCode
        this.data = null,
        this.success = false
        this.message = message
        this.errors = errors
        if(stack)
        {
            this.stack = stack
        }
        else
        {
            this.stack = Error.captureStackTrace(this,this.constructor)
        }
    }

}

module.exports = ApiError