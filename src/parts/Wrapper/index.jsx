import React from 'react'
import './styles.css'
import Header from '../header/index.jsx'
import Footer from '../footer/index.jsx'

const Wrapper = ({children}) => {
  return (
    <div id="wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Wrapper