import React from 'react'
import { elections  } from '../data'
import { candidates } from '../data'
import { Voters } from '../data'
import { useParams } from 'react-router-dom'
import ElectionCandidate from '../components/ElectionCandidate'
import AddCandidateModal from '../components/AddCandidateModal'
import { IoAddOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'


const ElectionDetails = () => {
 const dispatch=useDispatch()
  const  {id}=useParams()
  const currentElection= elections.find(election=>election.id===id  )
  const electionCandidates = candidates.filter(candidate =>candidate.election ===id)
  const addCandidateModalShowing=useSelector(state=>state.ui.addCandidateModalShowing)

  // opening of modal 
  const openModal=()=>{
    dispatch(UiActions.openAddCandidateModal())
  }
  return (
<>
    <section className="electionDetails">
      <div className="container electionDetails_container">
        <h2>{currentElection.title}</h2>
        <p>{currentElection.description}</p>
        <div className="electionDetails_image">
          <img src={currentElection.thumbnail} alt={currentElection.title} />
        </div>
        <menu className="electionDetails_candidates">
          {
            electionCandidates.map(candidate=> <ElectionCandidate key={candidate.id}{...candidate}/>)
          }
          <button className="add_candidate-btn" onClick={openModal}><IoAddOutline/></button>
        </menu>
        <menu className="voters">
          <h2>Voters</h2>
          <table className="voters_table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {
                Voters.map(voter=><tr key={voter.id}>
                  <td><h5>{voter.fullName}</h5> </td>
                  <td>{voter.email} </td>
                  <td> 14:43:34</td>
                </tr>)
              }
            </tbody>
          </table>
        </menu>
      </div>
    </section>
   {addCandidateModalShowing &&<AddCandidateModal/>}
    </>
  )
}

export default ElectionDetails
