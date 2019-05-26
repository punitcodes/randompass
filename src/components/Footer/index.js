import React from 'react'
import './style.scss'

const Footer = ({ title }) => (
  <div className="footer">
    <div className="container text-center">
      <p>&copy; 2018 {title}</p>
    </div>
  </div>
)

export default Footer
