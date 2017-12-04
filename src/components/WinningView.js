import React, { Component } from 'react'

import firebase from 'firebase'



export default class WinningView extends Component {

render(){


    if (this.props.players.length == 0 || !this.props.players[0].moneyGained) 
    	return null
    const totalScores = this.props.players.map(player => player.moneyGained.reduce((a,b) => (a+b), 0)+ player.money)
    const winningScore = Math.max.apply(null, totalScores)
    const winnerID = totalScores.indexOf(winningScore)
    const everyoneResult = totalScores.map((score,index) => ({
    					points: score,
      					player: index
    }))
    .sort((obj1,obj2) => obj1.points < obj2.points)
  	
	return(
		<div className = "winner_screen">
			<div className = "winner">
				<p >WINNER</p>
				<p id = "winner_name">{this.props.players[winnerID].userID}</p>
				<p id = "winner_score">{winningScore}</p>
            </div>
			<div className ="remaining_players">
          			{everyoneResult.map((result) => (
          	    	<div className = "each_player">
                		<p className = "winner_name">{this.props.players[result.player].userID}</p>
                		<p className = "winning_score">{result.points}</p>
                	</div>
              		))}
        	</div>
    	</div>
		)
}
}

