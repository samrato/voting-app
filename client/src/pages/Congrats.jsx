import React from 'react'
import { Link } from 'react-router-dom'

const Congrats = () => {
  return (
    <section className='congrats'>
      <div className="container congrats_container">
        <h1>Thanks for your Vote !</h1>
        <p>Your Vote is now added to your candidate's vote count .you will be redircted shortly to see the new results </p>
        <Link to='/results' className='btn primary'>See Results </Link>
      </div>
    </section>
  )
}

export default Congrats
