import ACTIONS from '../actions';

const userReducer = (statePart = {}, action = {}) => {
  switch(action.type) {
    case ACTIONS.user.LOGIN: {
      return {
        ...statePart,
        token: action.payload.token,
        data: action.payload.user,
      }
    }
    case ACTIONS.user.SET_USER_DATA: {
      return {
        ...statePart,
        data: action.payload,
      }
    }
    case ACTIONS.user.LOGOUT: {
      return {
        token: null,
        data: {},
      }
    }
    default: 
      return statePart;
  }
}

export default userReducer;