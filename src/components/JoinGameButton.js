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
    this.setState({ gameID: event.target.value })
  }
  render() {
    return (
      <form>
        <div className = "div-default">
        <label htmlFor="gameID">Game ID:&nbsp;&nbsp;&nbsp;</label>
        <input
          name="gameID"
          id="gameID" 
          type="text"
          className = "my-input"
          onChange={this.handleInputChange.bind(this)}
          value={this.state.gameID}
        />
        <br/><br/>
        <Link to={'/game/' + this.state.gameID}>Join Game</Link>
      </div>
      </form>
    )
  }
}
