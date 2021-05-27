import React from 'react'
import TopNav from './TopNav'
import styled from 'styled-components';
import Footer from './footer';
import './Page.css'
function PageWrapper(props) {
    return (
        <div>
            <TopNav />
            <div className='page'>
            <PageWrap>
            {props.children}
            </PageWrap>
            </div>
            <Footer />
        </div>
    )
}

export default PageWrapper;

const PageWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin: 1%;
    padding: 1%
   
 `;