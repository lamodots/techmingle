import React, { useContext, useEffect, useState } from 'react'
import styles from './userprofile.module.css'
import {Link , useParams} from 'react-router-dom'

import {Upload, Check} from 'lucide-react'
import { UserContext } from '../context/userContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function UserProfile() {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isAvatarTouched, setIsAvatarTouched] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { currentUser } = useContext( UserContext)
  const {id} = useParams()
  const token = currentUser?.token;
  useEffect(()=> {
    if(!token){
      navigate('/login')
    }
  },[])
  

  useEffect(()=> {
    const getUser = async () => {
     
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}`}
        })
        
        setName(response.data.name)
        setEmail(response.data.email)
        setCurrentPassword(response.data.password)
        setAvatar(response.data.avatar)
      } catch (error) {
        console.log(error)
      }
    }

    getUser()
  }, [])

  const changeAvatarHandler = async  ()=> {
      setIsAvatarTouched(false)
      try {
        
        const postData = new FormData();
        postData.set('avatar', avatar);

        const response = await axios.post(`http://localhost:5000/api/users/change-avatar`, postData, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}`}
        })
        setAvatar(response?.data.avatar)
      } catch (error) {
        console.log(error)
        
      }
  }


const updateHandler = async (e)=> {
  e.preventDefault()
try {
  const userData = new FormData()
  userData.set('name', name)
  userData.set('email', email)
  userData.set('currentPassword', currentPassword)
  userData.set('newPassword', newPassword)
  userData.set('confirmNewPassword', confirmNewPassword)

  const response = axios.patch(`http://localhost:5000/users/edit-user`, userData, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}`}
  })

  if((await response).status === 200 ){
    navigate('/logout')
  }
} catch (err) {
  setError(err.response.data.message)
}
}
  return (
    <section className={styles.profile}>
      <div className={styles.profile_container}>
        <Link to={`/myposts/${currentUser?.id}`}>My post</Link>
        <div className={styles.profile_details}>
          <div className={styles.avatar_wrapper}>
            <div className={styles.profile_avatar}>
              <img src={`http://localhost:5000/uploads/${avatar}`} alt={currentUser.name} aria-label={currentUser?.name} />

            </div>
            <form  >
              <input type="file" name='avatar' id='avatar' accept='png, jgp, jpeg' onChange={e => setAvatar(e.target.files[0])}/>
              
              <label htmlFor='avatar'>
              <Upload size={24} onClick={()=> setIsAvatarTouched(true)}/>

              </label>
            </form>
           { isAvatarTouched &&  <button className={styles.avatar_btn} onClick={changeAvatarHandler}><Check /></button>}

          </div>
          <h1>{currentUser.name}</h1>
          <form className={styles.profile_form} onSubmit={updateHandler} >
           {
            error &&  <p className={styles.form_error_message}>{error}</p>
           }
            <input type="text"  placeholder='Full name'  value={name} onChange={e => setName(e.target.value)} autoFocus/>
            <input type="email"  placeholder='Email'  value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password"  placeholder='Current password'  value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
            <input type="password"  placeholder='New password'  value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <input type="password"  placeholder='Confirm new password'  value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}/>
            <button type='submit'> Update details</button>
          </form>

        </div>

      </div>
    </section>
  )
}

export default UserProfile