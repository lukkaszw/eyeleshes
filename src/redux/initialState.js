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
      pagesAmount: 1,
    },
  },
};

export default initialState;