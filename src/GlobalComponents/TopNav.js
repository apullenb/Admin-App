import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/Zilislogo.png'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styled from 'styled-components';
import ProfileImage from '../assets/person_palceholder_img.png'
import Categories from '../ShoppingConfiguration/categories'

function TopNav() {
  const navLinks = [
        
    {name:"Event Calendar", link:'/Event-Calendar', isPrivate: true},
    {name:"Incentive Trip", link:'/Incentive-Trip', isPrivate: true},
];



  return (
    <div>
      <Top>
      <img src={Logo} style={{maxWidth:'170px', margin: '1px auto'}} />
      <img src={ProfileImage} style={{maxWidth:'70px', margin: '1px 1%'}}/>
      </Top>
      <MainNavWrapper>
            <Navbar expand='lg' className='app-nav-wrapper' >
            <DropDownWrapper>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
          <NavDropdown title="Shopping Configuration" id="basic-nav-dropdown">
        <NavDropdown.Item href="/Countries">Countries</NavDropdown.Item>
        <NavDropdown.Item href="/Kits">Kits</NavDropdown.Item>
        <NavDropdown.Item href="/Categories">Categories</NavDropdown.Item>
        <NavDropdown.Item href="/Products">Products</NavDropdown.Item>
      </NavDropdown>    
      </Nav>     
      </Navbar.Collapse>
      </DropDownWrapper>
      </Navbar>
      <Navbar expand='lg' className='app-nav-wrapper' >
            <DropDownWrapper>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
          <NavDropdown title="Skincare Challenge" id="basic-nav-dropdown">
        <NavDropdown.Item href="/Skincare-Challenge-Accounts">Accounts</NavDropdown.Item>
        <NavDropdown.Item href="/Skincare-Challenge-Entries">Entries</NavDropdown.Item>
       
      </NavDropdown>    
      </Nav>     
      </Navbar.Collapse>
      </DropDownWrapper>
      </Navbar>
      <Navbar>
      <Nav>
    {navLinks.map ((link, i) => {
       return (
        <LinkWrap><Nav.Link key={i} href={link.link} >{link.name}</Nav.Link></LinkWrap>
    )
    })
    }
</Nav>
</Navbar>
<Navbar expand='lg' className='app-nav-wrapper' >
            <AdDropDownWrapper>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
          <NavDropdown title="Admin Settings" id="basic-nav-dropdown">
        <NavDropdown.Item href="/Skincare-Challenge-Accounts">Permissions</NavDropdown.Item>
        <NavDropdown.Item href="/Skincare-Challenge-Entries">Roles</NavDropdown.Item>
      </NavDropdown>    
      </Nav>     
      </Navbar.Collapse>
      </AdDropDownWrapper>
      </Navbar>
 </MainNavWrapper>
    </div>
  )
}

export default TopNav;



const DropDownWrapper = styled.div`
    height: 40px;
    padding: 0px 1px;
     margin: 0px 1px
`;
const MainNavWrapper = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:center;
    align-items: center;
    font-size:18px;
    font-weight: 500;
    margin: 2px 0px;
   
`;

const LinkWrap = styled.div`
padding:0px 1px;
margin: 0px 20px;
`;
const Top = styled.div`
display: flex;
justify-content: center;
border-bottom: 3px solid #043769;
padding: 10px 1px;
margin: 5px 25px;

`;

const AdDropDownWrapper = styled.div`
    height: 40px;
    padding: 0px 50px 0px 95px;
     margin: 0px 10px 0 15%;
`;