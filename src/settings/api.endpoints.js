const api = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api',
  endpoints: {
    user: {
      register: 'user',
      login: 'user/login',
      logout: 'user/logout',
      getData: 'user/data',
      remove: 'user/me',
      update: 'user/me',
    },
    clients: 'clients',
    visits: 'visits',
    visitsStats: 'visits/stats',
  }
};


export default api;