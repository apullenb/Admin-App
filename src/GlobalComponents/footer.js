import React from 'react';
import styled from 'styled-components'







const Footer = props => {

    return(
        <div>
            <FooterStyle>
            
            <p style={{padding:'1px 1%'}}>   Zilis LLC  </p>  
            <p style={{padding:'1px 1%'}}>  |   2021  </p>
            <p style={{padding:'1px 1%'}}> | Footer Links  </p>
            </FooterStyle>
        </div>
    )
}

const FooterStyle = styled.div `
display: flex;
justify-content: flex-start;
border-top: 1px solid #043769;
margin: 5% 3%;
padding: 10px 5%;


`
export default Footer;

