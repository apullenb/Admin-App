/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import Logo from '../assets/Zilis_Logo_2021.png'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styled from 'styled-components';
import ProfileImage from '../assets/person_palceholder_img.png'

function TopNav() {
  const navLinks = [        
    {name:"Event Calendar", link:'/Events', isPrivate: true},
    {name:"Incentive Trip", link:'/Incentive', isPrivate: true},
    {name:"COA's", link:'/COAs', isPrivate: true},
  ];


  return (
    <HeaderWrapper>
      <Top>
        <div className="top-wrapper">
          <div className="inner-wrapper">
            <a href="/"><img src={Logo} alt="Zilis Logo" style={{maxWidth:'170px', margin: '1px auto'}} /></a>
            <img src={ProfileImage} alt="Profile Image" className="profile-pic" />
          </div>
        </div>
        <hr />
      </Top>
      <div className="top-wrapper">
        <Navbar expand='lg' className='app-nav-wrapper' >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                 <NavDropdown title="Shopping Configuration" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/Shopping/Countries">Countries</NavDropdown.Item>
                  <NavDropdown.Item href="/Shopping/Kits">Kits</NavDropdown.Item>
                  <NavDropdown.Item href="/Shopping/Categories">Categories</NavDropdown.Item>
                  <NavDropdown.Item href="/Shopping/Products">Products</NavDropdown.Item>
                </NavDropdown> 
                <NavDropdown title="Skincare Challenge" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/Challenge/Accounts">Accounts</NavDropdown.Item>
                  <NavDropdown.Item href="/Challenge/Entries">Entries</NavDropdown.Item>
                </NavDropdown>    
                 { navLinks.map ((link, i) => {
                  return (
                    <LinkWrap key={i}><Nav.Link href={link.link} >{link.name}</Nav.Link></LinkWrap>
                  )
                })}
              </Nav>     
              <Nav>
                 <NavDropdown title="Admin Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/Settings/users">Permissions</NavDropdown.Item>
                </NavDropdown>     
              </Nav>     
            </Navbar.Collapse>
        </Navbar>
      </div>
    </HeaderWrapper>
  )
}

export default TopNav;


const HeaderWrapper = styled.div`
  .top-wrapper {
    max-width: 1400px;
    position: realtive;
    margin: 0 auto 20px;

    .inner-wrapper {
      position: relative;
    }

    .navbar {
      padding: 0;
    }

    .nav-item {
      margin: 0px 20px;
      font-size: 18px;

      &:first-child {
        margin-left: 10px;
      }
    }
  }
`

const LinkWrap = styled.div`
  padding: 0px 1px;
  margin: 0px 20px;
`;

const Top = styled.div`
  text-align: center;
  padding-top: 10px;

  .profile-pic {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 70px;
    border-radius: 50%;
  }

  hr {
    display: block;
    border: none;
    border-bottom: 3px solid #043769;
    margin-bottom: 0;
  }
`;