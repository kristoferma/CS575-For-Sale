import React, { Component } from 'react'
import StartGameButton from './StartGameButton'
import JoinGameButton from './JoinGameButton'

class MainMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <StartGameButton />
        <JoinGameButton />
      </div>
    )
  }
}

export default MainMenu
