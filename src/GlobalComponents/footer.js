import React from 'react';
import styled from 'styled-components';

const Footer = (props) => {
  const nowDate = new Date(Date.now());

  return (
    <FooterStyle>
      <p>Zilis™ LLC | {nowDate.getFullYear().toString()}</p>
    </FooterStyle>
  );
};

const FooterStyle = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid #043769;
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export default Footer;
