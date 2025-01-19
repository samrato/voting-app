
// unsurpoted end points 

const notFound=(req,res,next)=>{
    const error=new Error(`Not Found-${req.originalUrl}`)
    res.status(404)
    next(error);
}


//Error middleware
const errorHandler=(error,req,res,next)=>{
    if(res.headerSent){
        next(error)
    }
    res.status(error.code || 5000).json({message:error.message || "Unknown error occured."})
}

module.exports={notFound,errorHandler}