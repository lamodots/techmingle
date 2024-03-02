import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import styles from './authors.module.css'
import axios from 'axios'
import HashLoader from 'react-spinners/HashLoader'


const override = {
  display: "block",
  margin: "0 auto",
 
};


function Authors() {
  const [authors, setauthors] = useState([])
  const [isLoading, setIsLoading]=  useState(false)

  useEffect(()=>{

    const getAuthors = async ()=> {
      setIsLoading(true)
      try {
        const response = await axios.get(`http://localhost:5000/api/users`)
        setauthors(response.data)
      } catch (err) {
        console.log(err)
      }

      setIsLoading(false)
    }

getAuthors()

  }, [])

  if(isLoading){
    return <HashLoader color='#ff3333' cssOverride={override} />
}
  return (
    <section className={styles.authors_wrapper}>
     {
      authors.length > 0 ? <div className={styles.authors_details_container}>
      {
          authors.map(({_id:id,  avatar, name, posts})=> {
           return <Link key={id} to={`/posts/users/${id}`} className={styles.author}>
                <div className={styles.author_avatar}>
                  <img src={`http://localhost:5000/uploads/${avatar}`} alt={`image of ${name}`} />
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