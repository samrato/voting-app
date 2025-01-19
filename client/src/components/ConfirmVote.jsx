import React, { useEffect, useState } from 'react'
import { candidates } from '../data'
import {UiActions }from '../store/ui-slice'
import { useDispatch, useSelector } from 'react-redux'

const ConfirmVote = () => {
    const [modalCandidate,setModalCandidate]=useState({})
const dispatch = useDispatch()

//tere kwa dispatch am gonna come and look  abot it iys stubbon shiet if it run never touch it 
//close confirm vte moal
const closeCandidateModal=()=>{
    dispatch(UiActions.closeVoteCandidateModal())
}
    // get the selected candidate  before API
    // get candidates id from redux stores
    const selectedVoteCandidate=useSelector(state =>state.vote.selectedVoteCandidate)
    const fetchCandidate=()=>{
        candidates.find(candidate =>{
            if (candidate.id=== selectedVoteCandidate) {
               setModalCandidate(candidate) 
            }
        })
    }
//use effect there we go 
useEffect(()=>{
     fetchCandidate()
},[])

  return (
    <section className='modal'> 
    <div className="modal_content confirm_vote-content">
        <h5>Please Confirm Your Vote </h5>
        <div className="confirm_vote-image">
            <img src={modalCandidate.image} alt={modalCandidate.fullName}/>
        </div>
        <h2>{modalCandidate?.fullName?.length >17? modalCandidate?.fullName?.substring(0,17)+"...":modalCandidate?.fullName}</h2>
        <p>{modalCandidate?.Motto?.length >46? modalCandidate?.Motto?.substring(0,46)+"...":modalCandidate?.Motto}</p>
        <div className="confirm_vote-cta">
            <button className='btn' onClick={closeCandidateModal}>Cancel</button>
            <button className='btn primary'>Confirm</button>
        </div>
    </div>
    </section>
  )
}

export default ConfirmVote
 