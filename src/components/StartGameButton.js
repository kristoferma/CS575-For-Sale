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
  handleClick() {
    fetch(
      `http://localhost:5000/cs575-for-sale/us-central1/createNewGame/userId=${this
        .state.userId}&playerCount=${this.state.playerCount}`
    )
  }
  render() {
    return (
      <form>
        <label htmlFor="userId">User ID:</label>
        <input
          name="userId"
          id="userId"
          type="number"
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
          onClick={this.handleClick}
          disabled={this.state.userId || this.state.playerCount}
        >
          Start New Game
        </button>
      </form>
    )
  }
}
