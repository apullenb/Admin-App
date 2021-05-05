import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import person from '../assets/person_palceholder_img.png'
import colors from '../config/colors';

const ProfileCard = (props) => {

  return (
    <div>
      <ProfileImageIcon id="profile-icon" profileImage={props.profileImage} />
      <Wrapper className="profile-card">
        <ProfileImage profileImage={props.profileImage} />
        <div style={{ color: "#fff", marginLeft: "3%", lineHeight: "0.3" }}>
          <p>{props.firstName + " " + props.lastName}</p>
          <p style={{ marginBottom: "0" }}>{props.rankType}</p>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProfileCard;

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
width: 275px;
height: 80px;
background-color: ${colors.matteBlack};
border-radius: 10px;
position: absolute;
right: 2px;
top: 40px;
border: 1px solid rgba(0,0,0,0.3);
box-shadow: inset 12px -12px 24px 0 #0c0c0c, inset -12px 12px 24px 0 #1c1c1c, 0 5px 18px 0 rgba(0,0,0,0.7);
z-index:-9999;


@media (max-width: 991px) {
  position: absolute;
  top: 5%;
}
`;

const ProfileImageIcon = styled.div`
width: 35px;
height: 35px;
background-image: ${person};
background-position: center;
background-repeat: no-repeat;
background-size: cover;
border-radius: 50%;
margin-top: 5%;
`;

const ProfileImage = styled.div`
width: 70px;
height: 70px;
background-image: ${person};
background-position: center;
background-repeat: no-repeat;
background-size: cover;
border-radius: 50%;
`;