import React, { Component } from 'react'

import Player from './Player'
import BetStatus from './BetStatus'

export default class PlayerContainer extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  handleBetClick(playerID) {
    return () =>
      fetch(
        `http://localhost:5000/cs575-for-sale/us-central1/phase1Play?gameID=${
          this.props.gameID
        }&playerID=${playerID - 1}&action=bet`
      )
  }

  handleFoldClick(playerID) {
    return () =>
      fetch(
        `http://localhost:5000/cs575-for-sale/us-central1/phase1Play?gameID=${
          this.props.gameID
        }&playerID=${playerID - 1}&action=fold`
      )
  }

  render() {
    return (
      <div className="flex-container">
        {this.props.players.map(player => (
          <div className="playerInformation">
            <Player userID={player.userID} money={player.money} />
            <BetStatus
              betAmount={player.betAmount}
              playerHasPlayed={player.playerHasPlayed}
            />
            <div
              className="flex-container"
              style={{ justifyContent: 'center' }}
              n
            >
              <input
                type="button"
                onClick={this.handleBetClick(player.playerNumber).bind(this)}
                value="Bet"
              />
              <input
                type="button"
                onClick={this.handleFoldClick(player.playerNumber).bind(this)}
                value="Fold"
              />
            </div>
          </div>
        ))}
      </div>
    )
  }
}
