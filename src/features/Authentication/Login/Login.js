import React from 'react';
import { Form, Field, withFormik } from 'formik';
import { connect } from 'react-redux';
import { login, refresh } from '../AuthenticationSlice';
import Card from 'react-bootstrap/Card';
import * as Yup from 'yup';
import routes from '../../../constants/routes';

const LoginForm = (props) => {
    const {errors, touched, isSubmitting, error} = props;
    return(
        <div className="container">
        <div className="row justify-content-center">
            <Card className="col-12 col-md-8 col-lg-6">
                {/* <h1>Login</h1> */}
                <Card.Body>
                    <Card.Title>
                    <div className="d-flex">
                        <span className="heading-text">Login</span>
                        <a className="ml-auto" onClick={() => {props.dispatch(refresh()); props.history.goBack()}} style={{cursor: 'pointer', color: 'var(--secondary)'}}><i className="fas fa-arrow-circle-left"></i></a>
                    </div>
                    </Card.Title>
                    <Form>
                        <div className="form-group">
                            <label className="label-text">Email</label>
                            <Field className="form-control" type="text" name="email" placeholder="Enter Username"/>
                            {touched.email && errors.email && <span className="label-text" style={{color: 'red'}}>{errors.email}</span> }
                        </div>
                        <div className="form-group">
                            <label className="label-text">Password</label>
                            <Field className="form-control" type="password" name="password" placeholder="Enter password"/>
                            {touched.password && errors.password && <span className="label-text" style={{color: 'red'}}>{errors.password}</span> }
                        </div>
                        <button className="btn btn-secondary label-text" type="submit" disabled={isSubmitting}>{!isSubmitting ? <span>Login</span> : <span>Logging in...</span>}</button>
                        <br/>
                        {error && <span className="label-text" style={{color: 'red'}}>{error}</span>}
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
        props.dispatch(login(values.email, values.password, () => {
            setSubmitting(false);
            props.history.replace(routes.HOME);
        }, () => {
            setSubmitting(false);
        }));
    }
})(LoginForm);

export default connect(state => {
    return {
        error: state.auth.error
    }
})(Login);