import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: '350px',
  marginBottom: '30px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const img = {
  maxHeight: '100%',
  maxWidth: '100%'
}
const SliderHome = () => {
  return (
    <Carousel effect="fade" autoplay>
      <div>
        <img style={img} src={require('../../assets/images/carousel/1.png')} />
      </div>
      <div>
        <img style={img} src={require('../../assets/images/carousel/2.png')} />
      </div>
    </Carousel>
  )
}
export default SliderHome
