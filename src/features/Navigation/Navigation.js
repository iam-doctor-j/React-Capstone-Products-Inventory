import React, { useState, useEffect } from 'react';
import { Link, NavLink, BrowserRouter as Router, Switch, Route, onEnter, Redirect } from 'react-router-dom';
import LoginIcon from '../../assets/svgs/solid/sign-in-alt.svg';
import RegisterIcon from '../../assets/svgs/solid/user-plus.svg';
import './Navigation.css';
import Login from '../Authentication/Login/Login';
import Register from '../Authentication/Register/Register';
import ProductFeed from '../ProductFeed/ProductFeed';
import AddProduct from '../ProductFeed/AddProduct/AddProduct';
import EditProduct from '../ProductFeed/EditProduct/EditProduct';
import routes from '../../constants/routes';
import { connect } from 'react-redux';
import { logout, refresh } from '../Authentication/AuthenticationSlice';
import ProductDetails from '../ProductFeed/ProductDetails/ProductDetails';
import UserProfile from '../Authentication/UserProfile/UserProfile';

function Navigation(props) {
    // const [_, refresh] = useState({});
    const {loggedIn, user} = props;
    useEffect(() => {
        if(!loggedIn)
            props.dispatch(refresh());
    });

    const isLoggedIn = () => loggedIn;
    return(
        <>
        <Router>
        <nav className="navbar navbar-light sticky-top bg-light navbar-expand-lg">
            <div className="container justify-content-start">
                <Link to={routes.HOME} className="navbar-brand mr-auto">Products Inventory</Link>
                <div className="">
                    <ul className="navbar-nav">
                    { !loggedIn? 
                    <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={routes.LOGIN} activeClassName="active">
                                <span>Login <i className="fas fa-sign-in-alt"></i></span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={routes.REGISTER} activeClassName="active">
                                <span>Register <i className="fas fa-user-plus"></i></span>
                            </NavLink>
                        </li>
                    </> : 
                    <>
                    <li className="nav-item">
                        <NavLink title="User Profile" className="nav-link" to={routes.USER} activeClassName="active">
                            <i className="fas fa-user"></i>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a title="Logout" className="nav-link" href="#" onClick={() => {props.dispatch(logout())}}>
                            <i className="fas fa-sign-out-alt"></i>
                        </a>
                        {/* <NavLink className="nav-link" to={routes.REGISTER} activeClassName="active">
                            <span>Register <i class="fas fa-user-plus"></i></span>
                        </NavLink> */}
                    </li>
                    </>
                    }
                    </ul>
                </div>
            </div>
        </nav>
        <Switch>
            <Route exact path={routes.HOME} component={ProductFeed} />
            <Route path={routes.REGISTER} component={Register} />
            <Route path={routes.ADD_PRODUCTS} render={(props) => (isLoggedIn() ?<AddProduct {...props}/> : <Redirect to="/login" />)}/>
            <Route path={routes.EDIT_PRODUCTS} render={(props) => (isLoggedIn() ?<EditProduct {...props}/> : <Redirect to="/login" />)} />
            <Route path={routes.LOGIN} component={Login} />
            <Route path={routes.DETAILS} component={ProductDetails} />
            <Route path={routes.USER} component={UserProfile} />
        </Switch>
        </Router>
        </>
    );
}

export default connect(state => {
    console.log(state);
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
    }
})(Navigation);