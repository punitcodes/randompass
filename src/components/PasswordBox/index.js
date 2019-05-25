{
  /* TODO: Test out Tippy.js and Popper.js */
}

import React from 'react'
import Helmet from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import tippy from 'tippy.js'
import copy from 'copy-to-clipboard'

import './style.scss'

import randomize from 'randomatic'

class PasswordBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      randompass: randomize('aA', 12),
      tooltiptext: 'Copy to clipboard',
    }
    this.clipboardClick = this.clipboardClick.bind(this)
    this.generateSecurePass = this.generateSecurePass.bind(this)
    this.generateUltraSecurePass = this.generateUltraSecurePass.bind(this)
    this.advancedOptions = this.advancedOptions.bind(this)
  }

  componentDidMount() {
    tippy('#clipboard-icon', {
      content: this.state.tooltiptext,
      placement: 'right',
    })
  }

  clipboardClick() {
    copy(this.state.randompass)
  }

  generateSecurePass() {
    this.setState({ randompass: randomize('aA', 12) })
  }

  generateUltraSecurePass() {
    this.setState({ randompass: randomize('*', 16) })
  }

  advancedOptions() {
    this.setState({ randompass: 'Coming Soon!' })
  }

  render() {
    const primary = this.props
    return (
      <div className="container">
        <Helmet>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" />
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" />
        </Helmet>
        <div className="row">
          <div className="col text-center">
            <h2>{this.state.randompass}</h2>
            <FontAwesomeIcon
              icon={faClipboard}
              size="2x"
              color="gray"
              id="clipboard-icon"
              onClick={this.clipboardClick}
            />
          </div>
        </div>
        <div className="row">
          <div className="col text-center" id="option-buttons">
            <button
              className="btn btn-outline-primary"
              onClick={this.generateSecurePass}
            >
              Secure
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={this.generateUltraSecurePass}
            >
              Ultra Secure
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={this.advancedOptions}
            >
              Advanced Options
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordBox
