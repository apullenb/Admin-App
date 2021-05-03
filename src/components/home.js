import React from 'react';
import {Link} from 'react-router-dom';



const Home = props => {

    return(
        
        <div>
          <h2>Home</h2>   
          <Link to='login' ><button>Click to Login</button>    </Link>

         <h4> To See the Logged in Dashboard, go to 
           <p><Link to='/Dashboard'><button>Dashboard</button></Link></p>
           </h4>
        </div>
    
    )


}


export default Home;