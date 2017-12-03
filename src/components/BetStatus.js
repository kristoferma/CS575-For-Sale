import React, { Component } from 'react'

import bid_img from '../img/bid.png'
import pass_img from '../img/pass.png'

import '../css/BetStatus.css'
import '../css/Common.css'

function BetAmountDisplay(props) {
  return (
    <div class="bet_box_info">
      <p> {props.betAmount} </p>
    </div>
  )
}

function BidState(props) {
  if (props.betAmount == 0 && props.playerHasPlayed == true) {
    return (
      <div class="bet_box">
        <img class="pixel_img" src={pass_img} alt="Nope" />
        <BetAmountDisplay betAmount="FOLD" />
      </div>
    ) //TODO not sure if betAmountDisplay here is redundant...
  } else if (props.betAmount > 0 && props.playerHasPlayed == true) {
    return (
      <div class="bet_box">
        <img class="pixel_img" src={bid_img} alt="Nope" />
        <BetAmountDisplay betAmount={'Bet:' + props.betAmount} />
      </div>
    )
  }

  return <div class="bet_box" />
}

export default class BetStatus extends Component {
  constructor(props) {
    super(props)
  }
  // TODO implement logic for displaying bid vs pass image
  // and determining where it best makes sense to place logic

  render() {
    return (
      <BidState
        betAmount={this.props.betAmount}
        playerHasPlayed={this.props.playerHasPlayed}
      />
    )
  }
}
