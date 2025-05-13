
class apiError extends Error
{
    constructor(statusCode,message,stack)
    {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false
        this.data = null
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

module.exports =apiError