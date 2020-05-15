import axios from 'axios';
import { USER_SERVICE_URI } from "../constants/endpoints";
import { AUTHENTICATED, AUTHENTICATION_ERROR } from "../constants/action-types";


export const signInAction = (values, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${USER_SERVICE_URI}/login`, values);
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', res.data.user.token);
      history.push(history.location.state.from.pathname);
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: error 
      });
    }
  };
};
