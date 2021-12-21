import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const ZilisCarousel = (props) => {
  return (
    <div style={{ width: '100vw' }}>
      <Carousel fade>
        {props.carouselData.map((data, i) => {
          return (
            <Carousel.Item key={i}>
              <img className='d-block w-100' src={data.image} alt={`slide ${i}`} />
              <Carousel.Caption style={{ color: '#fff' }}>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ZilisCarousel;
