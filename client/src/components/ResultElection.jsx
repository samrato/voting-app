import React, {  useState,useEffect } from 'react'
import CandidateRating from './CandidateRating'
import { Link } from 'react-router-dom'
import api from '../utils/api'

const ResultElection = ({id,thumbnail,title}) => {
   const[totalVotes,setTotalVotes]=useState(521)
   const [electionCandidates, setElectionCandidates] = useState([]);

   useEffect(() => {
     const fetchCandidates = async () => {
       try {
         const data = await api(`/elections/${id}/candidates`);
         setElectionCandidates(data);
       } catch (error) {
         console.error("Failed to fetch candidates", error);
       }
     };
 
     fetchCandidates();
   }, [id]);

  return (
    <article className='result'>
        <header className=' result_header'>
            <h4>{title}</h4>
            <div className='result_header-image'>
                <img src={thumbnail} alt={title} />
            </div>
        </header>
        <ul className='result_list'>
                {
                   electionCandidates.map(candidate=><CandidateRating key={candidate.id} {...candidate} totalVotes={totalVotes} />) 
                }
            </ul>
            {/* // link to  the place button to direct the user to the election place  */}
            <Link to={`/election/${id}/candidates`} className='btn primary full'>
            Enter election
            </Link>
    </article>
  )
}

export default ResultElection
