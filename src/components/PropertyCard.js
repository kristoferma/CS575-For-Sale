import React, {
  Component
} from 'react'

import property from '../img/20.jpg'

import '../css/Card.css'
import '../css/Common.css'

export default class PropertyCard extends Component {



  constructor(props) {
    super(props)
    this.state = {
      ID: 0
    }
  }
  render(){
      return (
        <div class='no_margin_padding pixel_img card_base property_1'>
            <img src={property}/>
        </div>
        );
      }
    }