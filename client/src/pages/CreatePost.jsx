import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './createpost.module.css'

import { UserContext } from '../context/userContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'


function CreatePost() {
  const [title, setTitle] =  useState('')
  const [category, setCategory] =  useState('Uncategorized')
  const [description, setDescription] =  useState('')
  const [thumbnail, setThumbnail] =  useState('')
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { currentUser } = useContext( UserContext)
  const token = currentUser?.token;
  /**
   * Redirect user to login page for any user who is not logged in.
   */
  useEffect(()=> {
    if(!token){
      navigate('/login')
    }
  },[])
  

  const modules = {
    toolbar : [
      [{ 'header': [1, 2, 3,4,5,6, false]  }],
      ['bold', 'italic', 'underline', 'strike',"blockquote" ],  
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
      ["link", "image"],
      ["clean"]
    ],
  }
  const formats = [
    "header", "bold", "italic","underline", "strike",  "blockquote","list", "bullet", "indent","link", "image", "video"
  ]
  const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"]



  const createPost = async (e) => {
      e.preventDefault();
      const postData = new FormData();
      postData.set('title', title)
      postData.set('category', category)
      postData.set('description', description)
      postData.set('thumbnail', thumbnail)

      try {
        setIsLoading(true)
        const response = await axios.post(`http://localhost:5000/api/posts`, postData, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}`}
         
        })

        if(response.status == 201){
          return navigate('/')
        }

      } catch (err) {
        setError(err.response.data.message)
      }

      setIsLoading(false)
  }

  return (
    <section className={styles.create_post}>
      <div className={styles.create_post_container}>
        <h2>Create Post</h2>
        {error && <p>{error}</p>}
        <form className={styles.create_post_form} onSubmit={createPost} >
          <input type='text' placeholder='Title' value={title} onChange={(e)=> setTitle(e.target.value)} autoFocus />
          <select name='category' value={category} onChange={(e)=> setCategory(e.target.value)}>
              {
                POST_CATEGORIES.map(category => <option value={category.toLowerCase()} key={category}>{category}</option>)
              }
          </select>

          <ReactQuill theme="snow"   value={description} onChange={setDescription}  className={styles.ql_editor} />;
          <input type="file"  onChange={(e)=> setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' />
          <button type='submit' className={styles.cratePostbtn}>{isLoading && <ClipLoader  color="#36d7b7" size={24} />}CREATE</button>

        </form>

      </div>

    </section>
  )
}


export default CreatePost