import React, { useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './register.module.css'
import axios from 'axios'
import { UserContext} from '../context/userContext'
import ClipLoader from 'react-spinners/ClipLoader'

function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [userData , setUserData] =useState({
   
    email: "",
    password: "",
    
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
const {setCurrentUser}  = useContext(UserContext)

  const handleChange = (e)=> {
    setUserData((prevValue)=> {
      return {...prevValue, [e.target.name]: e.target.value}
    })

  }

  const handleSubmit =  async (e) => {
    e.preventDefault()
    setError(" ")
    setLoading(true)
    try {
      const response = await axios.post(`http://localhost:5000/api/users/login`, userData )
     
      const user = await response.data;
      setCurrentUser(user)
   
      navigate("/")
    } catch (err) {
      setError(err.response.data.message)
    }
    setLoading(false)
  }
  return (
    <section className={styles.register_wrapper}>
      <div className={styles.resigter_container}>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
         {error &&  <p>{error}</p>}
         
          <input type='email' placeholder='Enter email' name='email' value={userData.email} onChange={handleChange}/>
          <input type='password' placeholder='Enter password' name='password' value={userData.password} onChange={handleChange}/>
         
          <button className={styles.loginButton}>{loading && <ClipLoader color="#36d7b7" size={24} /> }Sign in</button>
        </form>
        <small>Don't have an account ? <Link to="/register">Sign up</Link></small>
      </div>
    </section>
  )
}

export default  LoginPage;