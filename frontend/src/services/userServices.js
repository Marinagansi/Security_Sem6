import axios from 'axios';

const baseUrl = 'http://localhost:3000/users';

const login = (credentials) => {
    return axios.post(`${baseUrl}/login`, credentials);
}

const register = (userDetails) => {
    return axios.post(`${baseUrl}/register`, userDetails);
}

const updatePassword = (password) => {
    const config = {
        headers: { Authorization:`Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.put(`${baseUrl}/${window.localStorage.getItem('id')}`, {password}, config);
}


export default { login, register,updatePassword };