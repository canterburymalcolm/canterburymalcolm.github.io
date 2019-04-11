export const hasUser = (user, checkPass, cb) => {
    let url = '/api/users/has-user?name=' + user.username; 
    if (checkPass) {
        url += '&&pass=' + user.password;
    }
    get(url, cb);
};

const get = (url, cb) => {
    return fetch(url, {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
};

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
};

const parseJSON = (response) => {
    return response.json();
};