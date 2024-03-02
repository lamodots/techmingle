import React, { useEffect, useState, CSSProperties} from 'react'

import PostItem from './PostItem'
import styles from './posts.module.css';
import HashLoader from 'react-spinners/HashLoader'
import axios from 'axios'

const override = {
    display: "block",
    margin: "0 auto",
   
  };
function Posts() {
   
    const [posts , setPosts]= useState([])
    const [isLoading, setIsLoading] = useState(false)
 
    useEffect(()=> {
        const getPost = async ()=> {
            setIsLoading(true)
            try {
                const response = await axios.get('http://localhost:5000/api/posts')
                
                setPosts(response?.data)
            } catch (err) {
                console.log(err)
            }
            setIsLoading(false)
        }
        getPost()
    },[])

    if(isLoading){
        return <HashLoader color='#ff3333' cssOverride={override} />
    }
  return (
    <section className='post'>
      
{     posts.length > 0 ?  <div className={ styles.post_container}>
         {
            posts.map(({id, ...rest})=> <PostItem  key={id} id={id} {...rest}/>)
        }
      </div> : <h3>No posts found</h3>}
    </section>
  )
}

export default Posts