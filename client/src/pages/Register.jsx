import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './register.module.css'
import axios from 'axios'


function Register() {
  const [userData , setUserData] =useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:""
  })
const [error, setError] = useState('')

const navigate = useNavigate()

  const handleChange = (e)=> {
    setUserData((prevValue)=> {
      return {...prevValue, [e.target.name]: e.target.value}
    })
  }

  
  const registerUser = async (event) => {
    event.preventDefault()
    setError("")

    try {
      
      const response = await axios.post(`http://localhost:5000/api/users/register`, userData)

console.log(response)
      const newUser = await response.data;
    
      if(!newUser){
        setError("Couldn't resgister user. Please try again.")
      }

      navigate('/login')
    } catch (err) {
     
      setError(err.response.data.message)
    }
  }

  return (
    <section className={styles.register_wrapper}>
      <div className={styles.resigter_container}>
        <h2>Sign up</h2>
        <form onSubmit={registerUser}>
          {error && <p>{error}</p>}
          <input type='text' placeholder='Full name' name='name' value={userData.name} onChange={handleChange}/>
          <input type='email' placeholder='Enter email' name='email' value={userData.email} onChange={handleChange}/>
          <input type='password' placeholder='Enter password' name='password' value={userData.password} onChange={handleChange}/>
          <input type='password' placeholder='Confirm password' name='confirmPassword' value={userData.confirmPassword} onChange={handleChange}/>
          <button>Sign up</button>
        </form>
        <small>All ready have an account ? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}

export default Register