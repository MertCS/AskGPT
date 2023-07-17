import axios from "axios";

export const signUp = (body) => {
    return axios.post('/api/1.0/users', body);
};

export const login = creds => {
    return axios.post('/api/1.0/auth', {}, {auth: creds});
};

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
};

export const getUsers = (page = 0, size = 5) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`)
};

export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`)
};

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
    if(isLoggedIn){
        const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else{
        delete axios.defaults.headers['Authorization'];
    }
};

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body)
};

export const postChatLog = chatlog => {
    return axios.post('/api/1.0/chatlogs', chatlog);
};

export const getChatlogs = (username, page = 0) => {
    const path = username ? `api/1.0/users/${username}/chatlogs?page=` : '/api/1.0/chatlogs?page='; 
    return axios.get(path + page)
};