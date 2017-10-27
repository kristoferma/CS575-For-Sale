import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
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

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { title: 'Welcome to React' }
  }

  componentWillMount() {
    var starCountRef = database.ref('title/')
    starCountRef.on('value', snapshot => {
      this.setState({ title: snapshot.val() })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.title}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
