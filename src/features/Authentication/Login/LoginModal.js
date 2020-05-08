import React from 'react';
import { Form, Field, withFormik } from 'formik';
import loading from '../../../assets/loading.svg';
// import { login } from '../authProvider';
import { connect } from 'react-redux';
import { login } from '../AuthenticationSlice';
import Modal from 'react-bootstrap/Modal';

const LoginForm = (props) => {
    const {errors, touched, isSubmitting} = props;
    console.log(props);
    return(
        <Modal show={true}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <div>
                    <Field type="text" name="email" placeholder="Enter Username"/>
                    {touched.usrname && errors.usrname && <span style={{color: 'red'}}>{errors.usrname}</span> }
                </div>
                <div>
                    <Field type="password" name="password" placeholder="Enter password"/>
                </div>
                <button style={{width: 100, padding: 10}} type="submit" disabled={isSubmitting}>{!isSubmitting ? <span>Login</span> : <img height="10" width="10" src={loading}/>}</button>
            </Form>
            </Modal.Body>
        </Modal>
        // <div>
            
        // </div>
    );
};

const Login = withFormik({
    mapPropsToValues(){
        return {
            email: '',
            password: ''
        }
    },
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