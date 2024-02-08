import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function Header() {
  return (
   
<header>
<nav className={styles.nav}>
      <div className={styles.nav_logo}>
        <Link to="/" ><span>Tech</span> <span>Mingle</span></Link>
      </div>
      <div className={styles.nav_menu}>
        <ul>
          <li><Link to="/user-profile/jjjiojiojoij">Lamodot Joe</Link></li>
          <li><Link to="/create-post">Create Post</Link></li>
          <li><Link to="/authors">Authors</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
      <button className={styles.toggle_Icon}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  
      </svg>

      </button>
      
    </nav>
    <div className={styles.categories}>
      <span>Categories </span>
    <Splide 
    options={ {
      rewind: true,
      width : '100%',
      arrows:false,
      pagination:false,
      gap   : '1rem',
      perPage: 5,
      perMove:2,
      breakpoints: {
        800: {
          perPage: 4,
           gap   : '1rem',
        },
        480: {
          perPage: 3,
           gap   : '1rem',
        },
      },
      
    }
    
  }
   className={styles.categories_list}
    >
        <SplideSlide>
           <Link to="/posts/categories/agriculture">Agriculture</Link>
        </SplideSlide>
        <SplideSlide>
           <Link to="/posts/categories/business">Business</Link>
        </SplideSlide>
        <SplideSlide>
          <Link to="/posts/categories/education">Education</Link>
        </SplideSlide>
        <SplideSlide>
           <Link to="/posts/categories/entertainment">Entertainment</Link>
        </SplideSlide>
        <SplideSlide>
           <Link to="/posts/categories/art">Art</Link>
        </SplideSlide>
        <SplideSlide>
          <Link to="/posts/categories/investment">Investment</Link>
        </SplideSlide>
        <SplideSlide>
           <Link to="/posts/categories/business">Uncategorized</Link>
        </SplideSlide>
        <SplideSlide>
          <Link to="/posts/categories/education">Weather</Link>
        </SplideSlide>
    </Splide>
    </div>
    
</header>
  )
}

export default Header