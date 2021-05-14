import React from 'react';
import styled from 'styled-components'



const Footer = props => {
  return (
    <div>
      <FooterStyle>            
        Zilis&trade; {new Date().getFullYear()}
      </FooterStyle>
    </div>
  )
}

const FooterStyle = styled.div `
  text-align: center;
  border-top: 1px solid #043769;
  padding: 10px 5%;
  margin-top: 10px;
`
export default Footer;

