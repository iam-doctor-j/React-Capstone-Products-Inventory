import React from 'react';
import Card from "react-bootstrap/Card";
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { fetchProductsFromDb, viewProductFromDb } from '../ProductFeedSlice';

class ProductDetails extends React.Component {
    
    componentDidMount() {
        this.props.dispatch(viewProductFromDb(this.props.match.params.id));
        if(!this.props.product) {
            this.props.dispatch(fetchProductsFromDb());
        }
    }

    render() {
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <Card className="col-12 col-md-8 col-lg-6">
                        <Card.Body>
                            <Card.Title className="mb-4">
                                <div className="d-flex">
                                    <span className="heading-text">Details</span>
                                    <a className="ml-auto" onClick={this.props.history.goBack} style={{cursor: 'pointer', color: 'var(--secondary)'}}><i className="fas fa-arrow-circle-left"></i></a>
                                </div>
                            </Card.Title>
                            <div className="mb-3">
                                <div className="label-text">Product Name</div>
                                <div>{this.props.product && this.props.product.name.value}</div>
                            </div>
                            <div className="mb-3">
                                <div className="label-text">Product Description</div>
                                <div>{this.props.product && this.props.product.description.value}</div>
                            </div>
                            <div className="mb-3">
                                <div className="label-text">Product Manufacturer</div>
                                <div>{this.props.product && this.props.product.manufacturer.value}</div>
                            </div>
                            <div className="mb-3">
                                <div className="label-text">Product Price</div>
                                <div>{this.props.product && this.props.product.price.value}</div>
                            </div>
                            <div className="mb-3">
                                <div className="label-text">Product Quantity</div>
                                <div>{this.props.product && this.props.product.quantity.value}</div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    console.log(ownProps);
    console.log(state);
    let id = ownProps.match.params.id;
    let product;
    if(state.productFeed.products && state.productFeed.products.length!==0) {
        product = _.find(state.productFeed.products, product => product.id === id);
    }
    return {
        product
    }
})(ProductDetails);