import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Plus from '../../assets/svgs/solid/plus.svg';
import './ProductFeed.css';
import * as _ from 'lodash';
import { useSelector, useDispatch, connect } from 'react-redux';
import { productSelector, fetchProductsFromDb, deleteProductFromDb } from './ProductFeedSlice';
import routes from '../../constants/routes';
import Product from './Product/Product';

class ProductFeed extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    componentDidMount() {
        console.log('Did Mount')
        if(this.props.products.length === 0)
            this.props.dispatch(fetchProductsFromDb());
    }

    render() {
        let productList = this.props.products && this.props.products.map((product, i) => {
            return(
                <li key={product.id}>
                    <Product {...this.props} index={i}/>
                </li>
            );
        })
        let chartItems = this.props.products && 
                        _.orderBy(this.props.products, ['views'], ['desc'])
                        .slice(0, this.props.products.length >= 5 ? 5 : this.props.products.length);
        console.log(chartItems);
        
        let chartedList = chartItems.map((product, i) => {
                return(
                    <li key={product.id}>
                        <Product {...this.props} chartedList={chartItems} index={i}/>
                    </li>
                )
        });
        return(
            <div className="container">
                <div>
                    <Link title="Add New Product" to="/add">
                        <Card>
                            <Card.Body className="flex-center-child">
                                <img src={Plus} alt="Add Product" className="add-button"/>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
                <div className="heading-text mt-5">Top {chartItems.length} Viewed Products</div>
                <div>
                    {
                        chartItems.length !== 0 &&
                            <ul style={{listStyle: 'none', padding: 0}}>
                                { chartedList }
                            </ul>
                    }
                </div>
                <div className="heading-text mt-5">All products</div>
                <div>
                    { productList.length !== 0  && 
                        <ul style={{listStyle: 'none', padding: 0}}>
                            { productList}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('map state to props');
    console.log(state);
    return {
        products: state.productFeed.products,
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(ProductFeed);

// export default ProductFeed;