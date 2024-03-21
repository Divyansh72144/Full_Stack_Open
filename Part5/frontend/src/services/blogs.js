import axios from "axios";

const baseUrl = "/api/blogs";
const loginUrl = "/api/login";

let token = null;
let tokenExpiration = null;

const setToken = (newToken, expirationTime) => {
    token = `Bearer ${newToken}`;
    tokenExpiration = expirationTime;
};

const login = async (credentials) => {
    const response = await axios.post(loginUrl, credentials);
    const { token } = response.data;
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1); 
    setToken(token, expirationTime);
    return response.data;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const createBlog = async (newBlog) => {
    if (new Date() > tokenExpiration) {
        console.log("Token has expired. Please log in again.");
        return;
    }

    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

const updateBlog = async (id,updatedBlog) => {

    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
    return response.data;    
};


export default { getAll, login, createBlog, setToken ,updateBlog};
