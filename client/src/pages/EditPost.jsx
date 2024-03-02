import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import styles from './createpost.module.css'

import { UserContext } from '../context/userContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import HashLoader from 'react-spinners/HashLoader'

const override = {
  display: "block",
  margin: "0 auto",
 
};

function EditPost() {
  const [title, setTitle] =  useState('')
  const [category, setCategory] =  useState('Uncategorized')
  const [description, setDescription] =  useState('')
  const [thumbnail, setThumbnail] =  useState('')
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
const {id} = useParams();
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



useEffect(()=>{
  setIsLoading(true)
const getPost = async()=>{

  try {
    const response =  await axios.get(`http://localhost:5000/api/posts/${id}`)
    setTitle(response.data.title);
    setDescription(response.data.description)
  } catch (error) {
    console.log(error)
  }
  setIsLoading(false)
}
  
getPost()

}, [id])

if(isLoading){
  return <HashLoader color='#ff3333' cssOverride={override} />
}


// Handle Submit edit
const editPost = async (e) => {
  e.preventDefault();
  const postData = new FormData();
  postData.set('title', title)
  postData.set('category', category)
  postData.set('description', description)
  postData.set('thumbnail', thumbnail)

  try {
    setIsLoading(true)
    const response = await axios.patch(`http://localhost:5000/api/posts/${id}`, postData, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`}
     
    })

    if(response.status == 200){
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
        <h2>Edit Post</h2>
        {error && <p>{error}</p>}
        <form className={styles.create_post_form} onSubmit={editPost} >
          <input type='text' placeholder='Title' value={title} onChange={(e)=> setTitle(e.target.value)} autoFocus />
          <select name='category' value={category} onChange={(e)=> setCategory(e.target.value)}>
              {
                POST_CATEGORIES.map(category => <option value={category.toLowerCase()} key={category}>{category}</option>)
              }
          </select>

          <ReactQuill theme="snow"   value={description} onChange={setDescription}  className={styles.ql_editor} />;
          <input type="file"  onChange={(e)=> setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' />
          <button type='submit' className={styles.cratePostbtn}>{isLoading && <ClipLoader  color="#36d7b7" size={24} />}EDIT POST</button>

        </form>

      </div>

    </section>
  )
}


export default EditPost