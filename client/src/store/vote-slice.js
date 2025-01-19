import { createSlice, current } from "@reduxjs/toolkit";

const currentVoter={id:"v1",token :"sfsfsd",isAdmin:true}
const initialState={selectedVoteCandidate:"",currentVoter,selectedElection:"",idOfElectionToUpdate:"",addCandidateElectioId:""}

const voteSlice= createSlice({
    name:"vote",
    initialState,
    reducers:{
        changeSelecteVoteCandidate(state,action){
            state.selectedVoteCandidate=action.payload;
        },
        changeSelectedElection(state,action){
            state.selectedElection= action.payload;
        },
        changeIdOfCandidateElectionId(state,action){
                state.addCandidateElectioId=action.payload;
        },
        changeAddCandidateElectionId(state,action){
            state.addCandidateElectioId=action.payload;
        }
    }
})
export const voteActions=voteSlice.actions;
export default voteSlice; 