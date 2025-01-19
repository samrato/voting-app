const{Schema,model,Types}=require("mongoose")
 

const electionSchema=new Schema ({
    title:{type:String,required:true},
    description:{type:String,required:true},
    titl:{type:String,required:true},
    candidates:[{type:Types.ObjectId,required:true,ref:"Candidate"}],
    voters:[{type:Types.ObjectId,required:true,ref:"Voter"}]
})

module.exports=model("Election",electionSchema)