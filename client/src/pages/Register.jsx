import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import styles from './register.module.css'

function Register() {
  const [userData , setUserData] =useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:""
  })

  const handleChange = (e)=> {
    setUserData((prevValue)=> {
      return {...prevValue, [e.target.name]: e.target.value}
    })

  }
  return (
    <section className={styles.register_wrapper}>
      <div className={styles.resigter_container}>
        <h2>Sign up</h2>
        <form>
          <p>This is error message</p>
          <input type='text' placeholder='Full name' name='name' value={userData.name} onChange={handleChange}/>
          <input type='email' placeholder='Enter email' name='email' value={userData.email} onChange={handleChange}/>
          <input type='password' placeholder='Enter password' name='password' value={userData.password} onChange={handleChange}/>
          <input type='password' placeholder='Confirm password' name='confirmpassword' value={userData.confirmPassword} onChange={handleChange}/>
          <button>Sign up</button>
        </form>
        <small>All ready have an account ? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}

export default Register