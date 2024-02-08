import React from 'react'
import { Link } from 'react-router-dom'
import avater from '../assets/thumb1.jpg'
import styles from './postauthor.module.css'

function PostAuthor() {
  return (
    <Link to={`/posts/users/jfjkdfkjdkfkd`}>
        <div className={styles.author_avater}>
            <img src={avater} />
        </div>
        <div className="author_details">
          <h5>By: Lamodot dee</h5>
          <small>Just Now</small>
        </div>
    </Link>
  )
}

export default PostAuthor