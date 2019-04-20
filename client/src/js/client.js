//Checks the response from a POST or GET request
//Throws an error if approprate
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

//Parses the incoming json response
const parseJSON = (response) => {
    return response.json();
};

//Sends a GET request to the api endpoint at the given url
//Executes the given callback on the result of that request
const get = (url, cb) => {
    return fetch(url, {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
};

//Sends a POST request to the api endpoint at the given url
//with a body containing the given data
//Executes the given callback on the result of that request
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
};

//Determines if the given user exists in the user table
//If checkPass is true then also determines if the password matches
//the entry in the database
export const hasUser = (user, checkPass, cb) => {
    let url = 'api/user?name=' + user.username; 
    if (checkPass) {
        url += '&&pass=' + user.password;
    }
    get(url, cb);
};

//Adds the given user to the user table in the database
export const addUser = (user, cb) => {
    post('api/user', user, cb);
};

//Adds the given parent to the order at the given id 
export const addParent = (orderId, parent, cb) => {
    post('api/parent', { orderId: orderId, ...parent }, cb);
};