const api = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api',
  endpoints: {
    user: {
      register: 'user',
      login: 'user/login',
    }
  }
};


export default api;