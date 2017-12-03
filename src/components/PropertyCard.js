import React, { Component } from 'react'

import '../css/Card.css'
import '../css/Common.css'

const PropertyImage = ({ property }) => {
  if (typeof property !== 'number' || property < 1) property = 'err'
  return (
    <div class={`no_margin_padding pixel_img card_base property_${property}`}>
      <img
        src={`${process.env.PUBLIC_URL}/img/${property}.png`}
        alt="property card"
      />
    </div>
  )
}

export default class PropertyCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <PropertyImage property={this.props.property} />
  }
}
