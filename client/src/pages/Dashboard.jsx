import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import thumb1 from '../assets/thumb1.jpg'
import styles from './dashboard.module.css'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios'
import HashLoader from 'react-spinners/HashLoader'

const override = {
  display: "block",
  margin: "0 auto",
 
};


function Dashboard() {
  const [posts, setPost] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { currentUser } = useContext( UserContext)
  const token = currentUser?.token;

  const {id} = useParams()
  useEffect(()=> {
    if(!token){
      navigate('/login')
    }
  },[navigate, token])


useEffect(()=>{
  setIsLoading(true)
  const fetchPost = async ()=> {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/users/${id}`, {
        withCredentials:true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPost(response.data)
    } catch (err) {
      setError(err.response.data.message)
      
    }

    setIsLoading(false)
  }

  fetchPost()
},[id, token])
  
if(isLoading){
  return <HashLoader color='#ff3333' cssOverride={override} />
}
  return (
    <section className={styles.dashboard}>
      {
        posts.length ? 
        <div className={styles.dashboard_container}>
          {
            posts.map( post => {
              const shortTitle = post.title.length < 120 ? post.title : post.title.slice(0, 120) + " "+ "..."
              return(
                <article key={post.id} className={styles.dashboard_post}>
                  <div className={styles.dasboard_post_info}>
                    <div className={styles.dashboard_post_thumbnail}>
                      <img src={`http://localhost:5000/uploads/${post?.thumbnail}`} />
                    </div>
                    <h5>{shortTitle}</h5>
                  </div>
                  <div className={styles.dashboard_post_actions}>
                    <Link to={`/posts/${post._id}`}>View</Link>
                    <Link to={`/posts/${post._id}/edit-post`}>Edit</Link>
                    <Link to={`/posts/${post._id}/delete-post`}>Delete</Link>
                  </div>
                </article>
              )
            })
          }
        </div>: <h2>You have no post yet</h2>
      }
    </section>
  )
}

export default Dashboard