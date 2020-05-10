import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { fromString } from 'uuidv4';
import { addProductToDb } from '../ProductFeedSlice';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { refresh } from '../../Authentication/AuthenticationSlice';
import { toast } from 'react-toastify';

const AddProductForm = (props) => {
    const {touched, errors, isSubmitting} = props;
    return(
        <div className="container">
        <div className="row justify-content-center">
            <Card className="col-12 col-md-8 col-lg-6">
                <Card.Body>
                    <Card.Title>
                    <div className="d-flex">
                        <span className="heading-text">Add new product</span>
                        <a className="ml-auto" onClick={() => {props.dispatch(refresh()); props.history.goBack()}} style={{cursor: 'pointer', color: 'var(--secondary)'}}><i className="fas fa-arrow-circle-left"></i></a>
                    </div>
                    
                    </Card.Title>
                    <Form>
                        <div className="form-group">
                            <label className="label-text">Product Name</label>
                            <Field className="form-control" type="text" name="prodName" placeholder="Enter Product Name" />
                            {touched.prodName && errors.prodName && <span className="label-text" style={{color: 'red'}}>{errors.prodName}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Product Description</label>
                            <Field className="form-control" type="text" component="textarea" name="prodDesc" placeholder="Enter Product Description" />
                            {touched.prodDesc && errors.prodDesc && <span className="label-text" style={{color: 'red'}}>{errors.prodDesc}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Product manufacturer</label>
                            <Field className="form-control" type="text" name="manufacturer" placeholder="Enter Product manufacturer" />
                            {touched.manufacturer && errors.manufacturer && <span className="label-text" style={{color: 'red'}}>{errors.manufacturer}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Price</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">₹</div>
                                </div>
                            <Field className="form-control" type="number" name="price" placeholder="Enter Price" />
                            </div>
                            {touched.price && errors.price && <span className="label-text" style={{color: 'red'}}>{errors.price}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Quantity</label>
                            <Field className="form-control" type="text" name="quantity" placeholder="Enter Quantity" />
                            {touched.quantity && errors.quantity && <span className="label-text" style={{color: 'red'}}>{errors.quantity}</span>}
                        </div>
                        <button className="btn btn-secondary" type="submit" disabled={isSubmitting}>{!isSubmitting ? <span>Add Product</span> : <span>Adding...</span>}</button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        </div>
    );
}

const AddProduct = withFormik({
    mapPropsToValues({productName, productDesc, productManufac, productPrice, productQuantity}) {
        return {
            prodName: productName || '',
            prodDesc: productDesc || '',
            manufacturer: productManufac || '',
            price: productPrice || '',
            quantity: productQuantity || '',
        };
    },
    validationSchema: Yup.object().shape({
        prodName: Yup.string().required('This field is required'),
        prodDesc: Yup.string().required('This field is required'),
        manufacturer: Yup.string().required('This field is required'),
        price: Yup.number().positive('Price cannot be negative').required('This field is required'),
        quantity: Yup.number().min(1, 'Quantity should be atleast 1').required('This field is required')
    }),
    handleSubmit(values, { props }) {
        let product = {
            "id": fromString(JSON.stringify(values)+Date.now().toString()),
            "views": 0,
            "name": {
                "value": values.prodName,
                "visible": true,
            },
            "description": {
                "value": values.prodDesc,
                "visible": true,
            },
            "manufacturer": {
                "value": values.manufacturer,
                "visible": true,
            },
            "price": {
                "value": +values.price,
                "visible": true,
            },
            "quantity": {
                "value": +values.quantity,
                "visible": true,
            },
        
        };
        props.dispatch(addProductToDb(product, () => {
            toast.success('Product Added!');
            props.history.goBack();
        }));
    }
})(AddProductForm);

export default connect()(AddProduct);

// export default AddProduct;