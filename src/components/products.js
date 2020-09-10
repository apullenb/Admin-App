import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
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
          <Product products={props.products} handlegetAllProducts={props.handlegetAllProducts} />
        </Route>
      </Switch>
                
      </ProductWapper>

        </ProductBodyWrapper>
       
    )
}




const Product =  props => {
    const { id } = useParams();
    var product = props.products.find(prod => `${prod.id}` === id);
    const [data, setData] = useState(product);
    const { addToast } = useToasts();

    useEffect(()=> {
             updateId();
    },[id]);

    useEffect(()=> {console.log(data)})

    const updateId = () => {
        product = props.products.find(prod => `${prod.id}` === id);
        setData(product);
    }


    const handleUpdateProductData = (event) => {
          setData( { ...data, [event.target.name]: event.target.value } )
    }


  const handleSave = (e) => {
    if (data.hasOwnProperty('category_name')){
        delete data.category_name;
    }   
    e.preventDefault();
    axios.put(`http://localhost:4000/api/products/update-product/by-id/${data.id}`, data)
    .then(res=>{
        props.handlegetAllProducts();
        addToast(`Product: ${data.sku} has been updated successfully`, {appearance: 'success', autoDismiss: true,})
    })
    .catch(error=>{
        addToast(`Uh Oh! Product was not updated: ${error.message}`, {appearance: 'error', autoDismiss: true})
    })
    }

    if(product !== undefined){
     return(
    
         <div style={{margin: '0 auto', width:'80%' }}> 
             <Form style={{ display:'flex', flexDirection:'column', justifyContent:'center'}} onSubmit={(e)=> handleSave(e)}>
            <Form.Group controlId="formSKU">
                <Form.Label>SKU </Form.Label>
                <Form.Control type="text" placeholder="SKU" name='sku' value={data.sku} onChange={(e) => handleUpdateProductData(e)} />
            </Form.Group>
            <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Category" name='category_name' value={data.category_name} onChange={(e) => handleUpdateProductData(e)} />
            </Form.Group>
            <Form.Group controlId="formimage_one_link">
                <Form.Label>Image One</Form.Label>
                <Form.Control type="text" placeholder="Image One" name="image_one_link" value={data.image_one_link} onChange={(e) => handleUpdateProductData(e)} />
            </Form.Group>
            <Form.Group controlId="formimage_two_link">
                <Form.Label>Image Two</Form.Label>
                <Form.Control type="text" placeholder="Image Two" name="image_two_link" value={data.image_two_link} onChange={(e) => handleUpdateProductData(e)} />
            </Form.Group>
            <Form.Group controlId="formvideo_one_link">
                <Form.Label>Video One</Form.Label>
                <Form.Control type="text" placeholder="Video One" name="video_one_link" value={data.video_one_link} onChange={(e) => handleUpdateProductData(e)} />
            </Form.Group>
            <Form.Group controlId="formvideo_two_link">
                <Form.Label>Video Two</Form.Label>
                <Form.Control type="text" placeholder="Video Two" name="video_two_link" value={data.video_two_link} onChange={(e) => handleUpdateProductData(e)} />
            </Form.Group>
            <Form.Group controlId="formlink_one">
                <Form.Label>Link One</Form.Label>
                <Form.Control type="text" placeholder="Link One" name="link_one" value={data.link_one} onChange={(e) => handleUpdateProductData(e)} />
            </Form.Group>
            <Form.Group controlId="formlink_two">
                <Form.Label>Link One</Form.Label>
                <Form.Control type="text" placeholder="Link Two" name="link_two" value={data.link_two} onChange={(e) => handleUpdateProductData(e)} />
            </Form.Group>
            <Form.Group controlId="formjson-data">
            <Form.Label>Json Data</Form.Label>
                <Form.Control type="text" placeholder="JSON Data"  name="json-data" value={data.json-data} onChange={(e) => handleUpdateProductData(e)} />
            </Form.Group>
            <Form.Group controlId="formweight">
            <Form.Label>Weight</Form.Label>
                <Form.Control type="text" placeholder="Weight" name="weight" value={data.weight} onChange={(e) => handleUpdateProductData(e)} />
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