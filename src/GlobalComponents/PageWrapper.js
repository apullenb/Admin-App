import React from 'react'
import TopNav from './TopNav'
import styled from 'styled-components';
import Footer from './footer';

function PageWrapper(props) {
  return (
    <div>
      <TopNav />
      <PageWrap>
        {props.children}
      </PageWrap>
      {/* <Footer /> */}
    </div>
  )
}

export default PageWrapper;

const PageWrap = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;

  h1,
  .page-header {
    font-size: 36px;
    color:rgb(92, 90, 90);
    font-weight: 450;
    margin: 10px 0 30px;
    align-self: flex-start;
  }

  .page-header-link {
    position: absolute;
    display: inline;
    right: 0;
    font-size: 16px;

    a {
      text-decoration: underline;
    }
  }
`