import React, { Component } from 'react'

import firebase from 'firebase'

import PlayerContainer from './PlayerContainer'
import PropertyCard from './PropertyCard'

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

function Phase1(props){
  return(
    <div className="game_board">
      <PlayerContainer players={props.players}/>
      <div className="round_view">
        {props.elements}
        <div className="deck">
          <div className="innerDeck" />
        </div>
      </div>
    </div>
  );
}

function Phase2(props){ //TODO implement phase2 money cards
  return(
    <div className="game_board">
      <PlayerContainer players={props.players}/>
    </div>
  );
}

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
    //return <pre>{JSON.stringify(this.state, null, 2)}</pre>

    var elements = []

    this.state.cardsInPlay.forEach(card => {
      elements.push(<PropertyCard property={card} />)
    })

    if(this.state.phase1)
    {
      return(<Phase1 elements={elements} players={this.state.players} />)
    }
    else {
      return(<Phase2 elements={elements} players={this.state.players} />)
    }
  }
}
