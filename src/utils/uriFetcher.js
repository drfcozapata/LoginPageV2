import axios from 'axios';
import * as qs from 'qs';

const server = import.meta.env.BASE_URL;

const client = axios.create({
    baseURL: server
});

client.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const uriFetcher = {
    _url: function (endpointUrl, options = {}) {
        let url = endpointUrl;
        for (const option in options) {
            url = endpointUrl.replace(`{${option}}`, options[option]);
        }
        return url;
    },

    onSuccess: function (response) {
        return response;
    },

    onError: function (error) {
        console.error('Request Failed:', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    },

    setAutorization: function (access_token) {
        console.log(`setAutorization: ${access_token}`);
        client.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    },

    makeGetRequest: function (endpoint, query = {}) {
        const url = this._url(endpoint, query);
        console.log(`url: ${url}`);
        return client({
            method: 'GET',
            url
        })
            .then(this.onSuccess)
            .catch(this.onError);
    },

    makePostRequest: function (endpoint, payload = {}, headersOptions = {}) {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headersOptions
        };

        const url = this._url(endpoint);
        return client({
            method: 'POST',
            headers: headers,
            data: qs.stringify(payload),
            url
        })
            .then(this.onSuccess)
            .catch(this.onError);
    },

    makeFetchPostRequest: function (endpoint, token, payload) {
        let data = new FormData();

        for (const key in payload) {
            console.log(`${key}: ${payload[key]}`);
            if (payload[key]) {
                data.append(key, payload[key]);
            }
        }

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        const url = this._url(server + endpoint);
        return fetch(url, requestOptions)
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                throw error;
            });
    }
};
