import React from 'react'
import TopNav from './TopNav'
import styled from 'styled-components';
import Footer from './footer';
import './Page.css'
function PageWrapper(props) {
    return (
        <div className='page'>
            <TopNav />
            <PageWrap>
            {props.children}
            </PageWrap>
            <Footer />
        </div>
    )
}

export default PageWrapper;

const PageWrap = styled.div`
    display:flex;
    justify-content:space-around;
    align-items:flex-start;
    flex-direction: column;
    margin: 1% 9%;
    
 `