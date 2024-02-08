import React, { useState } from 'react';
import avatar from '../assets/avatar.jpg';
import { Link } from 'react-router-dom';
import styles from './authors.module.css'

const authorsDetails = [

  {
    id: 1,
    name: 'Lamodot Doe',
    posts :3,
    avatar:avatar
  },
  {
    id: 2,
    name: 'John Deo',
    posts :2,
    avatar:avatar
  },
  {
    id: 3,
    name: 'Philip Mak',
    posts :1,
    avatar:avatar,
  },
]

function Authors() {
  const [authors, setauthors] = useState(authorsDetails)
  return (
    <section className={styles.authors_wrapper}>
     {
      authors.length > 0 ? <div className={styles.authors_details_container}>
      {
          authors.map(({id,  avatar, name, posts})=> {
           return <Link key={id} to={`/posts/users/${id}`} className={styles.author}>
                <div className={styles.author_avatar}>
                  <img src={avatar} alt={`image of ${name}`} />
                </div>
                <div className="author_info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
                </div>
            </Link>
          } )
      }
    </div> : <h2>Authors not found</h2>
     }

    </section>
  )
}

export default Authors