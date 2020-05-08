import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import loading from '../../../assets/loading.svg';
import { register } from '../authProvider';
import Card from 'react-bootstrap/Card';
import { fromString } from 'uuidv4';

const RegisterForm = (props) => {
    const {touched, errors, isSubmitting} = props;
    return(
        <div className="container">
        <div className="row justify-content-center">
            {/* <h1>Register</h1> */}
            <Card className="col-12 col-md-8 col-lg-6">
                <Card.Body>
                    <Card.Title>
                        <div className="d-flex">
                            <span className="heading-text">Add new product</span>
                            <a className="ml-auto" onClick={props.history.goBack} style={{cursor: 'pointer', color: 'var(--secondary)'}}><i className="fas fa-arrow-circle-left"></i></a>
                        </div>
                    </Card.Title>
                    <Form>
                        <div className="form-group">
                            <label className="label-text">Email</label>
                            <Field className="form-control" type="text" name="email" placeholder="Enter email" />
                            {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Password</label>
                            <Field className="form-control" type="password" name="password" placeholder="Enter password" />
                            {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">First Name</label>
                            <Field className="form-control" type="text" name="firstName" placeholder="Enter First Name" />
                            {touched.firstName && errors.firstName && <span style={{color: 'red'}}>{errors.firstName}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Last Name</label>
                            <Field className="form-control" type="text" name="lastName" placeholder="Enter Last Name" />
                            {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Location</label>
                            <Field className="form-control" type="text" name="location" placeholder="Enter Location" />
                            {touched.location && errors.location && <span style={{color: 'red'}}>{errors.location}</span>}
                        </div>
                        <div className="form-group">
                            <label className="label-text">Mobile number</label>
                            <Field className="form-control" type="text" name="mobNumber" placeholder="Enter Mobile Number" />
                            {touched.mobNumber && errors.mobNumber && <span style={{color: 'red'}}>{errors.mobNumber}</span>}
                        </div>
                        <button className="btn btn-secondary" type="submit" disabled={isSubmitting}>{!isSubmitting ? <span>Register</span> : <span>Registering...</span>}</button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        </div>
    )};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Register = withFormik({
    mapPropsToValues() {
        return {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            location: '',
            mobNumber: ''
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Enter a valid email').required('This field is required'),
        password: Yup.string().required('This field is required'),
        firstName: Yup.string().min(3, 'First Name should be minimum 3 characters long').required('This field is required'),
        lastName: Yup.string().required('This field is required'),
        location: Yup.string().min(3, 'Location should be atleast 3 characters long').required('This field is required'),
        mobNumber: Yup.string().matches(phoneRegExp, 'Enter a valid phone number').required('This field is required')
    }),
    handleSubmit(values, { resetForm, setSubmitting, setErrors, props }) {
        console.log(values);
        let user = {
            id: fromString(JSON.stringify(values)+Date.now().toString()),
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            location: values.location,
            mobNumber: values.mobNumber,
        }
        register(user).then(res => {
            console.log(res);
            setSubmitting(false);
        });
    }
})(RegisterForm);

export default Register;