import React, {
  Component
} from 'react'

import coin from '../img/coin.png'

import '../css/Player.css'
import '../css/Common.css'

export default class Player extends Component {



  constructor(props) {
    super(props)
  }

  render(){
      return (
        <div class='player_card'>

          <p class='player_name_header'><b>{this.props.userID}</b></p>

          <div class='coin_box'>
              <img class='pixel_img coin' src={coin}/>
              <p class='coin_font'><b>x</b>{this.props.money}</p>
          </div>

        </div>);
      }
    }
