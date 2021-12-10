import React from 'react'
import styled from "styled-components";

const SpinnerLoader = (props) => {
    return (
        <>
            <ZlsLoader width={props.width} height={props.height}/>
        </>
    )
}
const ZlsLoader = styled.div` 
margin: 0 auto ;
border: 7px solid #f3f3f3;
border-top: 7px solid #3d3e3f;
border-radius: 50%;
width: ${props=>props.width || '35px'};
min-height:  ${props=>props.height || '35px'};
-webkit-animation: spin 2s linear infinite;
@keyframes spin {
    0%   {transform:rotate(0deg);}
    50%  {transform:rotate(180deg);}
    100% {transform:rotate(360deg);}
}
`;
export default SpinnerLoader
