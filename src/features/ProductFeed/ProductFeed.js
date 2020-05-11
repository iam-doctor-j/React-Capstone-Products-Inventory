import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Plus from '../../assets/svgs/solid/plus.svg';
import './ProductFeed.css';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { fetchProductsFromDb, addProductToDeleteListFirst, removeProductToDeleteListFirst, searchProducts } from './ProductFeedSlice';
import Product from './Product/Product';
import FloatingDeleteButton from '../FloatingDeleteButton/FloatingDeleteButton';
import routes from '../../constants/routes';

class ProductFeed extends React.Component {
    constructor(props) {
        super(props);
        this.searchText = React.createRef();
    }
    
    componentDidMount() {
        if(this.props.products.length === 0)
            this.props.dispatch(fetchProductsFromDb());
    }

    addToDeleteList = (product) => {
        this.props.dispatch(addProductToDeleteListFirst(product));
    }

    removeFromDeleteList = (id) => {
        this.props.dispatch(removeProductToDeleteListFirst(id));
    }

    isInDeleteList = (id) => {
        if(this.props.deleteList.length === 0)
            return false;
        let arr = _.find(this.props.deleteList, prod => prod.id === id);
        if(!arr)
            return false;
        else 
            return true;
    } 

    handleSearchOver = ({target}) => {
        if(target.value === '') {
            this.props.dispatch(fetchProductsFromDb());
        }
    }

    render() {
        
        let productList = this.props.products && this.props.products.map((product, i) => {
            return(
                <li key={product.id}>
                    <Product {
                        ...{
                            ...this.props, 
                            addToDeleteList: this.addToDeleteList, 
                            removeFromDeleteList: this.removeFromDeleteList,
                            isInDeleteList: this.isInDeleteList(product.id)
                        }
                    } 
                    index={i}
                    />
                </li>
            );
        });
        return(
            <div className="container h-100">
                <FloatingDeleteButton {...this.props}/>
            
                <div className="row mt-3">
                    <div className="col-12 col-md-6">
                    <Link title="Add New Product" to="/add">
                        <Card>
                            <Card.Body className="flex-center-child">
                                <img src={Plus} alt="Add Product" className="add-button"/>
                            </Card.Body>
                        </Card>
                    </Link>
                    </div>
                    <div className="col-12 col-md-6">
                    <Card>
                        <Card.Body className="form-inline d-flex">
                            <input type="text" className="form-control search-box flex-grow-1" ref={this.searchText} placeholder="search products" onChange={this.handleSearchOver}/>
                            <button className="btn btn-link text-secondary" onClick={() => this.props.dispatch(searchProducts(this.searchText.current.value))}><i className="fas fa-search"></i></button>
                        </Card.Body>
                    </Card>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <Card>
                            <Card.Body>
                                <Link to={routes.CHART} className="btn btn-outline-secondary w-100 label-text">
                                    top products chart
                                    <i className="far fa-chart-bar ml-1"></i>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="heading-text mt-3">All products</div>
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
    return {
        products: state.productFeed.products,
        loggedIn: state.auth.loggedIn,
        deleteList: state.productFeed.deleteList,
    }
}

export default connect(mapStateToProps)(ProductFeed);

// export default ProductFeed;