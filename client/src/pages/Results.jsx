import React, { useEffect, useState } from 'react'
import ResultElection from '../components/ResultElection'
import api from '../utils/api'

const Results = () => {
  const [elections,setElection]= useState([])

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
  
  return (
   <section className='results'>
    <div className='container results_container  '>
      {
        elections.map(election=><ResultElection key={election.id} {...election}/>)
      }
    </div>
   </section>
  )
}

export default Results
