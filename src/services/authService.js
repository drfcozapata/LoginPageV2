import { uriFetcher } from '../utils/uriFetcher';
import services from '../config/services';

export const fetchCompaniesUser = (username) => {
    const endpoint = services.public.baseUrl + services.public.endpoints.getUserCompanies;
    return uriFetcher.makeGetRequest(endpoint, {
        username: username
    });
};

export const login = (username, password, mainurl) => {
    const endpoint = services.auth.baseUrl + services.auth.endpoints.token;
    return uriFetcher.makePostRequest(
        endpoint,
        {
            grant_type: 'password',
            username: username,
            password: password,
            mainurl: mainurl
        },
        {
            Authorization: `Basic ${btoa('clienttesty:thesecretcode')}`
        }
    );
};
