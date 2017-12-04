import React, { Component } from 'react'

import '../css/Card.css'
import '../css/Common.css'

export default class PropertyCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (typeof this.props.property !== 'number' || this.props.property < 1) this.props.property = 'err'
    return (
      <div class={`no_margin_padding pixel_img card_base`}>
        <img
          src={`${process.env.PUBLIC_URL}/img/${this.props.property}.png`}
          alt={"property card"+this.props.property}
        />
        <p className = "top_left">{this.props.property}</p>
        <p className = "bottom_right">{this.props.property}</p>
      </div>
    )
  }
}
