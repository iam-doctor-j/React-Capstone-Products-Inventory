import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { deleteProductFromDb } from '../ProductFeedSlice';
import routes from '../../../constants/routes';

export default function Product(props) {
    let product;
    if(props.chartedList){
        product = props.chartedList[props.index]
    }else{
        product = props.products[props.index];
    }
    console.log(props);
    
    return(
        <Card>
            <Link title="View Product Details" className="product-link" to={'/details/' + product.id}>
                <div className="row">
                    <div className="col-12 order-1 col-lg-6">
                        <Card.Body>
                            <Card.Subtitle className="text-muted">Name</Card.Subtitle>
                            <Card.Text>{product.name.value}</Card.Text>
                        </Card.Body>
                    </div>
                    <div className="col-12 order-last col-lg-6">
                        <Card.Body>
                            <Card.Subtitle className="text-muted">Description</Card.Subtitle>
                            <Card.Text>{product.description.value}</Card.Text>
                        </Card.Body>
                    </div>
                    <div className="col-12 order-4 col-lg-6">
                        <Card.Body>
                            <Card.Subtitle className="text-muted">Manufacturer</Card.Subtitle>
                            <Card.Text>{product.manufacturer.value}</Card.Text>
                        </Card.Body>
                    </div>
                    <div className="col-6 order-2 col-lg-3">
                        <Card.Body>
                            <Card.Subtitle className="text-muted">Price</Card.Subtitle>
                            <Card.Text>{product.price.value}</Card.Text>
                        </Card.Body>
                    </div>
                    <div className="col-6 order-3 col-lg-3">
                        <Card.Body>
                            <Card.Subtitle className="text-muted">Quantity</Card.Subtitle>
                            <Card.Text>{product.quantity.value}</Card.Text>
                        </Card.Body>
                    </div>
                </div>
            </Link>
            <hr/>
            <div className="row">
                <div className="col-6">
                    <Card.Body className="text-center">
                    <Link title="Edit Product" to={"/edit/"+product.id}><button className="btn btn-secondary w-100 h-100"><i className="fas fa-edit"></i></button></Link>
                    </Card.Body>
                </div>
                <div className="col-6">
                    <Card.Body className="text-center">
                    <a title="Delete Product" onClick={ () => {
                        if(props.loggedIn)
                            props.dispatch(deleteProductFromDb(product.id)) 
                        else
                            props.history.push(routes.LOGIN);
                        } }>
                            <button className="btn btn-danger w-100 h-100">
                                <i className="far fa-trash-alt"></i>
                            </button>
                    </a>
                    </Card.Body>
                </div>
            </div>
        </Card>
    );
}