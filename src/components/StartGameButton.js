import React, { Component } from 'react'

export default class StartGameButton extends Component {
  constructor(props) {
    super(props)
    this.state = { userId: '', playerCount: 3 }
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(nextState)
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleClick(event) {
    event.preventDefault()
    fetch(
      `http://localhost:5000/cs575-for-sale/us-central1/createNewGame/?userId=${this
        .state.userId}&playerCount=${this.state.playerCount}`
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
        <label htmlFor="userId">User ID:</label>
        <input
          name="userId"
          id="userId"
          type="text"
          onChange={this.handleInputChange.bind(this)}
          value={this.state.userId}
        />
        <label htmlFor="playerCount">Players:</label>
        <input
          name="playerCount"
          id="playerCount"
          type="number"
          step="1"
          min="3"
          max="6"
          onChange={this.handleInputChange.bind(this)}
          value={this.state.playerCount}
        />
        <button
          onClick={this.handleClick.bind(this)}
          disabled={
            this.state.userId.length === 0 || this.state.playerCount < 3
          }
        >
          Start New Game
        </button>
        <p>{this.state.error}</p>
      </form>
    )
  }
}
