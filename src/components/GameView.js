import React, { Component } from 'react'

import firebase from 'firebase'

import PlayerContainer from './PlayerContainer'
import PropertyCard from './PropertyCard'
import MoneyCard from './MoneyCard'

import '../css/GameView.css'

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
      cardsInPlay: []
    }
  }

  componentWillMount() {
    database
      .ref('games/' + this.props.match.params.gameID)
      .on('value', snapshot => {
        this.setState(snapshot.val())
      })
  }

  render() {
    //return (<pre>{JSON.stringify(this.state, null, 2)}</pre>);

    var elements = []
    var playerCards = []

    this.state.cardsInPlay.forEach(card => {
      elements.push(
        this.state.phase1 ? (
          <PropertyCard property={card} />
        ) : (
          <MoneyCard money={card} />
        )
      )
    })

    return (
      <div className="game_board">
        <PlayerContainer players={this.state.players} />
        <div className="round_view">
          {elements}
          <div className="deck">
            <div className="innerDeck" />
          </div>
        </div>
        <div className="players_card">
          {this.state.players.length !== 0 && this.state.players[0].hand
            ? this.state.players[0].hand.map(card => (
                <PropertyCard property={card} />
              ))
            : null}
        </div>
      </div>
    )
  }
}
