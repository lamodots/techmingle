import React from 'react';
import  styles from './Footer.module.css'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer_copyright}>
        <small>All RightS Reserved &copy; Copyright, Tech Mingle  {year }</small>
    </footer>
  )
}

export default Footer