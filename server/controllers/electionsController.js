const HttpError = require("../models/voterModel");
const { v4: uuid } = require("uuid");
const cloudinary = require("../utils/cloudinary");
const ElectionModal = require("../models/electionModel");
const CandidateModal = require("../models/candidateModel");
const path = require("path");

//======================= Add new election=============
//========  POST : api/election
// protected(only by an admin )
const addElection = async (req, res, next) => {
  try {
    //only admin can add an election
    if(!req.user.isAdmin){
        return next(new HttpError("Only an admin can perform this action ",403))
    }

    const { title, description } = req.body;
    if (!title || !description) {
      return next(new HttpError("Fill in all fields", 422));
    }
    if (!req.files || !req.files.thumbnail) {
      return next(new HttpError("Choose a thumbnail ", 422));
    }
    const { thumbnail } = req.files;
    // image should be less than 1mb
    if (thumbnail.size > 1000000) {
      return next(new HttpError("File size is too big ", 403));
    }
    // if less than we should rename the image
    let fileName = thumbnail.name;
    fileName = fileName.split(".");
    fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];
    // upload files to upload folder
    await thumbnail.mv(
      path.join(__dirname, "..", "uploads", fileName),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        }
        // store image on cloudinary
        const result = await cloudinary.uploader.upload(
          path.join(__dirname, "..", "uploads", fileName),
          { resource_type: "image" }
        );
        if (!result.secure_url) {
          return next(new HttpError("Could not upload the image ", 422));
        }
        // if succs saves the election to Db
        const newElection = await ElectionModal.create({
          title,
          description,
          thumbnail: result.secure_url,
        });
        res.json(newElection);
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

//======================= get all election=============
//========  GET : api/election
// protected
const getElections = async (req, res, next) => {
  try {
    const elections = await ElectionModal.find();
    res.status(200).json(elections);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//======================= Get single election===========
//========  GET : api/election/:id
// protected
const getElection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const election = await ElectionModal.findById(id);
    res.status(200).json(election);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//======================= Get election candidates ============
//========  GET : api/election/:id/candidates
// protected
const getCandidatesOfElection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const candidates = await CandidateModal.find({ election: id });
    res.status(200).json(candidates);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//======================= Get voters of an election============
//========  GET : api/election/:id/voters
// protected
const getElectionVoters = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await ElectionModal.findById(id).populate("voters");
    res.status(200).json(response.voters);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//======================= Remove or delete ===================
//========   DELETE : api/election/:id
// protected(only by an admin )
const removeElection = async (req, res, next) => {
  try {
    //only admin can add an election
    if(!req.user.isAdmin){
        return next(new HttpError("Only an admin can perform this action ",403))
    }
    const { id } = req.params;
    await ElectionModal.findByIdAndDelete(id);
    // delete all candidates that belong to that particular election all
    await CandidateModal.deleteMany({election:id })
    res.status(200).json("Election deleted successfuully");
  } catch (error) {
    return next(new HttpError(error));
  }
};

//======================= Update an election=================
//========  PATCH : api/election/:id
// protected(only by an admin )
const updateElection = async (req, res, next) => {
  try {
    //only admin can add an election
    if(!req.user.isAdmin){
        return next(new HttpError("Only an admin can perform this action ",403))
    }
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      return next(new HttpError("Fill in all fields ", 422));
    }
    let thumbnail;
    if (req.files) {
       thumbnail = req.files.thumbnail;
    }
    // image size of the thumbnail
    if (thumbnail.size > 1000000) {
      return next(new HttpError("File size is too big ", 403));
    }
    // if less than we should rename the image
    let fileName = thumbnail.name;
    fileName = fileName.split(".");
    fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];

    // renaming the files
     thumbnail.mv(
      path.join(__dirname, "..", "uploads", fileName),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        }
        // store image on cloudinary
        const result = await cloudinary.uploader.upload(
          path.join(__dirname, "..", "uploads", fileName),
          { resource_type: "image" }
        );
        // check cloudinsry storage succesfull
        if (!result.secure_url) {
          return next(new HttpError("Could not upload the image ", 422));
        }
        // saves the election to db
        await ElectionModal.findByIdAndUpdate(id, {
          title,
          description,
          thumbnail: result.secure_url,
        });
        res.status(200).json("Election updated Succesfully");
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  addElection,
  getElection,
  getElections,
  getCandidatesOfElection,
  getElectionVoters,
  removeElection,
  updateElection,
};
