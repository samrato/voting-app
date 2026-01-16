const{Router}=require("express")
const {registerVoter,loginVoter,getVoter, getCurrentVoter}=require("../controllers/voterController")
const{addElection,getElection,getElections,getCandidatesOfElection,getElectionVoters,removeElection,updateElection}=require("../controllers/electionsController")

const{addCandidate,getCandidate,removeCandidate,voteCandidate}=require("../controllers/candidateController")

const authMiddleware=require("../middleware/authMiddleware")

const router=Router()


//========The registration and login in Api =================
router.post('/voters/register',registerVoter);
router.post('/voters/login',loginVoter);
router.get('/voters/me',authMiddleware,getCurrentVoter);
router.get('/voters/:id',authMiddleware,getVoter);



//===================THe Election Api for working with =========
router.post('/elections',authMiddleware,addElection);
router.get('/elections',authMiddleware,getElections);
router.get('/elections/:id',authMiddleware,getElection);
router.delete('/elections/:id',authMiddleware,removeElection);
router.patch('/elections/:id',authMiddleware,updateElection);
router.get('/elections/:id/candidates',authMiddleware,getCandidatesOfElection);
router.get('/elections/:id/voters',authMiddleware,getElectionVoters);

//===============The candidates ApIs  for working with =============
router.post('/candidates',authMiddleware,addCandidate);
router.get('/candidates/:id',authMiddleware,getCandidate);
router.delete('/candidates/:id',authMiddleware,removeCandidate);
router.patch('/candidates/:id',authMiddleware,voteCandidate);


module.exports=router;