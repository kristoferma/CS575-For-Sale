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
        {this.props.phase1.length === 0 && this.props.players[0].moneyGained
          ? this.props.players.map(player => (
              <div className="playerInformation">
                <Player
                  userID={player.userID}
                  money={
                    player.moneyGained.reduce((a, b) => a + b, 0) + player.money
                  }
                />
                <BetStatus
                  betAmount={player.betAmount}
                  playerHasPlayed={player.playerHasPlayed}
                />
              </div>
            ))
          : this.props.players.map(player => (
              <div className="playerInformation">
                <Player
                  userID={player.userID}
                  money={player.money}
                  isCurrentPlayer={
                    this.props.currentPlayerTurn === player.playerNumber - 1
                  }
                />
                <BetStatus
                  betAmount={player.betAmount}
                  playerHasPlayed={player.playerHasPlayed}
                />
                {this.props.phase2.length === 30 &&
                this.props.numberOfTurn > 0 ? (
                  <div className="bet_fold_buttons">
                    <input
                      type="button"
                      onClick={this.handleBetClick(player.playerNumber).bind(
                        this
                      )}
                      value="Bet"
                      id="bet_button"
                      className="btn btn-success"
                    />
                    <input
                      type="button"
                      onClick={this.handleFoldClick(player.playerNumber).bind(
                        this
                      )}
                      value="Fold"
                      className="btn btn-danger"
                      id="fold_button"
                    />
                  </div>
                ) : null}
              </div>
            ))}
      </div>
    )
  }
}
