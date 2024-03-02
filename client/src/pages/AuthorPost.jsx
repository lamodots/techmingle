import React from 'react';
import thumb1 from '../assets/thumb1.jpg';
import styles from './authorpost.module.css'
import PostItem from '../components/PostItem';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader'
import axios from 'axios'

const override = {
    display: "block",
    margin: "0 auto",
   
  };

function AuthorPost() {
 
  const [posts , setPosts]= useState([])
  const [isLoading, setIsLoading] = useState(false)
const {id } = useParams()

  useEffect(()=> {
      const getPost = async ()=> {
          setIsLoading(true)
          try {
              const response = await axios.get(`http://localhost:5000/api/posts/users/${id}`)
            
              setPosts(response?.data)
          } catch (err) {
              console.log(err)
          }
          setIsLoading(false)
      }
      getPost()
  },[id])

  if(isLoading){
      return <HashLoader color='#ff3333' cssOverride={override} />
  }
return (
  <section className='author_post'>
    
{     posts.length > 0 ?  <div className={ styles.author_post_container}>
       {
          posts.map(({id, ...rest})=> <PostItem  key={id} id={id} {...rest}/>)
      }
    </div> : <h3>No posts found</h3>}
  </section>
)
}

export default AuthorPost