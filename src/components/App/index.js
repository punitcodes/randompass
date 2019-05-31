import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import randomize from 'randomatic'
import tippy from 'tippy.js'
import copy from 'copy-to-clipboard'
import axios from 'axios'

import './style.scss'

let checkBoxArray = ['A', 'a'] // Comment: This is the default checkbox array

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      passPattern: 'aA',
      passLength: 12,
      valueInPassInput: undefined, // Comment: Intitally value in password leghth field should be undefined or ''
      uppercaseCheckBox: true,
      lowercaseCheckBox: true,
      numbersCheckBox: false,
      symbolsCheckBox: false,
    }

    this.handleClipboardClick = this.handleClipboardClick.bind(this)
    this.generateSecurePass = this.generateSecurePass.bind(this)
    this.generateUltraSecurePass = this.generateUltraSecurePass.bind(this)
    this.handleSharePasswordClick = this.handleSharePasswordClick.bind(this)
    this.handlePasswordLengthChange = this.handlePasswordLengthChange.bind(this)
    this.checkBoxChange = this.checkBoxChange.bind(this)
  }

  componentDidMount() {
    {
      /* Comment: In the next two lines, we import jquery and bootstarp so we can use bootstarp collapse for advanced options selection  */
    }
    global.jQuery = global.$ = require('jquery')
    require('bootstrap')

    {
      /* Comment: On page load, initial password is set from here */
    }
    this.setState({
      randomPass: randomize(this.state.passPattern, this.state.passLength),
    })

    {
      /* 
        Comment: Shows toolip on hover clipboard icon.
        TODO: Try Popper.js, Tippy.js or bootstrap inbuilt tooltip
    */
    }
    tippy('#clipboard-icon', {
      content: 'Copy to clipboard',
      placement: 'right',
    })
  }

  handleClipboardClick() {
    copy(this.state.randomPass)
  }

  // Comment: Functions thats will be called on button clicks: Secure & Ultra Secure
  generateSecurePass() {
    this.setState({
      passPattern: 'aA',
      passLength: 12,
      valueInPassInput: 12,
      uppercaseCheckBox: true,
      lowercaseCheckBox: true,
      numbersCheckBox: false,
      symbolsCheckBox: false,
      randomPass: randomize('aA', 12),
    })
    checkBoxArray = ['A', 'a']
  }

  generateUltraSecurePass() {
    this.setState({
      passPattern: '*',
      passLength: 16,
      valueInPassInput: 16,
      uppercaseCheckBox: true,
      lowercaseCheckBox: true,
      numbersCheckBox: true,
      symbolsCheckBox: true,
      randomPass: randomize('*', 16),
    })
    checkBoxArray = ['A', 'a', '0', '!']
  }

  //  Comment: Functions that will be called on selecting advanced options
  handleSharePasswordClick() {
    axios
      .post('https://file.io', `text=${this.state.randomPass}`)
      .then(response => {
        this.setState({ randomPass: response.data.link })
      })
      .catch(e => {
        this.setState({
          // Comment: If there is an error then show that user is offline because this wiil be cause of error in most of the cases
          randomPass:
            "You're offline. Please enable your internet connection and try again",
        })
        console.error(e)
      })
  }

  handlePasswordLengthChange(event) {
    // Commnet: Changes Password only if input input password value between 1 to 99
    if (0 < event.target.value && event.target.value < 100) {
      this.setState({
        passLength: event.target.value,
        randomPass: randomize(this.state.passPattern, event.target.value),
        valueInPassInput: event.target.value,
      })
    } else this.setState({ valueInPassInput: undefined })
  }

  checkBoxChange(event) {
    const idFromEvent = event.target.id
    // Comment: Atleast one checkbox should be checked
    if (checkBoxArray.length !== 1 || this.state[idFromEvent] === false) {
      this.setState(prevState => ({ [idFromEvent]: !prevState[idFromEvent] }))

      // Comment: Checks if checkbox is checked or not
      if (event.target.checked === true) {
        // Comment: Checks if pattern is already present in array. If not present then push, if present then skip
        if (checkBoxArray.includes(event.target.pattern) === false)
          checkBoxArray.push(event.target.pattern)
      } else {
        // Comment: On uncheck remove pattern from array
        const index = checkBoxArray.indexOf(event.target.pattern)
        if (index > -1) checkBoxArray.splice(index, 1)
      }

      const patternFromCheckBox = checkBoxArray.join('')

      this.setState({
        passPattern: patternFromCheckBox,
        randomPass: randomize(patternFromCheckBox, this.state.passLength),
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center" id="generatedPassword">
            <h2>{this.state.randomPass}</h2>
            <FontAwesomeIcon
              icon={faClipboard}
              size="2x"
              color="gray"
              id="clipboard-icon"
              onClick={this.handleClipboardClick}
            />
          </div>
        </div>
        <div className="row">
          <div className="col text-center" id="option-buttons">
            <button
              className="btn btn-outline-primary position-button"
              onClick={this.generateSecurePass}
            >
              Secure
            </button>
            <button
              id="ultra-secure"
              onClick={this.generateUltraSecurePass}
              className="btn btn-outline-primary position-button"
            >
              Ultra Secure
            </button>
            <button
              className="btn btn-outline-primary position-button"
              type="button"
              data-toggle="collapse"
              data-target="#advancedCollapse"
              aria-expanded="false"
              aria-controls="advancedCollapse"
            >
              Advanced Options
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="collapse" id="advancedCollapse">
              <div className="card card-body">
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-outline-primary"
                      id="sharebutton"
                      onClick={this.handleSharePasswordClick}
                    >
                      Share Password
                    </button>
                  </div>
                  <div className="col">
                    {/* TODO: Change border color of input based on length value. Green if more than 16, Yellow if in between 12 and 16 and red if less than 12 */}
                    <input
                      type="text"
                      id="passlengthinput"
                      placeholder="Password Length"
                      maxLength="2"
                      value={this.state.valueInPassInput}
                      onChange={this.handlePasswordLengthChange}
                    />
                  </div>
                </div>
                <br />
                <h5>Customize your password:</h5>
                <div className="row justify-content-md-center">
                  <div className="col">
                    <input
                      type="checkbox"
                      id="uppercaseCheckBox"
                      pattern="A"
                      checked={this.state.uppercaseCheckBox}
                      onChange={this.checkBoxChange}
                    />{' '}
                    Uppercase
                  </div>
                  <div className="col">
                    <input
                      type="checkbox"
                      id="lowercaseCheckBox"
                      pattern="a"
                      checked={this.state.lowercaseCheckBox}
                      onChange={this.checkBoxChange}
                    />{' '}
                    Lowercase
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      type="checkbox"
                      id="numbersCheckBox"
                      pattern="0"
                      checked={this.state.numbersCheckBox}
                      onChange={this.checkBoxChange}
                    />{' '}
                    Numbers
                  </div>
                  <div className="col">
                    <input
                      type="checkbox"
                      id="symbolsCheckBox"
                      pattern="!"
                      checked={this.state.symbolsCheckBox}
                      onChange={this.checkBoxChange}
                    />{' '}
                    Symbols
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
