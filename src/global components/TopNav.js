import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/Zilislogo.png'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styled from 'styled-components';
import ProfileImage from '../assets/person_palceholder_img.png'
import Categories from '../components/categories'

function TopNav() {
  const navLinks = [
        
    {name:"Skincare Challenge", link:'/Skincare-Challenge', isPrivate: false},
    {name:"Event Calendar", link:'/Event-Calendar', isPrivate: true},
    {name:"Incentive Trip", link:'/Incentive-Trip', isPrivate: true},
];



  return (
    <div>
      <Top>
      <img src={Logo} style={{maxWidth:'170px', margin: '1px 25%'}} />
      <img src={ProfileImage} style={{maxWidth:'70px', margin: '1px 1%'}}/>
      </Top>
      <MainNavWrapper>
      <NavigationWrapper>
            <TopNavWrapper className='top-nav-wrapper'>
            <Navbar expand='lg' className='app-nav-wrapper' >
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
      </Navbar>
     
      <Navbar>
      <Nav>
    {navLinks.map ((link, i) => {
       return (
        <Nav.Link key={i} href={link.link} >{link.name}</Nav.Link>
    )
    })
    }
</Nav>
</Navbar>
<Navbar>
     <Navbar.Collapse>
<Nav>
<NavDropdown title="Admin Settings" id="basic-nav-dropdown">
        <NavDropdown.Item><Link to= '/Permissions'>Permissions</Link></NavDropdown.Item>
        <NavDropdown.Item href="/Roles">Roles</NavDropdown.Item>
        </NavDropdown>
  </Nav>
</Navbar.Collapse>
</Navbar>
</TopNavWrapper>  
            </NavigationWrapper>
            </MainNavWrapper>
    </div>
  )
}

export default TopNav;


const NavigationWrapper = styled.div`
    width:100%;
`;

const TopNavWrapper = styled.div`
    display:flex;
    justify-content:center;
    flex-direction: row;
    width:100%;
    height: 40px;
`;
const MainNavWrapper = styled.div`
    display:flex;
    justify-content:center;
    flex-direction: row;
    width:100%;
    font-size:18px;
    font-weight: 500
`;
const Top = styled.div`
border-bottom: 3px solid #043769;;
margin: 5px 3%;
padding: 1% 10px;
display: flex;
justify-content: center;


`