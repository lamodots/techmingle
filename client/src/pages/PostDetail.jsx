import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom';
import styles from './postdetails.module.css';
import thumbnail from '../assets/thumb1.jpg'

function PostDetail() {
  return (
    <section className={styles.details_wrapper}>
      <div className={styles.details_page_container}>
          
      {/* start */}

      <div className={styles.post_detail_container}>
        <div className={styles.post_details_header}>
          <PostAuthor />
          <div className={styles.post_details_action}>
            <Link to={`/posts/sssssnj89u9/edit`} >Edit</Link>
            <Link to={`/posts/sssssnj89u9/delete`}>Delete</Link>
          </div>
          
        </div>
        <h1>Similique, dolorum mollitia. Ex molestiae voluptatibus explicabo </h1>
        <div className={styles.post_details_thumnail}>
          <img src={thumbnail} alt='' />
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolorum mollitia. Ex molestiae voluptatibus explicabo saepe porro aperiam molestias quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam consectetur ullam enim dolorem aliquam sint, corporis cum necessitatibus modi, quisquam iusto repellendus a, non repellat cumque dolore laboriosam distinctio facere. Doloremque, est. Accusantium nesciunt quis eos error quod repellat, blanditiis odio suscipit consectetur, exercitationem nam consequuntur. Harum, temporibus aperiam voluptatibus iste ducimus nesciunt officiis veniam voluptates maiores doloremque eum, minus repellendus recusandae libero repudiandae placeat at unde aliquam adipisci neque qui repellat. Obcaecati porro, voluptatum suscipit eveniet quas ex alias.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolorum mollitia. Ex molestiae voluptatibus explicabo saepe porro aperiam molestias quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam consectetur ullam enim dolorem aliquam sint, corporis cum necessitatibus modi, quisquam iusto repellendus a, non repellat cumque dolore laboriosam distinctio facere. Doloremque, est. Accusantium nesciunt quis eos error quod repellat, blanditiis odio suscipit consectetur, exercitationem nam consequuntur. Harum, temporibus aperiam voluptatibus iste ducimus nesciunt officiis veniam voluptates maiores doloremque eum, minus repellendus recusandae libero repudiandae placeat at unde aliquam adipisci neque qui repellat. Obcaecati porro, voluptatum suscipit eveniet quas ex alias.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolorum mollitia. Ex molestiae voluptatibus explicabo saepe porro aperiam molestias quidem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam consectetur ullam enim dolorem aliquam sint, corporis cum necessitatibus modi, quisquam iusto repellendus a, non repellat cumque dolore laboriosam distinctio facere. Doloremque, est. Accusantium nesciunt quis eos error quod repellat, blanditiis odio suscipit consectetur, exercitationem nam consequuntur. Harum, temporibus aperiam voluptatibus iste ducimus nesciunt officiis veniam voluptates maiores doloremque eum, minus repellendus recusandae libero repudiandae placeat at unde aliquam adipisci neque qui repellat. Obcaecati porro, voluptatum suscipit eveniet quas ex alias.</p>
      </div>
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
          <Link to="/posts/categories/education">Weather</Link>
          <Link to="/posts/categories/business">Uncategorized</Link>
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