import React, { useContext, useEffect, useState } from 'react'
import styles from './userprofile.module.css'
import {Link } from 'react-router-dom'
import avatarImage from '../assets/avatar.jpg'
import {Upload, Check} from 'lucide-react'
import { UserContext } from '../context/userContext'
import {useNavigate} from 'react-router-dom'

function UserProfile() {
  const [avatar, setAvatar] = useState()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const navigate = useNavigate()
  const { currentUser } = useContext( UserContext)
  const token = currentUser?.token;
  useEffect(()=> {
    if(!token){
      navigate('/login')
    }
  },[])
  

  return (
    <section className={styles.profile}>
      <div className={styles.profile_container}>
        <Link to={`/myposts/jkhfjkdjkl`}>My post</Link>
        <div className={styles.profile_details}>
          <div className={styles.avatar_wrapper}>
            <div className={styles.profile_avatar}>
              <img src={avatarImage} />

            </div>
            <form >
              <input type="file" name='avatar' id='avatar' accept='png, jgp, jpeg' onChange={e => setAvatar(e.target.files[0])}/>
              
              <label htmlFor='avatar'>
              <Upload size={24}/>

              </label>
            </form>
            <button className={styles.avatar_btn}><Check /></button>

          </div>
          <h1>Lamodots Doe</h1>
          <form className={styles.profile_form}>
            <p className={styles.form_error_message}>
              This is an error form_error_message
            </p>
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