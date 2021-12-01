import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const ImageOverlay = (props) => {
  const placederImage = 'https://res.cloudinary.com/zilis/image/upload/v1637998439/zilis/Common_Images/placeholder_image_grey_yg9qaj.png';
  const rootUrl = props.rootUrl ? props.rootUrl : '';

  const handleHide = () => {
    props.handleHide(false);
  };

  return (
    <OverlayBG onClick={handleHide} show={props.show}>
      <ImageWrapper>
        <img style={{ width: '100%' }} src={props.src ? ` ${rootUrl + props.src}` : placederImage} />
      </ImageWrapper>
    </OverlayBG>
  );
};

ImageOverlay.propTypes = {
  show: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  rootUrl: PropTypes.string,
  handleHide: PropTypes.func.isRequired,
};

export default ImageOverlay;

const OverlayBG = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  zindex: 9999;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  background-color: #eaeaea;
`;
