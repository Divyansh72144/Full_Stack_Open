import axios from "axios";
const baseUrl = "/api/blogs";
const loginUrl = "/api/login";

let token = null

const setToken=newToken=>{
    token=`Bearer ${newToken}`
}

const login = async credentials => {
    const response = await axios.post(loginUrl, credentials);
    return response.data;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = async newObject =>{
    const config ={
        headers:{Authorization: token}
    }
    const response = await axios.post(baseUrl, newObject, config)  
    return response.data
}

export default { getAll ,login, setToken};