import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import config from '../../config/env-urls'

const Kits = (props) => {
  let { url, path } = useRouteMatch();
  const [kits, setKits] = useState([]);

  const getAllKits = () => axios.get(`${config.PRODUCTSBASEURL}/api/kits`)
    .then(res => {
      setKits(res.data);
    }).catch(error => {
      console.error(error)
    });

  useEffect(() => {
    getAllKits();
  }, []);

  return (
    <KitWrapper>
      <ListWrapper>
        <h3>Kit List</h3>
        <ul>
          {kits.map((kit, index) => {
            return (
              <li key={index}>
                <Link to={`${url}/${kit.id}`}>{kit.sku}</Link>
              </li>
            )
          })}
        </ul>
      </ListWrapper>
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
    const [kits] = useState(props.kits);
    const [kit, setKit] = useState({});
    const [kitsAndProducts, setkitsAndProducts] = useState([])
    const [kitSingleProducts, setkitSingleProducts] = useState([]);

    const findKit = kits.find(kit => `${kit.id}` === id);

    useEffect(() => {
      setKit(findKit);
    }, [findKit]);

    useEffect(() => {
      getAllKitsProducts();
    }, []);

    useEffect(() => {
      kitsAndProducts.forEach((currKit) => {
        if (typeof currKit[`${kit.sku}`] !== 'undefined') {
          setkitSingleProducts(Object.values(currKit)[0]);
        }
      })
    });

    const getAllKitsProducts = () => {
      axios.get(`${config.PRODUCTSBASEURL}/api/kits/kits-products/sorted`)
        .then(res => {
          setkitsAndProducts(res.data);
        }).catch(error => {
          console.error(error);
        });
    }

    return (
      <div>
        <p><label>Kit ID</label> {kit.id}</p>
        <p><label>SKU</label> {kit.sku}</p>
        <p><label>Description</label> {kit.description}</p>
        <p><label>Country</label> {kit.country}</p>

        { kitSingleProducts ?? kitSingleProducts.map((prod, index) => {
            return (
                <p>{index}</p>
            )
        })}
      </div>

    )
}


const KitWrapper = styled.div`
    width:1400px;
    display:flex;
    flex-direction: row;
    justify-content:left;
    margin: 0 auto;
    text-align:left;
 `;

const ListWrapper = styled.div`
  width: 200px;
  margin-right: 20px;
  padding-right: 20px;

  ul {
    list-style:none;
    padding: 0;

    li {
      padding: 5px;
    }
  }
`;