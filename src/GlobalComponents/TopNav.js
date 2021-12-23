/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react';
import Logo from '../assets/Zilis_Logo_2021.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styled from 'styled-components';
import ProfileImage from '../assets/person_palceholder_img.png';
import { useIsAuthenticated } from '@azure/msal-react';
import { AADSignInButton } from './AzureADSignin';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function TopNav() {
  const isAuthenticated = useIsAuthenticated();

  const { skincarePermissions} = useSelector(state => state.entries);
  const getPermission = (id) => {
    const glowPermissions = skincarePermissions?.find(
      (skincarePermission) => skincarePermission.areaId == id
    );
    const view =
      glowPermissions?.levelId === 2 ||
      glowPermissions?.levelId === 3 ||
      glowPermissions?.levelId === 4;
    return view;
  };
  const { profileData, profileImage } = useSelector((state) => state.azProfile);
  const navLinks = [
    { name: 'Event Calendar', link: '/Events', isPrivate: true ,areaid:'10'},
    { name: 'Incentive Trip', link: '/Incentive', isPrivate: true ,areaid:'12'},
    { name: "COA's", link: '/COAs', isPrivate: true ,areaid:'5'},
    { name: 'StarPoint', link: '/StarPoint', isPrivate: true , areaid:'9'},
  ];

  const subNavLinks = [
    {
      linkTitle: 'Shopping Configuration',
      subLinks: [
        { name: 'Countries', link: '/Shopping/Countries', isPrivate: true ,areaid:'12'},
        { name: 'Kits', link: '/Shopping/Kits', isPrivate: true ,areaid:'7'},
        { name: 'Categories', link: '/Shopping/Categories', isPrivate: true ,areaid:'8'},
        { name: 'Products', link: '/Shopping/Products', isPrivate: true ,areaid:'4'},
      ],
    },
    {
      linkTitle: 'Challenges',
      subLinks: [
        { name: 'Accounts', link: '/Challenge/Accounts', isPrivate: true ,areaid:'1'},
        { name: 'Skincare Entries', link: '/Challenge/Entries', isPrivate: true ,areaid:'3'},
        { name: 'Glow Entries', link: '/Challenge/Glow-Entries', isPrivate: true ,areaid:'3'},
      ],
    },
  ];
  
  return (
    <HeaderWrapper>
      <Top>
        <div className='top-wrapper'>
          <div className='inner-wrapper'>
            <Link to='/'>
              <img src={Logo} alt='Zilis Logo' style={{ maxWidth: '170px', margin: '1px auto' }} />
            </Link>
            <ProfileWrapper>
              <ProfileImg src={profileImage || ProfileImage} alt='Profile Image' />
              <h6>{profileData && profileData.displayName}</h6>
            </ProfileWrapper>
            <ProfileHover>
              {isAuthenticated && profileData ? (
                <>
                  <h5>{profileData.displayName}</h5>
                  <h6>{profileData.jobTitle}</h6>
                  <Divider />
                  <p>{profileData.officeLocation}</p>
                </>
              ) : (
                <>
                  <h5>
                    User unknown
                    <br />
                    Please login
                  </h5>
                </>
              )}
            </ProfileHover>

            <div></div>
          </div>
        </div>
        <hr />
      </Top>
      <div className='top-wrapper'>
        <Navbar expand='lg' className='app-nav-wrapper'>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              {subNavLinks.map((link, index) => {
                return (
                  <NavDropdown title={link.linkTitle} key={index} id='basic-nav-dropdown'>
                    {link.subLinks.map((subLink, i) => {
                          let id=subLink.areaid
                          const permission = getPermission(id)
                      return (<>
                      { permission && <LinkWrap key={i}>
                          <StyledLink to={subLink.link} key={i} style={{ color: 'rgba(0,0,0,.5)', textDecoration: 'none' }}>
                            {subLink.name}
                          </StyledLink>
                        </LinkWrap>}
                        </> );
                    })}
                  </NavDropdown>
                );
              })}
              {/*SINGLE NAV LINKS BELOW*/}
              {navLinks.map((link, i) => {
                let id=link.areaid
                const permission = getPermission(id)
                return (
                  <>
                 {permission && <LinkWrap key={i}>
                    <div style={{ marginTop: '10px' }}>
                      <Link to={link.link} style={{ color: 'rgba(0,0,0,0.5)', textDecoration: 'none' }}>
                        {link.name}
                      </Link>
                    </div>
                  </LinkWrap>}
                  </>
                );
              })}
              <AADSignInButton />
            </Nav>
          { getPermission('14') && <Nav>
              <NavDropdown title='Admin Settings' id='basic-nav-dropdown'>
                <LinkWrap>
                  <StyledLink to='/Settings/users' style={{ color: 'rgba(0,0,0,.5)', textDecoration: 'none' }}>
                    Permissions
                  </StyledLink>
                </LinkWrap>
              </NavDropdown>
            </Nav>}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </HeaderWrapper>
  );
}

export default TopNav;

const HeaderWrapper = styled.div`
  .top-wrapper {
    max-width: 1400px;
    position: realtive;
    margin: 0 auto 20px;
    height: 90px;

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
`;

const LinkWrap = styled.div`
  padding: 0px 1px;
  margin: 0px 20px;
`;

const StyledLink = styled(Link)`
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
  }
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

const ProfileHover = styled.div`
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #0f4b8f;
  color: #fff;
  width: 200px;
  height: 0px;
  border-radius: 12px;
  padding: 8px;
  position: absolute;
  top: 100px;
  right: 10px;
  opacity: 0;
  z-index: 900;
  box-shadow: 0 8px 18px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease-in-out;
`;

const ProfileWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px;
  transition: all 0.3s ease-in-out;

  :hover {
    background-color: #0f4b8f;
    border-radius: 12px 12px 0 0;
    box-shadow: 0px -15px 8px 1px rgba(0, 0, 0, 0.1);
    z-index: 901;
    color: #fff;
    width: 200px;
    right: 10px;
  }

  :hover + ${ProfileHover} {
    visibility: visible;
    height: 250px;
    opacity: 1;
    border-radius: 0 0 12px 12px;
  }
`;

const ProfileImg = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
`;

const Divider = styled.hr`
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 1% 0;
`;
