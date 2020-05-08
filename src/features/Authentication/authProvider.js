import Axios from "axios"

let loggedIn = false;

export const isLoggedIn = () => sessionStorage.getItem('loggedIn');

export async function register(user) {
    Axios.post('http://localhost:4000/users', user)
         .then();
}

export async function login(email, password) {
    let user;

    await Axios.get('http://localhost:4000/users?email='+email)
               .then(res => { user = res.data })
               .catch(err => { throw err });
console.log(user);
console.log(password);
    if(user.length !== 0 && user[0].password === password) {
        loggedIn = true;
        sessionStorage.setItem('loggedIn', loggedIn);
    }
}

export async function isUserExists(email) {
    let user;

    Axios.get('http://localhost:4000/users?email='+email)
               .then(res => { user = res.data })
               .catch(err => { throw err });
    
    if(user) {
        return true;
    }
    return false;
}

export const logout = () => {
    console.log('logging out')
    loggedIn = false
    sessionStorage.removeItem('loggedIn');
};