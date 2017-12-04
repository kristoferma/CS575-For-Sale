import React, { Component } from 'react'
import './../App.css'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'FOR SALE',
      userID: localStorage.getItem('userID'),
      gameID: localStorage.getItem('gameID')
    }
  }

  render() {
    return (
      <header className="App-header">
        <a href={`../game/${this.state.gameID}`}>
          {'Game ID: '}
          <span>{this.state.gameID}</span>
        </a>
        <a className="title" href="../">
          <h1 className="App-title">{this.state.title}</h1>
        </a>
        <span>{'Current Player Name: ' + this.state.userID}</span>
      </header>
    )
  }
}

export default Header
