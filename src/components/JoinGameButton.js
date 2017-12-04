import React, { Component } from 'react'

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
      `http://localhost:5000/cs575-for-sale/us-central1/joinGame/?userID=${
        this.state.userID
      }&gameID=${this.state.gameID}`
    )
      .then(
        response =>
          response.status === 200
            ? Promise.resolve(response.text())
            : Promise.reject(response.text())
      )
      .then(playerNumber => {
        if (playerNumber) {
          window.localStorage.setItem('userID', this.state.userID)
          window.localStorage.setItem('playerIndex', playerNumber)
          window.localStorage.setItem('gameID', this.state.gameID)
          window.location = '/game/' + this.state.gameID
        } else {
          this.setState({ error: 'Could not create new game' })
        }
      })
      .catch(errorPromise => {
        errorPromise.then(error => this.setState({ error }))
      })
  }
  render() {
    return (
      <form>
        <div className="div-default">
          <label htmlFor="userID">User ID:</label>
          <input
            name="userID"
            id="userID"
            type="text"
            className="my-input"
            onChange={this.handleInputChange.bind(this)}
            value={this.state.userID}
          />

          <label htmlFor="gameID">Game ID:</label>
          <input
            name="gameID"
            id="gameID"
            type="text"
            className="my-input"
            onChange={this.handleInputChange.bind(this)}
            value={this.state.gameID}
          />

          <button
            onClick={this.handleClick.bind(this)}
            disabled={
              this.state.userID.length === 0 ||
              this.state.playerCount < 3 ||
              this.state.playerCount > 6
            }
            className="btn btn-primary"
          >
            Join Game
          </button>
          <p>{this.state.error}</p>
        </div>
      </form>
    )
  }
}
