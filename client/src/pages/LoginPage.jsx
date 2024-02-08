import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import styles from './register.module.css'

function LoginPage() {
  const [userData , setUserData] =useState({
   
    email: "",
    password: "",
    
  })

  const handleChange = (e)=> {
    setUserData((prevValue)=> {
      return {...prevValue, [e.target.name]: e.target.value}
    })

  }
  return (
    <section className={styles.register_wrapper}>
      <div className={styles.resigter_container}>
        <h2>Sign in</h2>
        <form>
          <p>This is error message</p>
         
          <input type='email' placeholder='Enter email' name='email' value={userData.email} onChange={handleChange}/>
          <input type='password' placeholder='Enter password' name='password' value={userData.password} onChange={handleChange}/>
         
          <button>Sign in</button>
        </form>
        <small>Don't have an account ? <Link to="/register">Sign up</Link></small>
      </div>
    </section>
  )
}

export default  LoginPage;