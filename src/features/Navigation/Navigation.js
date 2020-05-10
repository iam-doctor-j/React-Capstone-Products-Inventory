import React, { useEffect } from 'react';
import { Link, NavLink, BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './Navigation.css';
import routes from '../../constants/routes';
import { connect } from 'react-redux';
import { logout, refresh } from '../Authentication/AuthenticationSlice';
import { ProductFeedLazy, ProductDetailsLazy, UserProfileLazy, RegisterLazy, LoginLazy, AddProductLazy, EditProductLazy } from '../../constants/LazyComponents';

function Navigation(props) {
    const {loggedIn} = props;
    useEffect(() => {
        if(!loggedIn)
            props.dispatch(refresh());
    });

    return(
        <>
        <Router>
        <nav className="navbar navbar-light sticky-top bg-light navbar-expand-lg">
            <div className="container justify-content-start">
                <Link to={routes.HOME} className="navbar-brand mr-auto">Products Inventory</Link>
                <div className="ml-auto">
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
                    </li>
                    </>
                    }
                    </ul>
                </div>
            </div>
        </nav>
        <React.Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
            <Route exact path={routes.HOME} component={ProductFeedLazy} />
            <Route path={routes.REGISTER} component={RegisterLazy} />
            {loggedIn!==null ? <Route path={routes.ADD_PRODUCTS} render={(props) => (loggedIn ?<AddProductLazy {...props}/> : <Redirect to="/login" />)}/> : <></>}
            {loggedIn!==null ? <Route path={routes.EDIT_PRODUCTS} render={(props) => (loggedIn ?<EditProductLazy {...props}/> : <Redirect to="/login" />)} /> : <></>}
            <Route path={routes.LOGIN} component={LoginLazy} />
            <Route path={routes.DETAILS} component={ProductDetailsLazy} />
            <Route path={routes.USER} component={UserProfileLazy} />
        </Switch>
        </React.Suspense>
        </Router>
        </>
    );
}

export default connect(state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
    }
})(Navigation);