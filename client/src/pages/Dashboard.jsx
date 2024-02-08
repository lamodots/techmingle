import React, { useState } from 'react';
import thumb1 from '../assets/thumb1.jpg'
import styles from './dashboard.module.css'
import { Link } from 'react-router-dom';

const DUMMPY_POST = [
  {
      id:1,
      thumbnail: thumb1,
      category: 'education',
      title:'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      description: 'lorem lorem lorm lorem loej leoem leoe In version 9 thumbs.swiper parameter also accepts CSS Selector of the thumbs swiper. So to make both with Swiper elements we can use the following:',
      authorId: 3
  },
  {
      id:2,
      thumbnail: thumb1,
      category: 'art',
      title:' There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don"t look even slightly believable.',
      description: 'lorem lorem lorm lorem loej leoem leoe In version 9 thumbs.swiper parameter also accepts CSS Selector of the thumbs swiper. So to make both with Swiper elements we can use the following:',
      authorId: 3
  },
  {
      id:3,
      thumbnail: thumb1,
      category: 'entertainment',
      title:' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      description:  ' In version 9 thumbs.swiper parameter also accepts CSS Selector of the thumbs swiper. So to make both with Swiper elements we can use the following: lorem lorem lorm lorem loej leoem leoe',
      authorId: 3
  },
  {
      id:4,
      thumbnail: thumb1,
      category: 'weather',
      title:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
      description: ' In version 9 thumbs.swiper parameter also accepts CSS Selector of the thumbs swiper. So to make both with Swiper elements we can use the following: lorem lorem lorm lorem loej leoem leoe',
      authorId: 3
  }
]
function Dashboard() {
  const [posts, setPost] = useState(DUMMPY_POST)
  return (
    <section className={styles.dashboard}>
      {
        posts.length ? 
        <div className={styles.dashboard_container}>
          {
            posts.map( post => {
              return(
                <article key={post.id} className={styles.dashboard_post}>
                  <div className={styles.dasboard_post_info}>
                    <div className={styles.dashboard_post_thumbnail}>
                      <img src={post.thumbnail}/>
                    </div>
                    <h5>{post.title}</h5>
                  </div>
                  <div className={styles.dashboard_post_actions}>
                    <Link to={`/posts/${post.id}`}>View</Link>
                    <Link to={`/posts/${post.id}/edit`}>Edit</Link>
                    <Link to={`/posts/${post.id}/delete`}>Delete</Link>
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