import React, { Component } from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header'
import MainMenu from './components/MainMenu'
import GameView from './components/GameView'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { title: 'Welcome to React' }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" component={MainMenu} />
          <Route exact path="/game/:gameID" component={GameView} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
