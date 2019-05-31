import React from 'react'
import { Link } from 'gatsby'

class Navi extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <div className="container">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="text-center navbar-brand" to="/">
                {title}
              </Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="https://paypal.me/punit2502">Buy Me a Coffee</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navi
