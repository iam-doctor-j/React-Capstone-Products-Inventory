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
          }
    },
    reducers: {
        onLogin: (state, action) => {
            console.log('logging in');
            console.log(action.payload.user);
            
            sessionStorage.setItem('loggedIn', action.payload.loggedIn);
            sessionStorage.setItem('loggedUser', action.payload.user ? JSON.stringify(action.payload.user) : null);
            state.loggedIn = action.payload.loggedIn;
            state.user = action.payload.user;
        },
        onRegister: (state, action) => {
            sessionStorage.setItem('loggedIn', action.payload.loggedIn);
            sessionStorage.setItem('loggedUser', action.payload.user ? JSON.stringify(action.payload.user) : null);
            state.loggedIn = action.payload.loggedIn;
            state.user = action.payload.user;
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
        }
    }
});

const {onLogin, onRegister, onLogout, onRefresh} = authSlice.actions;

export const login = (email, password, callback) => dispatch => {
    let user;
    axios.get('http://localhost:4000/users?email='+email)
         .then(res => {
            if(res.data.length === 0){
                alert('Invalid Email');
                dispatch(onLogin({loggedIn: false, user: null}));
            } else {
                user = res.data[0];
                console.log(user)
                if(user.password === password) {
                    console.log('login success');
                    
                    dispatch(onLogin({loggedIn: true, user}));
                } else {
                    alert('Incorrect Password')
                    dispatch(onLogin({loggedIn: false, user: null}));
                }
            }
            
            callback();
         })
         .catch(err => {throw err});
}

export const register = (user, callback) => dispatch => {
    axios.post('http://localhost:4000/users', user)
         .then(res => {
             dispatch(onRegister({loggedIn: true, user: res.data}));
             callback();
         })
         .catch(err => {throw err});
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