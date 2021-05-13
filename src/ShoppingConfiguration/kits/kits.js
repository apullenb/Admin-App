import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Link, Switch, Route, useRouteMatch, useParams} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import config from '../../config/config'




const KitWrapper = styled.div`
        border: 1px solid green;
`;



const Kits = (props) => {
let { url, path } = useRouteMatch();
const [kits, setKits] = useState([]);

const getAllKits = () => axios.get(`${config.CHALLANGE_API_URL}/api/kits`)
                    .then(res =>{
                        setKits(res.data)
                        console.log(res.data)
                    }).catch(error => {
                        console.log(error)
                    })

useEffect(()=>{
   getAllKits(); 
},[]);



    return(
        <KitWrapper>
            {kits.map((kit, index) => {
                return (
                    <li>
                     <Link to={`${url}/${kit.id}`}>{ kit.sku }</Link>
                    </li>
                )
            })}

            <Switch>
                <Route exact path={path}></Route>
                <Route path={`${path}/:id`}>
                    <Kit
                        kits={kits}
                    />
                </Route>
            </Switch>
        
        </KitWrapper>
    )


}


export default Kits;





const Kit = props => {
    let { id } = useParams();
    const [kits, setKits] = useState(props.kits);
    const [kit, setKit] = useState({});
    const [kitsAndProducts, setkitsAndProducts] = useState([])
    const [kitSingleProducts, setkitSingleProducts] = useState([]);


    var findKit = kits.find(kit => `${kit.id}` === id )

    useEffect(()=>{
        setKit(findKit);
    })

    useEffect(()=>{
        getAllKitsProducts();
    },[])

    useEffect(()=>{
             kitsAndProducts.forEach((currKit) => {
            if( typeof currKit[`${kit.sku}`] !== 'undefined') {
                console.log("I has success")
                setkitSingleProducts(Object.values(currKit)[0])
            }
        })
        kitSingleProducts.forEach(item => console.log(item))
        console.log(kitSingleProducts)
    },[id])



    const getAllKitsProducts = () => { axios.get(`${config.CHALLANGE_API_URL}/api/kits/kits-products/sorted`)
                            .then(res => {
                                setkitsAndProducts(res.data)
                                console.log(res.data)
                            }).catch(error => {
                                console.log(error)
                            });}

    return (
        <div>
            <p>{kit.id}</p>
            <p>{kit.sku}</p>
            <p>{kit.description}</p>
            <p>{kit.country}</p>

            {/* { kitSingleProducts ?? kitSingleProducts.map((prod, index) => {
                return (
                    <p>{index}</p>
                )
            })} */}
     
        </div>

    )
}