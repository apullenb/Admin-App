import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const ZilisLoader = props => {
    return (
        <LoaderWrapper>
            <Loader
            type="Puff"
            color="#00BFFF"
            height={props.height}
            width={props.width}
         />
        </LoaderWrapper>
    )
}


export default ZilisLoader;


const LoaderWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`;
