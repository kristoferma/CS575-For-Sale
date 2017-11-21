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
        .state.userId}&playerCount=${this.state.playerCount}`,
      { mode: 'cors' }
    ).then(data => {
      console.log(data)
      if (data.status === 200) console.log('could create game')
      else console.log('could not create game')
    })
  }
  render() {
    return (
      <form className = "App-StartGameButton">
      <div className = "div-default">
        <label htmlFor="userId">User ID:&nbsp;&nbsp;&nbsp;</label> 
        <input
          name="userId"
          id="userId"
          className = "my-input"
          type="text"
          onChange={this.handleInputChange.bind(this)}
          value={this.state.userId}
        />
        <br/>
        <label htmlFor="playerCount">Players:&nbsp;&nbsp;&nbsp;</label>
        <input
          name="playerCount"
          id="playerCount"
          className = "my-input"
          type="number"
          step="1"
          min="3"
          max="6"
          onChange={this.handleInputChange.bind(this)}
          value={this.state.playerCount}
        />
        <br/><br/>
        <button
          onClick={this.handleClick.bind(this)}
          disabled={
            this.state.userId.length === 0 || this.state.playerCount < 3
          }
        className ="btn btn-primary">
          Start New Game
        </button>
        </div>
        <br/><br/>
    
      </form>
    )
  }
}
