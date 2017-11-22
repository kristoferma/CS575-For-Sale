import React, { Component } from 'react'

import firebase from 'firebase'

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
    this.state = {}
  }
  componentWillMount() {
    database
      .ref('games/' + this.props.match.params.gameID)
      .on('value', snapshot => {
        this.setState(snapshot.val())
      })
  }
  render() {
    return <pre>{JSON.stringify(this.state, null, 2)}</pre>
  }
}
