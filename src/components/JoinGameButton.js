import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class StartGameButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameID: ''
    }
  }
  handleInputChange(event) {
    console.log(this.state)
    this.setState({ gameID: event.target.value })
  }
  render() {
    return (
      <form>
        <label htmlFor="gameID">Game ID:</label>
        <input
          name="gameID"
          id="gameID"
          type="text"
          onChange={this.handleInputChange.bind(this)}
          value={this.state.gameID}
        />
        <Link to={'/game/' + this.state.gameID}>Game</Link>
      </form>
    )
  }
}
