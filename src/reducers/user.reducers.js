import { LOGIN_USER } from "../constants/action-types";

const initialState = {
  loggedInUser: {},
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loggedInUser: action.loggedInUser,
      };
   default:
      return state;
  }
}

export default userReducer;
