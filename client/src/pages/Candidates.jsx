import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Candidate from '../components/Candidate'
import ConfirmVote from '../components/ConfirmVote'
import { useSelector } from 'react-redux'
import api from '../utils/api'
import { motion } from 'framer-motion'

const Candidates = () => {
  const {id} =useParams()
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await api(`/elections/${id}/candidates`);
        setCandidates(data);
      } catch (error) {
        console.error("Failed to fetch candidates", error);
      }
    };

    fetchCandidates();
  }, [id]);


  const voteCandidateModalShowing=useSelector(state=>state.ui.voteCandidateModalShowing)
// gets the candidates that belongs to the election 

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
    <section className='candidates'>
     <header className='candidates_header'>
      <h1>Vote your candidates</h1>
      <p>These are the candidates for the selected election .please vote once and wisely cause you wont be allowed to vote twice in the election . </p>
     </header>
     <motion.div
        className='container candidates_container'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      {
        candidates.map(candidate=>(
          <motion.div key={candidate.id} variants={itemVariants}>
            <Candidate {...candidate}/>
          </motion.div>
        ))
      }
     </motion.div>
    </section>
    {voteCandidateModalShowing &&<ConfirmVote/>}
    </>
  )
}

export default Candidates
