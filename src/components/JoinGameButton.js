import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class StartGameButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userID: '',
      gameID: ''
    }
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleClick(event) {
    event.preventDefault()
    fetch(
      `http://localhost:5000/cs575-for-sale/us-central1/joinGame/?userID=${this
        .state.userID}&gameID=${this.state.gameID}`
    )
      .then(response => response.text())
      .then(gameID => {
        if (gameID) {
          window.location = '/game/' + gameID
        } else {
          this.setState({ error: 'Could not create new game' })
        }
      })
  }
  render() {
    return (
      <form>
        <div className = "div-default">
        <label htmlFor="gameID">Game ID:&nbsp;&nbsp;&nbsp;</label>
        <input
          name="userID"
          id="userID"
          className = "my-input"
          type="text"
          onChange={this.handleInputChange.bind(this)}
          value={this.state.userID}
        />      
        <button
          onClick={this.handleClick.bind(this)}
          disabled={
            this.state.userID.length === 0 ||
            this.state.playerCount < 3 ||
            this.state.playerCount > 6
          }
        className ="btn btn-primary">
          Join Game
        </button>
      </div>
      </form>
    )
  }
}
