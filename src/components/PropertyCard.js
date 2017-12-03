import React, { Component } from 'react'

/*TODO There has to be a better way to do this... :/ */
import p1 from '../img/1.png'
import p2 from '../img/2.png'
import p3 from '../img/3.png'
import p4 from '../img/4.png'
import p5 from '../img/5.png'
import p6 from '../img/6.png'
import p7 from '../img/7.png'
import p8 from '../img/8.png'
import p9 from '../img/9.png'
import p10 from '../img/10.png'
import p11 from '../img/11.png'
import p12 from '../img/12.png'
import p13 from '../img/12.png'
import p14 from '../img/14.png'
import p15 from '../img/15.png'
import p16 from '../img/16.png'
import p17 from '../img/17.png'
import p18 from '../img/18.png'
import p19 from '../img/19.png'
import p20 from '../img/20.png'
import p21 from '../img/21.png'
import p22 from '../img/22.png'
import p23 from '../img/23.png'
import p24 from '../img/24.png'
import p25 from '../img/25.png'
import p26 from '../img/26.png'
import p27 from '../img/27.png'
import p28 from '../img/28.png'
import p29 from '../img/29.png'
import p30 from '../img/30.png'
import err from '../img/no_step_snek_1.png'

import '../css/Card.css'
import '../css/Common.css'

function PropertyImage(props) {

  switch(props.property)
  {
    case 1:
      return(
        <div class="no_margin_padding pixel_img card_base property_1">
          <img src={p1} alt="property card" />
        </div>
      );
    case 2:
      return(
        <div class="no_margin_padding pixel_img card_base property_2">
          <img src={p2} alt="property card" />
        </div>
      );
    case 3:
      return(
        <div class="no_margin_padding pixel_img card_base property_3">
          <img src={p3} alt="property card" />
        </div>
      );
    case 4:
      return(
        <div class="no_margin_padding pixel_img card_base property_4">
          <img src={p4} alt="property card" />
        </div>
      );
    case 5:
      return(
        <div class="no_margin_padding pixel_img card_base property_5">
          <img src={p5} alt="property card" />
        </div>
      );
    case 6:
      return(
        <div class="no_margin_padding pixel_img card_base property_6">
          <img src={p6} alt="property card" />
        </div>
      );
    case 7:
      return(
        <div class="no_margin_padding pixel_img card_base property_7">
          <img src={p7} alt="property card" />
        </div>
      );
    case 8:
      return(
        <div class="no_margin_padding pixel_img card_base property_8">
          <img src={p8} alt="property card" />
        </div>
      );
    case 9:
      return(
        <div class="no_margin_padding pixel_img card_base property_9">
          <img src={p9} alt="property card" />
        </div>
      );
    case 10:
      return(
        <div class="no_margin_padding pixel_img card_base property_10">
          <img src={p10} alt="property card" />
        </div>
      );
    case 11:
      return(
        <div class="no_margin_padding pixel_img card_base property_11">
          <img src={p11} alt="property card" />
        </div>
      );
    case 12:
      return(
        <div class="no_margin_padding pixel_img card_base property_12">
          <img src={p12} alt="property card" />
        </div>
      );
    case 13:
      return(
        <div class="no_margin_padding pixel_img card_base property_13">
          <img src={p13} alt="property card" />
        </div>
      );
    case 14:
      return(
        <div class="no_margin_padding pixel_img card_base property_14">
          <img src={p14} alt="property card" />
        </div>
      );
    case 15:
      return(
        <div class="no_margin_padding pixel_img card_base property_15">
          <img src={p15} alt="property card" />
        </div>
      );
    case 16:
      return(
        <div class="no_margin_padding pixel_img card_base property_16">
          <img src={p16} alt="property card" />
        </div>
      );
    case 17:
      return(
        <div class="no_margin_padding pixel_img card_base property_17">
          <img src={p17} alt="property card" />
        </div>
      );
    case 18:
      return(
        <div class="no_margin_padding pixel_img card_base property_18">
          <img src={p18} alt="property card" />
        </div>
      );
    case 19:
      return(
        <div class="no_margin_padding pixel_img card_base property_19">
          <img src={p19} alt="property card" />
        </div>
      );
    case 20:
      return(
        <div class="no_margin_padding pixel_img card_base property_20">
          <img src={p20} alt="property card" />
        </div>
      );
    case 21:
      return(
        <div class="no_margin_padding pixel_img card_base property_21">
          <img src={p21} alt="property card" />
        </div>
      );
    case 22:
      return(
        <div class="no_margin_padding pixel_img card_base property_22">
          <img src={p22} alt="property card" />
        </div>
      );
    case 23:
      return(
        <div class="no_margin_padding pixel_img card_base property_23">
          <img src={p23} alt="property card" />
        </div>
      );
    case 24:
      return(
        <div class="no_margin_padding pixel_img card_base property_24">
          <img src={p24} alt="property card" />
        </div>
      );
    case 25:
      return(
        <div class="no_margin_padding pixel_img card_base property_25">
          <img src={p25} alt="property card" />
        </div>
      );
    case 26:
      return(
        <div class="no_margin_padding pixel_img card_base property_26">
          <img src={p26} alt="property card" />
        </div>
      );
    case 27:
      return(
        <div class="no_margin_padding pixel_img card_base property_27">
          <img src={p27} alt="property card" />
        </div>
      );
    case 28:
      return(
        <div class="no_margin_padding pixel_img card_base property_28">
          <img src={p28} alt="property card" />
        </div>
      );
    case 29:
      return(
        <div class="no_margin_padding pixel_img card_base property_29">
          <img src={p29} alt="property card" />
        </div>
      );
    case 30:
      return(
        <div class="no_margin_padding pixel_img card_base property_30">
          <img src={p30} alt="property card" />
        </div>
        );
    default:
      return(
        <div class="no_margin_padding pixel_img card_base property_err">
          <img src={err} alt="property card" />
        </div>
      );
  }
}

export default class PropertyCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <PropertyImage property={this.props.property} />
    );
  }
}
