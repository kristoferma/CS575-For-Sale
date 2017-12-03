import React, {
  Component
} from 'react'

import Player from './Player'
import BetStatus from './BetStatus'

import '../css/PlayerContainer.css'

export default class PlayerContainer extends Component {



  constructor(props) {
    super(props)
  }

  render(){
    var elements = [];


    for(var i = 0; i < this.props.numberOfPlayers; i++)
    {

        elements.push(
          <div>
            <Player userID={this.props.players[i].userID} money={this.props.players[i].money}/>
            <BetStatus betAmount={this.props.players[i].betAmount} playerHasPlayed={this.props.players[i].playerHasPlayed}/>
          </div>
        )

    }
      return (
        <div class="flex-container">
         {elements}
        </div>
        );
      }
    }
