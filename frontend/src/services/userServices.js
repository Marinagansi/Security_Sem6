import axios from 'axios';

const baseUrl = 'http://localhost:3000/users';

const login = (credentials) => {
    return axios.post(`${baseUrl}/login`, credentials);
}

const register = (userDetails) => {
    return axios.post(`${baseUrl}/register`, userDetails);
}


export default { login, register };