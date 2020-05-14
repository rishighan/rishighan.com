import axios from 'axios';
import { USER_SERVICE_URI } from "../constants/endpoints";
import { AUTHENTICATED, AUTHENTICATION_ERROR } from "../constants/action-types";


export const signInAction = (values, history) => {
  return async (dispatch) => {
    console.log(dispatch)
    try {
      const res = await axios.post(`${USER_SERVICE_URI}/login`, values);

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
};
