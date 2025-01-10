class ApiResponse {
    constructor(
        statusCode ,
        data,
        message = "Something went wrong",
        success
    ){
        this.statusCode = statusCode
        if(data){
            this.data = data
        }
        this.message = message,
        this.success = success
    }
}

export default ApiResponse