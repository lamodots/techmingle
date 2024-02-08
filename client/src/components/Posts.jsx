import React, { useState } from 'react'
import thumb1 from '../assets/thumb1.jpg'
import PostItem from './PostItem'
import styles from './posts.module.css';

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

function Posts() {
    const [error, setError] = useState("")
    const [posts , setPosts]= useState(DUMMPY_POST)
 
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