import React from 'react';
import Card from 'react-bootstrap/Card';
import { refresh } from '../Authentication/AuthenticationSlice';
import { connect } from 'react-redux';

export const About = (props) => {
    return(
        <>
            <div className="container">
                <div className="row justify-content-center">
                <Card className="col-12 col-md-8 col-lg-6">
                    <Card.Body>
                        <Card.Title>
                            <div className="d-flex">
                                <span className="heading-text">About</span>
                                <a className="ml-auto" onClick={() => {props.dispatch(refresh()); props.history.goBack()}} style={{cursor: 'pointer', color: 'var(--secondary)'}}><i className="fas fa-arrow-circle-left"></i></a>
                            </div>
                        </Card.Title>
                        <div>
                            <p>Get a list of products, created by you or by others.</p>
                            <p>Add your own product, manage, delete and a lot of stuff.</p>
                        </div>
                    </Card.Body>
                </Card>
                </div>
            </div>
        </>
    );
}

export default connect()(About);