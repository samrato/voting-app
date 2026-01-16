import { createSlice, current } from "@reduxjs/toolkit";

const initialState={selectedVoteCandidate:"",currentVoter:null,selectedElection:"",idOfElectionToUpdate:"",addCandidateElectioId:""}

const voteSlice= createSlice({
    name:"vote",
    initialState,
    reducers:{
        setCurrentVoter(state, action) {
            state.currentVoter = action.payload;
        },
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