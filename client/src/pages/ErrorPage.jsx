import React, { useEffect } from 'react'
import Image from '../assets/404.gif'
import { useNavigate } from 'react-router-dom'
const ErrorPage = () => {
   const navigate =useNavigate()
   // redirect the user to the previous page  after six seconds bu use useEffect
  useEffect(()=>{
    setTimeout(() => {
      navigate(-1)
    }, 6000);
  })
  return (
    <div>
      <section className='errorPage'>
        <div className="errorPage_container">
          <img src={Image} alt="Page not found" />
          <h1>404</h1>
          <p>This page does not exits .You will be redirected to the previous page  shortly </p>
          </div>   
      </section>
    </div>
  )
}

export default ErrorPage
