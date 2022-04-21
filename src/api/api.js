import { notify } from '../notify.js';


const hostname = 'https://parseapi.back4app.com';

async function request(url, options) {
    try {
        const response = await fetch(hostname + url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw {
                message: error.error,
                code: error.code
            };
        }

        return response.json();
    } catch (err) {
        notify(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': '7U4biKbp7XV7icJ6IaOjTP7UnXsiqUneDlvA8Yk6',
            'X-Parse-REST-API-Key': 'YoGqf88hQZL97jwTuEKyYqeeMvJ0B8rAoctC4fAa',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };

    return options;
};

export async function get(url) {
    return request(url, createOptions());
};

export async function post(url, data) {
    return request(url, createOptions('post', data));
};

export async function put(url, data) {
    return request(url, createOptions('put', data));
};

export async function del(url) {
    return request(url, createOptions('delete'));
};

/*
export async function login(username, password) {
    const result = await post('/login', { username, password });

    const userData = {
        username: result.username,
        id: result.objectId,
        token: result.sessionToken
    };
    setUserData(userData);

    return result;
};

export async function register(username, email, password) {
    const result = await post('/users', { username, email, password });

    const userData = {
        username,
        id: result.objectId,
        token: result.sessionToken
    };
    setUserData(userData);

    return result;
};

export async function logout() {
    post('/logout');
    clearUserData();
};
*/