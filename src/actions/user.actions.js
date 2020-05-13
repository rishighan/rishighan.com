import axios from 'axios';
import { USER_SERVICE_URI } from "../constants/endpoints";
import { AUTHENTICATED, AUTHENTICATION_ERROR } from "../constants/action-types";


export function signInAction({ email, password }, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${USER_SERVICE_URI}/login`, { email, password });

      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', res.data.token);
      history.push('/secret');
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}
};
