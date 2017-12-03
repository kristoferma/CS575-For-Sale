import React, { Component } from 'react'

import Player from './Player'
import BetStatus from './BetStatus'

export default class PlayerContainer extends Component {
  render() {
    var elements = []

    this.props.players.forEach((player)=>{
      elements.push(
        <div className="playerInformation">
          <Player
            userID={player.userID}
            money={player.money}
          />
          <BetStatus
            betAmount={player.betAmount}
            playerHasPlayed={player.playerHasPlayed}
          />
        </div>
      )
    });
    return <div className="flex-container">{elements}</div>
  }
}
