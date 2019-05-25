import { Link } from 'gatsby'
import React from 'react'
import './style.scss'

const Footer = ({ author, title }) => (
  <div className="footer fixed-bottom">
    <div className="container text-center">
      <p>&copy; 2018 {title}</p>
    </div>
  </div>
)

export default Footer
