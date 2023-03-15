const errorHandler = (err, req, res, next) => {
    console.log(err)
    if (err.name == "Bad Request"){
        res.status(400).json({statusCode: 400, message: err.message})
    }
    else if (err.name == "JsonWebTokenError") res.status(400).json({statusCode: 400, message: "Invalid Token"})
    else if (err.name == "Invalid email or password") res.status(401).json({statusCode: 401, message:  err.message})
    else if (err.name == "Already Taken") res.status(409).json({statusCode: 409, message: err.message})
    else if (err.name == "Invalid token") res.status(401).json({statusCode: 404, message: err.message})
    else res.status(500).json({statusCode: 500, message: "Internal Server Error"})
}

module.exports = errorHandler