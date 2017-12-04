import React, { Component } from 'react'

import '../css/Card.css'
import '../css/Common.css'

export default class PropertyCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let property = this.props.property
    if (typeof property !== 'number' || property < 1) property = 'err'
    return (
      <div
        class={`no_margin_padding pixel_img card_base`}
        onClick={this.props.clickHandler}
      >
        <img
          src={`${process.env.PUBLIC_URL}/img/${property}.png`}
          alt={'property card' + property}
        />
        <p className="top_left">{property}</p>
        <p className="bottom_right">{property}</p>
      </div>
    )
  }
}
