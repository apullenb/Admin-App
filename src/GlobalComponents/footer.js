import React from 'react';
import styled from 'styled-components'







const Footer = props => {
const nowDate =new Date(Date.now());

    return(     
            <FooterStyle>
            <p>Zilis™ LLC | {nowDate.getFullYear().toString()} | Footer Links</p>
            </FooterStyle>    
    )
}

const FooterStyle = styled.div `
display: flex;
justify-content: center;
border-top: 1px solid #043769;
margin: 5% 3%;
padding: 10px 5%;
`

export default Footer;

