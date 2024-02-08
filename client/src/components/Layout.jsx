import React from 'react'
import Header from './Header'
import Footer from './Footer/Footer'
import {Outlet} from 'react-router-dom'
import styles from './Layout.module.css'

function Layout() {
  return (
    <>
        <Header />
          <main className={styles.main}>
             <Outlet />
          </main>
        <Footer/>
    </>
  )
}

export default Layout