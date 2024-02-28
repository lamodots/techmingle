import React from 'react'
import {Link} from 'react-router-dom'
import PostAuthor from './PostAuthor'
import styles from './postItem.module.css'

function PostItem(props) {
   const { _id:id, category, title, description, creator:authorId, thumbnail, createdAt } = props
   const shortDescription = description.length > 120 ? description.substr(0, 120) + '...': description
   const postTitle = title.length > 30 ? description.substr(0, 30) + '...': title
  return (
    <article>
        <div className={styles.thumnail}>
            <img src={`http://localhost:5000/uploads/${thumbnail}`} />
        </div>
        <div className={styles.post_content}>
            <Link to={`/posts/${id}`}>
                <h3>{postTitle}</h3>
            </Link>
            <p>{shortDescription }</p>
            <div className={styles.post_meta}>
                <PostAuthor authorId={authorId} createdAt={createdAt} />
                <Link to={`/posts/categories/${category}`} className={styles.category}>{category}</Link>
            </div>
        </div>
    </article>
  )
}

export default PostItem