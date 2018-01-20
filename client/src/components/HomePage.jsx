import React from 'react';
//import { Card, CardTitle } from 'material-ui/Card';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';


/*

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  arrows: true,
  centerMode: true,
  draggable: true,
  swipeToSlide: true,
  vertical: true,

};
*/

const HomePage = () => (
  <div className="comp-container">
    <h1>Current Competitions</h1>

    <Carousel width="50%">
      <div className="comptile"> <h3>3</h3> </div>
      <div className="comptile"> <h3>2</h3> </div>
      <div className="comptile"> <h3>2</h3> </div>
      <div className="comptile"> <h3>2</h3> </div>
      <div className="comptile"> <h3>2</h3> </div>
    </Carousel>
  </div>
  /*
  <Card className="container">
    <CardTitle title="React Application" subtitle="This is the home page." />
  </Card>
  */
);

export default HomePage;
