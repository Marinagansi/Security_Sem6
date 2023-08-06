import axios from "axios";
const baseUrl = "http://localhost:3000/product";

function getAllproduct() {
  
    return axios.get(baseUrl);
}

export default { getAllproduct};