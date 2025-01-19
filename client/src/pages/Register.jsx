import React, {  useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  //controll inputs no break pass we dont trust the user
  const [userData,setUserData]=useState({fullName:"",email:"",password:" ",password2:""})
  // change input handler  and controll it 
  const changeInputHandler=(e)=>{
    setUserData(prevState =>{
      return {...prevState, [e.target.name]:e.target.value}
    })
  }
 
  return (
   <section className='register'>
    <div className="container register_container">
      <h2>Sign Up </h2>
      <form>
        <p className=' form_error-message'>Any error from backend</p>

        <input type="text"name='fullName' placeholder='Full Name' onChange={changeInputHandler} autoComplete='true' autoFocus/>
        <input type="email"name='email' placeholder='Email address' onChange={changeInputHandler}  autoComplete='true'/>
        <input type="password"name='password' placeholder='password' onChange={changeInputHandler}  autoComplete='true'/>
        <input type="password"name='password2' placeholder='confirm password' onChange={changeInputHandler}  autoComplete='true'/>
        <p>Already have an account ? <Link to= '/'>Sign in </Link></p>
        <button type='submit' className='btn primary'>Register</button>
      </form>
    </div>
   </section>
  )
}

export default Register
