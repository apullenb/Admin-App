import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, Route, Switch ,useRouteMatch, useParams } from 'react-router-dom';
import Styled from 'styled-components';

 const ProductBodyWrapper = Styled.div`
    display:flex;
    flex-direction:row ;
 `;

const ProductsWrapper = Styled.div`
    display:flex;
    flex-direction:column;
    overflow: auto;
    width:275px;
    height:500px;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.3);
`;


const ListWrapper = Styled.div`
    list-style:none;
    padding:5%;
`

const ProductWapper = Styled.div`
    width:100%;
    height:100vh;
    margin: 0 10px;
    overflow:auto;
    padding: 2%;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.5);
`

const Products = props => {
let { path, url } = useRouteMatch();

    return(
       
        <ProductBodyWrapper>
            <ProductsWrapper>
            <h2>Products page</h2> 
            <Button variant="primary" onClick={()=>{props.handlegetAllProducts()}}>Get all Products</Button>
                <ListWrapper>
                {
                    props.products.map(product => {
                        return(
                              <li key={product.id}><Link to={`${url}/${product.id}`}>{product.sku}</Link></li>
                             )
                    })
                }
                </ListWrapper>
            </ProductsWrapper>

      <ProductWapper>
      <h2>Product</h2>
      <Switch>
        <Route exact path={path}>
        </Route>
        <Route path={`${path}/:id`}>
          <Product products={props.products} />
        </Route>
      </Switch>
                
      </ProductWapper>

        </ProductBodyWrapper>
       
    )
}




const Product =  props => {
    const { id } = useParams();
    const product = props.products.find(prod => `${prod.id}` === id);
    const [data, setData] = useState(product);

    if(product !== undefined){
     return(
    
         <div style={{margin: '0 auto', width:'80%' }}> 
             <Form style={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Form.Group controlId="formSKU">
                <Form.Label>SKU </Form.Label>
                <Form.Control type="text" placeholder="Enter SKU" value={data.sku} />
            </Form.Group>
            <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Category" value={data.category_name} />
            </Form.Group>
            <Form.Group controlId="formimage_one_link">
                <Form.Label>Image One</Form.Label>
                <Form.Control type="text" placeholder="Image One" value={data.image_one_link} />
            </Form.Group>
            <Form.Group controlId="formimage_two_link">
                <Form.Label>Image Two</Form.Label>
                <Form.Control type="text" placeholder="Image Two" value={data.image_two_link} />
            </Form.Group>
            <Form.Group controlId="formvideo_one_link">
                <Form.Label>Video One</Form.Label>
                <Form.Control type="text" placeholder="Video One" value={data.video_one_link} />
            </Form.Group>
            <Form.Group controlId="formvideo_two_link">
                <Form.Label>Video Two</Form.Label>
                <Form.Control type="text" placeholder="Video Two" value={data.video_two_link} />
            </Form.Group>
            <Form.Group controlId="formlink_one">
                <Form.Label>Link One</Form.Label>
                <Form.Control type="text" placeholder="Link One" value={data.link_one} />
            </Form.Group>
            <Form.Group controlId="formlink_two">
                <Form.Label>Link One</Form.Label>
                <Form.Control type="text" placeholder="Link Two" value={data.link_two} />
            </Form.Group>
            <Form.Group controlId="formjson-data">
            <Form.Label>Json Data</Form.Label>
                <Form.Control type="text" placeholder="JSON Data" value={data.json-data} />
            </Form.Group>
            <Form.Group controlId="formweight">
            <Form.Label>Weight</Form.Label>
                <Form.Control type="text" placeholder="Weight" value={data.weight} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Save
            </Button>
            </Form>
        </div> 
     
          )
        }
        else{
            return(
                <div>Not Data to Display...</div>
            )
        }


    }


    
    








export default Products;