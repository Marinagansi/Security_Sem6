import axios from "axios";
const baseUrl = "http://localhost:3000/users";

function getAll() {
  
    return axios.get(baseUrl);
}


export default {getAll}