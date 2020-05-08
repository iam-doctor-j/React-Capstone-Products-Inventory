import React from 'react';
import { Form, Field, withFormik } from 'formik';
import loading from '../../../assets/loading.svg';
// import { login } from '../authProvider';
import { connect } from 'react-redux';
import { login } from '../AuthenticationSlice';
import Card from 'react-bootstrap/Card';
import * as Yup from 'yup';

const LoginForm = (props) => {
    const {errors, touched, isSubmitting} = props;
    console.log(props);
    return(
        <div className="container">
        <div className="row justify-content-center">
            <Card className="col-12 col-md-8 col-lg-6">
                {/* <h1>Login</h1> */}
                <Card.Body>
                    <Card.Title>
                    <div className="d-flex">
                        <span className="heading-text">Login</span>
                        <a className="ml-auto" onClick={props.history.goBack} style={{cursor: 'pointer', color: 'var(--secondary)'}}><i className="fas fa-arrow-circle-left"></i></a>
                    </div>
                    </Card.Title>
                    <Form>
                        <div className="form-group">
                            <label className="lable-text">Email</label>
                            <Field className="form-control" type="text" name="email" placeholder="Enter Username"/>
                            {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span> }
                        </div>
                        <div className="form-group">
                            <label className="lable-text">Password</label>
                            <Field className="form-control" type="password" name="password" placeholder="Enter password"/>
                            {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span> }
                        </div>
                        <button className="btn btn-secondary" type="submit" disabled={isSubmitting}>{!isSubmitting ? <span>Login</span> : <span>Logging in...</span>}</button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        </div>
    );
};

const Login = withFormik({
    mapPropsToValues(){
        return {
            email: '',
            password: ''
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Enter a valid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    }),
    handleSubmit(values, { resetForm, setSubmitting, setErrors, props }) {
        console.log(values);
        props.dispatch(login(values.email, values.password, () => {
            props.history.goBack();
        }));
    }
})(LoginForm);

export default connect(state => {
    return {}
})(Login);