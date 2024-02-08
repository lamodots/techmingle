import React from 'react'
// import pageErrorImage from '../assets/pagenotfound.webp';
import {Link} from 'react-router-dom'
import styles from './Error.module.css'

function ErrorPage() {
  return (
    <section className={styles.error_page}>

      <div className={styles.content}>
        {/* <img src={pageErrorImage}/> */}
        <Link to="/" className={styles.button_solid_default} >Go back Home</Link>
        <h2>Page not found</h2>
      </div>
    </section>
  )
}

export default ErrorPage