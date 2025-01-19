import React from 'react'
import { UiActions } from '../store/ui-slice'
import { useDispatch } from 'react-redux'
import { voteActions } from '../store/vote-slice'

const Candidate = ({image,id,fullName,Motto}) => {
  const dispatch = useDispatch()

  //tere kwa dispatch am gonna come and look  abot it iys stubbon shiet if it run never touch it 
  //open the  candidate modal  vte moal
  const openCandidateModal=()=>{
      dispatch(UiActions.openVoteCandidateModal())
      dispatch(voteActions.changeSelecteVoteCandidate(id))
  }

  return (
    <article className='candidate'>
        <div className="candidate_image">
            <img src={image} alt={fullName}/>
        </div>
        <h5>{fullName?.length >20? fullName.substring(0,20)+"...":fullName}</h5>
        <small>{Motto?.length >25 ? Motto.substring(0,25)+"...":Motto}</small>
        <button className='btn primary' onClick={openCandidateModal}>Vote </button>
    </article>
  )
}

export default Candidate
