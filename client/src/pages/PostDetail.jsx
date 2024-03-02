import React, { useContext, useEffect, useState } from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom';
import styles from './postdetails.module.css';

import { useParams } from 'react-router-dom';
import axios from 'axios'
import HashLoader from 'react-spinners/HashLoader'
import { UserContext } from '../context/userContext';

const override = {
  display: "block",
  margin: "0 auto",
 
};


function PostDetail() {
  const {id} = useParams()
  const [error, setError] = useState(null)
const [post, setPost] = useState(null)
const [isLoading, setIsLoading] = useState(false)


console.log(id)


const { currentUser} = useContext(UserContext)

useEffect(()=>{

  const getSinglePost = async ()=> {
    setIsLoading(true)
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${id}`)
      setPost(response.data)
     
    } catch (err) {
      setError(err)
      
    }

    setIsLoading(false)
}

getSinglePost()
},[id])

if(isLoading){
  return <HashLoader color='#ff3333' cssOverride={override} />
}
  return (
    <section className={styles.details_wrapper}>
      {error && <p>{error}</p>}
      <div className={styles.details_page_container}>
          
      {/* start */}

      {
        post && (
          <div className={styles.post_detail_container}>
        <div className={styles.post_details_header}>
          <PostAuthor />
         {currentUser?.id === post?.creator && (
             <div className={styles.post_details_action}>
             <Link to={`/posts/${id}/edit`} >Edit</Link>
             <Link to={`/posts/${id}/delete-post`}>Delete</Link>
           </div>
         )}
          
        </div>
        <h1>{post.title}</h1>
        <div className={styles.post_details_thumnail}>
          <img src={`http://localhost:5000/uploads/${post?.thumbnail}`} alt='' />
        </div>
        
        {/* To make the editor we are using work */}
        <p dangerouslySetInnerHTML={{__html:post.description}} />
      </div>
        )
      }
      <aside className={styles.details_page_sidebar}>
        <div className={styles.aside_header}>
          <form>
            <input type='search' placeholder='Search article' name='search' value={'john'} />
            <button type='submit'>Search</button>
          </form>
        </div>
        <div className={styles.recent_post}>
         <h3>Top stories</h3>
         <div className="recent_post-list">
            <Link ></Link>
         </div>
        </div>
        <div className={styles.post_categories_details}>
          <h3>Catgories</h3>
          <Link to="/posts/categories/art">Art</Link>
          <Link to="/posts/categories/agriculture">Agriculture</Link>
          <Link to="/posts/categories/business">Business</Link>
          <Link to="/posts/categories/education">Education</Link>
          <Link to="/posts/categories/entertainment">Entertainment</Link>
          <Link to="/posts/categories/investment">Investment</Link>
          <Link to="/posts/categories/weather">Weather</Link>
          <Link to="/posts/categories/uncategorized">Uncategorized</Link>
        </div>
      </aside>

      {/* end */}

      </div>
      <div className={styles.related_post}>
        <h3>Related Post</h3>
      </div>
    </section>
  )
}

export default PostDetail