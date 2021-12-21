import React from 'react'
import styled from 'styled-components';

const PermissionNotGranted = () => {
    return (
        <NoPermission >
            <h1>Permissions not Granted</h1>
        <h3>
            You do not have permission to access this page. If this is in error, please contact IT.
        </h3>
        </NoPermission>
    )
}

export default PermissionNotGranted

const NoPermission = styled.div`
h1{
text-align: center;
}
h3 {
padding-top:50px;
text-align: center;
width:600px;
}
`;