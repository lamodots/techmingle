import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import avater from '../assets/thumb1.jpg'
import styles from './postauthor.module.css'
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

function PostAuthor({authorId ,createdAt}) {
  const [author, setAuthor] = useState({})

  useEffect(()=>{
    const getAuthor = async ()=> {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${authorId}`)
        setAuthor(response?.data)

      } catch (err) {
        console.log(err)
      }
    }
    getAuthor()
  }, [])
  return (
    <Link to={`/posts/users/${authorId}`}>
        <div className={styles.author_avater}>
            <img src={`http://localhost:5000/uploads/${author?.avatar}`} />
        </div>
        <div className="author_details">
          <h5>By: {author?.name}</h5>
          <small><ReactTimeAgo date={createdAt} locale="en-US"/></small>
        </div>
    </Link>
  )
}

export default PostAuthor