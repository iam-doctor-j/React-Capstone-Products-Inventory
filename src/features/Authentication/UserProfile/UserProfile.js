import React, { useEffect } from 'react';
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { refresh } from "../AuthenticationSlice";

export function UserProfile(props) {
    
    useEffect(() => {
        if(!props.user)
            props.dispatch(refresh());
    }, [])

    return(
        <div className="container">
            <div className="row justify-content-center">
                <Card className="col-12 col-md-8 col-lg-6">
                    <Card.Body>
                        <Card.Title className="mb-4">
                            <div className="d-flex">
                                <span className="heading-text">User Profile</span>
                                <a className="ml-auto" onClick={props.history.goBack} style={{cursor: 'pointer', color: 'var(--secondary)'}}><i className="fas fa-arrow-circle-left"></i></a>
                            </div>
                        </Card.Title>
                        <div className="mb-3">
                            <div className="label-text">First Name</div>
                            <div>{props.user.firstName}</div>
                        </div>
                        <div className="mb-3">
                            <div className="label-text">Last Name</div>
                            <div>{props.user.lastName}</div>
                        </div>
                        <div className="mb-3">
                            <div className="label-text">Email</div>
                            <div>{props.user.email}</div>
                        </div>
                        <div className="mb-3">
                            <div className="label-text">Mobile Number</div>
                            <div>{props.user.mobNumber}</div>
                        </div>
                        <div className="mb-3">
                            <div className="label-text">Location</div>
                            <div>{props.user.location}</div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default connect(state => {
    let user = null;
    if(state.auth.user) {
        user = state.auth.user;
    }

    return { user };
})(UserProfile);