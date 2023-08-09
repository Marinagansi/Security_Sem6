import axios from "axios";
const baseUrl = "http://localhost:3000/cart";

function addtocart({id,quantity,prices}) {
    const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    };
    return axios.post(baseUrl,{id,quantity,prices}, config);
}

const getCartItems=()=>{
    const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    };
    return axios.get(`${baseUrl}/user/${window.localStorage.getItem('id')}`,config)
}

const deleteCartItems= (id) => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.delete(`${baseUrl}/${id}`, config);
}

const clearcart = () => {
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    return axios.delete(`${baseUrl}/user/${window.localStorage.getItem('id')}`, config);
}

export default {addtocart,getCartItems, deleteCartItems, clearcart}

