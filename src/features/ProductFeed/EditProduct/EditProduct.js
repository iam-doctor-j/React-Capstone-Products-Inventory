import React from 'react';
import { Form, Field, withFormik } from 'formik';
import { uuid, fromString } from 'uuidv4';
import './EditProduct.css'
import { connect } from 'react-redux';
import * as Yup from 'yup';
import * as _ from 'lodash';
import { fetchProductsFromDb, editProductToDb } from '../ProductFeedSlice';
import Card from 'react-bootstrap/Card';

const EditProductForm = (props) => {
    const {touched, errors, isSubmitting} = props;
    console.log(props);
    return(
        <div className="container">
        <div className="row justify-content-center">
            {/* <h1>Edit Product</h1> */}
            <Card className="col-12 col-md-8 col-lg-6">
                <Card.Body>
                    <Card.Title>
                    <div className="d-flex">
                        <span className="heading-text">Edit product</span>
                        <a className="ml-auto" onClick={props.history.goBack} style={{cursor: 'pointer', color: 'var(--secondary)'}}><i className="fas fa-arrow-circle-left"></i></a>
                    </div>
                    
                    </Card.Title>
                    <Form>
                        <div className="form-group">
                            <label className="label-text">Product Name</label>
                            <Field className="form-control" type="text" name="prodName" placeholder="Enter Product Name" />
                            {touched.prodName && errors.prodName && <span style={{color: 'red'}}>{errors.prodName}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Product Description</label>
                            <Field className="form-control" type="text" component="textarea" name="prodDesc" placeholder="Enter Product Description" />
                            {touched.prodDesc && errors.prodDesc && <span style={{color: 'red'}}>{errors.prodDesc}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Product Manufacturer</label>
                            <Field className="form-control" type="text" name="manufacturer" placeholder="Enter Product manufacturer" />
                            {touched.manufacturer && errors.manufacturer && <span style={{color: 'red'}}>{errors.manufacturer}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Price</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">₹</div>
                                </div>
                            <Field className="form-control" type="number" name="price" placeholder="Enter Price" />
                            </div>
                            {touched.price && errors.price && <span style={{color: 'red'}}>{errors.price}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Quantity</label>
                            <Field className="form-control" type="text" name="quantity" placeholder="Enter Quantity" />
                            {touched.quantity && errors.quantity && <span style={{color: 'red'}}>{errors.quantity}</span>}
                        </div>
                        <div className="mb-4">
                            <p className="label-text">Toggle visibility</p>
                            <div className="d-flex justify-content-around">
                                <div>
                                    <div className="tag">Name</div>
                                    <div className="checkbox-container">
                                    <Field className="regular-checkbox" type="checkbox" id="nameVisibility" name="nameVisibility"/>
                                    <label className="cb-label" htmlFor="nameVisibility"></label>
                                    </div>
                                </div>
                                <div>
                                    <div className="tag">Description</div>
                                    <div className="checkbox-container">
                                    <Field className="regular-checkbox" type="checkbox" id="descVisibility" name="descVisibility"/>
                                    <label className="cb-label" htmlFor="descVisibility"></label>
                                    </div>
                                </div>
                                <div>
                                    <div className="tag">Manufacturer</div>
                                    <div className="checkbox-container">
                                    <Field className="regular-checkbox" type="checkbox" id="manufacVisibility" name="manufacVisibility"/>
                                    <label className="cb-label" htmlFor="manufacVisibility"></label>
                                    </div>
                                </div>
                                <div>
                                    <div className="tag">Price</div>
                                    <div className="checkbox-container">
                                    <Field className="regular-checkbox" type="checkbox" id="priceVisibility" name="priceVisibility"/>
                                    <label className="cb-label" htmlFor="priceVisibility"></label>
                                    </div>
                                </div>
                                <div>
                                    <div className="tag">Quantity</div>
                                    <div className="checkbox-container">
                                    <Field className="regular-checkbox" type="checkbox" id="quantityVisibility" name="quantityVisibility"/>
                                    <label className="cb-label" htmlFor="quantityVisibility"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-secondary" type="submit" disabled={isSubmitting}>{isSubmitting ? <span>Saving...</span> : <span>Save</span>}</button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        </div>
    );
}

const EditProduct = withFormik({
    mapPropsToValues(props) {
        console.log('mappropstovalues');
        console.log(props);
        if(props.products.length == 0){
            props.dispatch(fetchProductsFromDb());
            return {
                prodName: '',
                prodDesc: '',
                manufacturer: '',
                price: '',
                quantity: '',
                nameVisibility: false,
                descVisibility: false,
                manufacVisibility: false,
                priceVisibility: false,
                quantityVisibility: false,
            };
        }
        let product = _.find(props.products, prod => {
            return prod.id === props.match.params.id
        });
        console.log(product);
        return {
            prodName: product.name.value,
            prodDesc: product.description.value,
            manufacturer: product.manufacturer.value,
            price: product.price.value,
            quantity: product.quantity.value,
            nameVisibility: product.name.visible,
            descVisibility: product.description.visible,
            manufacVisibility: product.manufacturer.visible,
            priceVisibility: product.price.visible,
            quantityVisibility: product.quantity.visible,
        }
    },
    validationSchema: Yup.object().shape({
        prodName: Yup.string().required('This field is required'),
        prodDesc: Yup.string().required('This field is required'),
        manufacturer: Yup.string().required('This field is required'),
        price: Yup.number().positive('Price cannot be negative').required('This field is required'),
        quantity: Yup.number().min(1, 'Quantity should be atleast 1').required('This field is required')
    }),
    handleSubmit(values, {setSubmitting, props}) {
        console.log(props);
        let product = {
            "id": fromString(JSON.stringify(values)+Date.now().toString()),
            "name": {
                "value": values.prodName,
                "visible": values.nameVisibility || false,
            },
            "description": {
                "value": values.prodDesc,
                "visible": values.descVisibility || false,
            },
            "manufacturer": {
                "value": values.manufacturer,
                "visible": values.manufacVisibility || false,
            },
            "price": {
                "value": +values.price,
                "visible": values.priceVisibility || false,
            },
            "quantity": {
                "value": +values.quantity,
                "visible": values.quantityVisibility || false,
            },
        };
        console.log(product);
        props.dispatch(editProductToDb(props.match.params.id, product));
    },
    enableReinitialize: true
})(EditProductForm);

export default connect(state => {
    console.log(state);
    return {
        products: state.productFeed.products
    }
})(EditProduct);