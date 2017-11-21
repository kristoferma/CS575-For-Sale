import React, { Component } from 'react'
import logo from './../logo.svg'
import './../App.css'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = { title: 'FOR SALE' }
  }

  render() {
    return (
      <header className="App-header">
        <h1 className="App-title">{this.state.title}</h1>
      </header>
    )
  }
}

export default Header
