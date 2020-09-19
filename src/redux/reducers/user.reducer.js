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
    default: 
      return statePart;
  }
}

export default userReducer;