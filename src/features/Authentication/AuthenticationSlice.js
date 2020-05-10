import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: null,
        user: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            location: "",
            mobNumber: "",
            id: ""
        },
        error: "",
    },
    reducers: {
        onLogin: (state, action) => {
            console.log('logging in');
            console.log(action.payload.user);
            
            sessionStorage.setItem('loggedIn', action.payload.loggedIn);
            sessionStorage.setItem('loggedUser', action.payload.user ? JSON.stringify(action.payload.user) : null);
            state.loggedIn = action.payload.loggedIn;
            state.user = action.payload.user;
            state.error = action.payload.error;
        },
        onRegister: (state, action) => {
            sessionStorage.setItem('loggedIn', action.payload.loggedIn);
            sessionStorage.setItem('loggedUser', action.payload.user ? JSON.stringify(action.payload.user) : null);
            state.loggedIn = action.payload.loggedIn;
            state.user = action.payload.user;
            state.error = action.payload.error;
        },
        onLogout: (state, action) => {
            sessionStorage.setItem('loggedIn', action.payload.loggedIn);
            sessionStorage.setItem('loggedUser', action.payload.user ? JSON.stringify(action.payload.user) : null);
            state.loggedIn = action.payload.loggedIn;
            state.user = action.payload.user;
        },
        onRefresh: (state, action) => {
            state.loggedIn = action.payload.loggedIn;
            state.user = action.payload.user;
            state.error = null;
        }
    }
});

const {onLogin, onRegister, onLogout, onRefresh} = authSlice.actions;

export const login = (email, password, success, error) => dispatch => {
    let user;
    axios.get('http://localhost:4000/users?email='+email)
         .then(res => {
            if(res.data.length === 0){
                dispatch(onLogin({loggedIn: false, user: null, error: "User is not registered"}));
                error();
            } else {
                user = res.data[0];
                console.log(user)
                if(user.password === password) {
                    console.log('login success');
                    
                    dispatch(onLogin({loggedIn: true, user, error: null}));

                    success();
                } else {
                    dispatch(onLogin({loggedIn: false, user: null, error: "Invalid Password"}));
                    error();
                }
            }
         })
         .catch(err => {throw err});
}

export const register = (user, success, error) => dispatch => {
    console.log('registering');
    isUserExists(user.email)
    .then(res => {
        console.log(res.data);
        if(res.data.length === 0) {
            axios.post('http://localhost:4000/users', user)
                .then(res => {
                    dispatch(onRegister({loggedIn: true, user: res.data, error: null}));
                    success();
                })
                .catch(err => {throw err});
        } else {
            dispatch(onRegister({loggedIn: false, user: null, error: "User already registered"}));
            error();
        }
    })
    .catch(err => { throw err });
    
}

export const logout = (callback) => dispatch => {
    dispatch(onLogout({loggedIn: false, user: null}));
    if(callback)
    callback();
}

export const refresh = () => dispatch => {
    let loggedIn = sessionStorage.getItem('loggedIn') === 'true';
    let loggedUser;
    let userStr = sessionStorage.getItem('loggedUser');
    if(userStr)
        loggedUser = JSON.parse(userStr);
    dispatch(onRefresh({loggedIn, user: loggedUser}));
}

// export const isLoggedIn = (props) => {
//     return sessionStorage.getItem('loggedIn') === 'true'
// };

// export const logggedUser = () => {
//     let userStr = sessionStorage.getItem('loggedUser');
//     let user = null;
//     if(userStr)
//         user = JSON.parse(userStr);
//     return user;
// }

export const isUserExists = (email) => {
    return axios.get('http://localhost:4000/users?email='+email);
}

export default authSlice.reducer;