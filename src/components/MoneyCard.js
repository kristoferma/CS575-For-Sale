import React, { Component } from 'react'

import '../css/Card.css'
import '../css/Common.css'

const MoneyImage = ({ money }) => {
if (typeof money !== 'number' || money < 0) money = 'err'
  return (
    <div className={`no_margin_padding card_base card_money money_decoration `}>
    <p className = "sign_one">{money}</p>
    <p className = "dollar_sign">$</p>
    <p className = "sign_two">{money}</p>
    </div>)
 }

export default class MoneyCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <MoneyImage money={this.props.money} />
  }
}
