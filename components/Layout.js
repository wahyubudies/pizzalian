import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
	<React.Fragment>
		<Navbar/>
		{children}
		<Footer/>
	</React.Fragment>
  )
}

export default Layout