const services = {
    public: {
        baseUrl: '/',
        endpoints: {
            getUserCompanies: 'search_username/{username}'
        }
    },
    auth: {
        baseUrl: `/oauth`,
        endpoints: {
            token: '/token'
        }
    }
};

export default services;
