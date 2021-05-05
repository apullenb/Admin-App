import React from 'react';
import {Link} from 'react-router-dom';
import PageWrapper from '../GlobalComponents/PageWrapper';



const Home = props => {

    return(
        
        <div>
          <PageWrapper>
          <h2>Home / Landing Page</h2>   
          <Link to='login' ><button>Click to Login</button>    </Link>

         <h4> To See the Logged in Dashboard, go to </h4>
           <p><Link to='/Dashboard'><button>Dashboard</button></Link></p>
           
           </PageWrapper>
        </div>
    
    )


}


export default Home;