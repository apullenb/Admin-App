import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const ZilisLoader = (props) => {
  return (
    <LoaderWrapper isFullPage={props.isFullPage}>
      <Loader type="Puff" color="#00BFFF" height={props.height} width={props.width} />
    </LoaderWrapper>
  );
};

export default ZilisLoader;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${(props) => (props.isFullPage ? 'absolute' : 'relative')};
  left: ${(props) => (props.isFullPage ? '50vw' : '0')};
  top: ${(props) => (props.isFullPage ? '50vh' : '0')};
`;
