import React, { Component } from 'react'

import coin from '../img/coin.png'

import './../App.css'

export default class Player extends Component {
  render() {
    return (
      <div class="player_card">
        <p class="player_name_header">
          <b>{this.props.userID}</b>
        </p>

        <div class="coin_box">
          <img class="pixel_img coin" src={coin} alt="Coin" />
          <p class="coin_font">
            <b>x</b>
            {this.props.money}
          </p>
        </div>
      </div>
    )
  }
}
