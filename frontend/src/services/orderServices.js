import axios from 'axios';

const baseUrl = 'http://localhost:3000/order';

const  addorder= ({user,products,amount,quantity}) => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.post(`${baseUrl}/`,{user,products,amount,quantity}, config);
}

const  getorders= () => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.get(`${baseUrl}`, config);
}



export default { addorder, getorders };