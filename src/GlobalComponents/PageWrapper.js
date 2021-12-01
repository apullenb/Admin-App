import React from 'react';
import TopNav from './TopNav';
import styled from 'styled-components';
import Footer from './footer';

function PageWrapper(props) {
  return (
    <div>
      <TopNav />
      <PageWrap>{props.children}</PageWrap>
      <Footer />
    </div>
  );
}

export default PageWrapper;

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 1%;
  margin: 0 1%;

  h1,
  .page-header {
    font-size: 36px;
    color: rgb(92, 90, 90);
    font-weight: 450;

    text-align: left;
  }

  .page-header-link {
    text-align: right;
    font-size: 16px;

    a {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 800px) {
    h1,
    .page-header {
      font-size: 26px;
    }

    .head {
      font-size: 15px;
      padding: 1px 3px;
    }
    td {
      font-size: 14px;
      padding: 3px 1px;
      margin: 0 1px;
    }
    #edit {
      font-size: 13px;
    }
  }
`;
