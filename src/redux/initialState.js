const initialState = {
  user: {
    token: null,
    data: {},
  },
  clients: {
    queries: {
      sortBy: 'asc',
      searchBy: '',
      page: 1,
    }
  },
  visits: {
    queries: {
      sortCat: 'date',
      sortBy: 'desc',
      page: 1,
      yaerFrom: '',
      yearTo: '',

    },
  },
};

export default initialState;