import React, { useEffect, useState } from 'react'
import Election from '../components/Election'
import AddEleectionModal from '../components/AddEleectionModal'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import UpdateElectionModal from '../components/UpdateElectionModal'
import api from '../utils/api'
import { motion } from 'framer-motion'

const Elections = () => {
  const [elections,setElection]=useState([])

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const data = await api('/elections');
        setElection(data);
      } catch (error) {
        console.error("Failed to fetch elections", error);
      }
    };

    fetchElections();
  }, []);

// open add election Modal
const dispatch = useDispatch()
const openModal =()=>{
  dispatch(UiActions.openElectionModal())
}
const electionModalShowing =useSelector(state=> state.ui.electionModalShowing)
const updateElectionModalShowing =useSelector(state=> state.ui.updateElectionModalShowing)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

  return (
    <>
  <section className='elections'>
    <div className="containe_elections-container">
      <header className="elections_header">
        <h1>Ongoing Elections</h1>
        <button className="btn primary" onClick={openModal}>Create new election</button>
      </header>
      <motion.menu
        className="elections_menu"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {
          elections.map(election => (
            <motion.div key={election.id} variants={itemVariants}>
              <Election {...election}/>
            </motion.div>
          ))
        }
      </motion.menu>
    </div>
  </section>
 {electionModalShowing && <AddEleectionModal  />}
 {updateElectionModalShowing && <UpdateElectionModal/>}
  </>
  )
}

export default Elections


