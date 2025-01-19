import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { UiActions } from '../store/ui-slice'

const Election = ({id,title,description,thumbnail}) => {
const dispatch=useDispatch()
// open update modal class 
const openModal= ()=>{
     dispatch(UiActions.openUpdateElectionModal())
}

  return (
   <article className="election">
    <div className="election_image">
      <img src={thumbnail} alt={title}/>
    </div>
    <div className="election_info">
        <Link to={`/elections/${id}`}> <h4> {title}  </h4>  </Link>
        <p>{description?.length >255? description.substring (0,255)+"...":description}</p>
        <div className="election_cta">
          <Link to={`/elections/${id}`} className='btn sm'>View</Link>
          <button className="btn sm primary" onClick={openModal}>Edit</button>
        </div>
    </div>
   </article>
  )
}

export default Election
