import axios from "axios";
const baseUrl = "http://localhost:3000/university";

function getAlluni() {
  
    return axios.get(baseUrl);
}


const adduni = (credentials) => {
    return axios.post(`${baseUrl}`, credentials);
}

function deleteuni(id) {
    return axios.delete(`${baseUrl}/${id}`);
}

export default {getAlluni,adduni,deleteuni};