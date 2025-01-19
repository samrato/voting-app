import React from 'react'
import { IoMdTrash } from 'react-icons/io'

const ElectionCandidate = ({fullName,image,id,Motto}) => {
  return (
    <li className="electioncandidate">
        <div className='electionCandidate_image'>
            <img src={image} alt={fullName} />
        </div>
        <div>
            <h5>{fullName}</h5>
            <small>{Motto?.length>70? Motto.substring(0,70)+ "...":Motto}</small>
            <button className="electionCandidate_btn"><IoMdTrash/></button>
        </div>
    </li>
  )
}

export default ElectionCandidate
