import React, { Component } from 'react'
import logo from './../logo.svg'
import './../App.css'
import firebase from 'firebase'

import { BrowserRouter, Route, Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = { title: 'Welcome to React' }
  }

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">{this.state.title}</h1>
      </header>
    )
  }
}

export default Header
