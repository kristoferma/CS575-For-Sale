import React, { Component } from 'react'

import firebase from 'firebase'

import PlayerContainer from './PlayerContainer'
import PropertyCard from './PropertyCard'
import MoneyCard from './MoneyCard'
import WinningView from './WinningView'

import './../App.css'

const PLAYER = localStorage.getItem('playerIndex') || 0

var config = {
  apiKey: 'AIzaSyDjC1dJFrFpBTiXlCGbMR4YY48RtfOTZV8',
  authDomain: 'cs575-for-sale.firebaseapp.com',
  databaseURL: 'https://cs575-for-sale.firebaseio.com',
  projectId: 'cs575-for-sale',
  storageBucket: 'cs575-for-sale.appspot.com',
  messagingSenderId: '397055662302'
}

firebase.initializeApp(config)
const database = firebase.database()

export default class GameView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfPlayers: 0,
      players: [],
      cardsInPlay: [],
      phase1: [],
      phase2: []
    }
  }

  componentWillMount() {
    database
      .ref('games/' + this.props.match.params.gameID)
      .on('value', snapshot => {
        const game = snapshot.val()
        game.players.forEach((player, index) => {
          if (!player.hand) game.players[index].hand = []
        })
        if (!game.phase1) game.phase1 = []
        if (!game.phase2) game.phase2 = []
        this.setState(game)
      })
  }

  phase2ClickHandler(card) {
    return () =>
      fetch(
        `http://localhost:5000/cs575-for-sale/us-central1/phase2Play?gameID=${
          this.props.match.params.gameID
        }&playerID=${PLAYER}&action=${card}`
      )
  }

  render() {
    //return (<pre>{JSON.stringify(this.state, null, 2)}</pre>);
    if (this.state.phase1.length == 0 && this.state.phase2.length == 0)
      return <WinningView players={this.state.players} />
    return (
      <div className="game_board">
        <PlayerContainer
          gameID={this.props.match.params.gameID}
          numberOfTurn={this.state.numberOfTurn}
          currentPlayerTurn={this.state.currentPlayerTurn}
          players={this.state.players}
          phase1={this.state.phase1}
          phase2={this.state.phase2}
        />
        <div className="round_view">
          {this.state.cardsInPlay.length !== 0
            ? this.state.cardsInPlay.map(
                card =>
                  this.state.phase2.length === 30 ? (
                    <PropertyCard property={card} />
                  ) : (
                    <MoneyCard money={card} />
                  )
              )
            : null}
          <div className="deck">
            <div className="innerDeck" />
          </div>
        </div>
        <div className="players_card">
          {this.state.players.length !== 0 && this.state.players[PLAYER].hand
            ? this.state.players[PLAYER].hand
                .sort((a, b) => a > b)
                .map(card => (
                  <PropertyCard
                    property={card}
                    clickHandler={this.phase2ClickHandler(card)}
                  />
                ))
            : null}
        </div>
      </div>
    )
  }
}
