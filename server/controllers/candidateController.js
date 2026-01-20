
const HttpError = require("../models/errorModel");
const { v4: uuid } = require("uuid");
const cloudinary = require("../utils/cloudinary");
const ElectionModal = require("../models/electionModel");
const CandidateModal = require("../models/candidateModel");
const VoterModel = require("../models/voterModel");
const path = require("path");
const mongoose = require("mongoose");
//======================= Add new candidate=============
//========  POST : api/candidates
// protected(only by an admin )
const addCandidate=async(req,res,next)=>{
    try {
          //only admin can add an election
    if(!req.user.isAdmin){
        return next(new HttpError("Only an admin can perform this action ",403))
    }
    const{fullName,motto,currentElection}=req.body;
    if(!fullName ||!motto ){
        return next(new HttpError("Fill all fields  ",422))
    }
    if(req.files.image){
        return next(new HttpError("Choose an image ",422))
    }
    const{image}=req.files;
    // check the files size
    if (image.size > 1000000) {
        return next(new HttpError("File size is too big ", 403));
      } 
       // if less than we should rename the image
    let fileName = image.name;
    fileName = fileName.split(".");
    fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];
    image.mv(path.join(__dirname,'..',"uploads",fileName),async (err) => {
        if(err){
            return next( new HttpError(err))
        }
        // store the image to cloudinary
        const result = await cloudinary.uploader.upload(
            path.join(__dirname, "..", "uploads", fileName),
            { resource_type: "image" }
          );
          // check cloudinsry storage succesfull
        if (!result.secure_url) {
            return next(new HttpError("Could not upload the image ", 422));
          }

          // add the candidate to the DB
          let newCandidate=await CandidateModal.create({fullName,motto,image:result.secure_url,election:currentElection})

          // get and push the candidate to election
          let election=await ElectionModal.findById(currentElection)


          const sess = await  mongoose .startSession()
          sess.startTransaction()
          await newCandidate.save({session:sess})
          election.candidates.push(newCandidate)
          await election.save({session:sess})
          await sess.commitTransaction()

          res.status(201).json("Candidate added succesfully")
    }) 


    } catch (error) {
        return next(new HttpError(error));
    }
}


//======================= Get candidate=============
//========  GET : api/candidates/:id
// protected
const getCandidate=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const candidate=await CandidateModal.findById(id)
        res.json(candidate)

    } catch (error) {
        return next(new HttpError(error));
    }
}


//======================= Remove  candidate=============
//========  DELETE : api/candidates/:id
// protected(only by an admin )
const removeCandidate=async(req,res,next)=>{
    try {
              //only admin can add an election
    if(!req.user.isAdmin){
        return next(new HttpError("Only an admin can perform this action ",403))
    }
    const{id}=req.params;
    let currentCandidate= await CandidateModal.findById(id).populate('election')
    if(!currentCandidate){
        return next(new HttpError("Could not delete the candidate",422));
    }else{
        const sess = await  mongoose .startSession()
        sess.startTransaction()
        await currentCandidate.deleteOne({session:sess})
        currentCandidate.election.candidates.pull(currentCandidate)
        await currentCandidate.election.save({session:sess})
        await sess.commitTransaction()

          res.status(201).json("Candidate deleted succesfully")
    }


    } catch (error) {
        return next(new HttpError(error)); 
    }
}


//======================= vote candidate=============
//========  PATCH : api/candidates/:id
// protected(only by an admin )
const voteCandidate=async(req,res,next)=>{
    try {
        const {id:candidateId}=req.params;
        const{selectedElection}=req.body;
        // get candidate
        const voter = await VoterModel.findById(req.user.id);
        if (!voter) {
            return next(new HttpError("Voter not found.", 404));
        }

        if (voter.votedElections.includes(selectedElection)) {
            return next(new HttpError("You have already voted in this election.", 403));
        }

        const candidate = await CandidateModal.findById(candidateId);
        if (!candidate) {
            return next(new HttpError("Candidate not found.", 404));
        }

        const election = await ElectionModal.findById(selectedElection);
        if (!election) {
            return next(new HttpError("Election not found.", 404));
        }

        candidate.voteCount += 1;
        await candidate.save();

        election.voters.push(voter._id);
        await election.save();

        voter.votedElections.push(selectedElection);
        await voter.save();

        res.status(201).json("Vote Casted successfully");

    } catch (error) {
        return next(new HttpError(error));
    }
}


module.exports={addCandidate,getCandidate,removeCandidate,voteCandidate}