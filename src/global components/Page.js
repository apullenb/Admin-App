import React from 'react'
import TopNav from './TopNav'
import styled from 'styled-components';

function Page(props) {
    return (
        <div>
            <TopNav />
            <PageWrapper>
            {props.children}
            </PageWrapper>
        </div>
    )
}

export default Page

const PageWrapper = styled.div`
    display:flex;
    justify-content:space-around;
    align-items:flex-start;
    flex-direction: column;
    width:100%;
 `