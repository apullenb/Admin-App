import React from 'react';
import { Redirect } from 'react-router-dom';
import getComponentData from './selector';
import { connect } from 'react-redux';
import SpinnerLoader from '../../GlobalComponents/ZilisSpinnerLoader';

const Categories = ({ view, edit, permissionFeched, PermissionsError }) => {
  return (
    <>
      {permissionFeched ? (
        !PermissionsError && view ? (
          <div>
            <h2>You are at the Categories Page</h2>
          </div>
        ) : (
          <Redirect to='/NoPermission' />
        )
      ) : (
        <SpinnerLoader />
      )}
    </>
  );
};

export default connect(getComponentData)(Categories);
