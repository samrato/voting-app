import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ElectionCandidate from '../components/ElectionCandidate'
import AddCandidateModal from '../components/AddCandidateModal'
import { IoAddOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import api from '../utils/api'

const ElectionDetails = () => {
 const dispatch=useDispatch()
  const  {id}=useParams()
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const addCandidateModalShowing=useSelector(state=>state.ui.addCandidateModalShowing)

  useEffect(() => {
    const fetchElectionDetails = async () => {
      try {
        const [electionData, candidatesData, votersData] = await Promise.all([
          api(`/elections/${id}`),
          api(`/elections/${id}/candidates`),
          api(`/elections/${id}/voters`),
        ]);
        setElection(electionData);
        setCandidates(candidatesData);
        setVoters(votersData);
      } catch (error) {
        console.error("Failed to fetch election details", error);
      }
    };

    fetchElectionDetails();
  }, [id]);

  // opening of modal 
  const openModal=()=>{
    dispatch(UiActions.openAddCandidateModal())
  }
  return (
<>
    <section className="electionDetails">
      <div className="container electionDetails_container">
        <h2>{election?.title}</h2>
        <p>{election?.description}</p>
        <div className="electionDetails_image">
          <img src={election?.thumbnail} alt={election?.title} />
        </div>
        <menu className="electionDetails_candidates">
          {
            candidates.map(candidate=> <ElectionCandidate key={candidate.id}{...candidate}/>)
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
                voters.map(voter=><tr key={voter.id}>
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
