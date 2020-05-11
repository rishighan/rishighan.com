import { LOGIN_USER } from "../constants/action-types";

const initialState = {
  isLoggedIn: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loggedInUser: action.user,
      };

    default:
      return state;
  }
}

export default userReducer;
