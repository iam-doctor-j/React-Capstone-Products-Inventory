import React, {  } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default class Product extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        const {isInDeleteList} = nextProps;
        if(isInDeleteList!==this.props.isInDeleteList)
            return true;
        return false;
    }
    
    render() {
        let product;
        if(this.props.chartedList){
            product = this.props.chartedList[this.props.index]
        }else{
            product = this.props.products[this.props.index];
        }
    
        const handleChange = ({target}) => {
            if(target.checked) {
                
                this.props.addToDeleteList(product);
            } else {
                this.props.removeFromDeleteList(product.id);
            }
        }
        return(
            <Card>
                <Link title="View Product Details" className="product-link" to={'/details/' + product.id}>
                    <div className="row">
                        {
                            product.name.visible &&
                        <div className="col-12 col-lg-6">
                            <Card.Body>
                                <Card.Subtitle className="text-muted label-text">Name</Card.Subtitle>
                                <Card.Text>{product.name.value}</Card.Text>
                            </Card.Body>
                        </div>
                        }
                        {
                            product.price.visible &&
                        <div className="col-6 col-lg-3">
                            <Card.Body>
                                <Card.Subtitle className="text-muted label-text">Price</Card.Subtitle>
                                <Card.Text>{product.price.value}</Card.Text>
                            </Card.Body>
                        </div>
                        }
                        {
                            product.quantity.visible &&
                        <div className="col-6 col-lg-3">   
                            <Card.Body>
                                <Card.Subtitle className="text-muted label-text">Quantity</Card.Subtitle>
                                <Card.Text>{product.quantity.value}</Card.Text>
                            </Card.Body>
                        </div>
                        }
                    </div>
                    <div className="row">
                        {
                            product.description.visible &&
                        <div className="col-12 order-last col-lg-6">
                            <Card.Body>
                                <Card.Subtitle className="text-muted label-text">Description</Card.Subtitle>
                                <Card.Text>{product.description.value}</Card.Text>
                            </Card.Body>
                        </div>
                        }
                        {
                            product.manufacturer.visible &&
                        <div className="col-12 order-4 col-lg-6">
                            <Card.Body>
                                <Card.Subtitle className="text-muted label-text">Manufacturer</Card.Subtitle>
                                <Card.Text>{product.manufacturer.value}</Card.Text>
                            </Card.Body>
                        </div>
                        }
                        
                    </div>
                </Link>
                <hr/>
                <div className="row align-items-center">
                    <div className="col-8">
                        <Card.Body className="text-center">
                        <Link title="Edit Product" to={"/edit/"+product.id}><button className="btn btn-secondary w-100 h-100"><i className="fas fa-edit"></i></button></Link>
                        </Card.Body>
                    </div>
                    <div className="col-4">
                        <Card.Body className="d-flex align-items-center cb-label justify-content-center">
                            <input className="regular-checkbox" id={product.id} type="checkbox" onChange={handleChange} checked={this.props.isInDeleteList}/>
                            <label title="Select to delete" className="cb-label" htmlFor={product.id}></label>
                        </Card.Body>
                    </div>
                    
                </div>
            </Card>
        );
    }
}