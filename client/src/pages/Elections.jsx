import React, { useState } from 'react'
import { elections as dummyElections } from '../data'
import Election from '../components/Election'
import AddEleectionModal from '../components/AddEleectionModal'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import UpdateElectionModal from '../components/UpdateElectionModal'
const Elections = () => {
  const [elections,setElection]=useState(dummyElections)

// open add election Modal
const dispatch = useDispatch()
const openModal =()=>{
  dispatch(UiActions.openElectionModal())
}
const electionModalShowing =useSelector(state=> state.ui.electionModalShowing)
const updateElectionModalShowing =useSelector(state=> state.ui.updateElectionModalShowing)

  return (
    <>
  <section className='elections'>
    <div className="containe_elections-container">
      <header className="elections_header">
        <h1>Ongoing Elections</h1>
        <button className="btn primary" onClick={openModal}>Create new election</button>
      </header>
      <menu className="elections_menu">
        {
          elections.map(election => <Election key={election.id} {...election}/>)
        }
      </menu>
    </div>
  </section>
 {electionModalShowing && <AddEleectionModal  />}
 {updateElectionModalShowing && <UpdateElectionModal/>}
  </>
  )
}

export default Elections
