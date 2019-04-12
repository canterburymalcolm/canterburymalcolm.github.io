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
const get = (url, cb) => {
    return fetch(url, {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
};

const post = (url, data, cb) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

export const hasUser = (user, checkPass, cb) => {
    let url = 'api/user?name=' + user.username; 
    if (checkPass) {
        url += '&&pass=' + user.password;
    }
    get(url, cb);
};

export const addUser = (user, cb) => {
    post('api/user', user, cb);
}

