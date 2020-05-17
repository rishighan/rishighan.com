import axios from "axios";
import { USER_SERVICE_URI } from "../constants/endpoints";
import {
  AUTHENTICATED,
  AUTHENTICATION_ERROR,
  UNAUTHENTICATED,
} from "../constants/action-types";

/**
 * Makes a call to authenticate supplied credentials.
 * Sets a localStorage variable if successful
 * @param {Object} values - The `user` object containing the e-mail and password
 * @param {Object} history - React router history object
 * @return {Promise} - A Promise containing the payload or error
 */
export const signInAction = (values, history) => {
  return async (dispatch) => {
    try {
      console.log(history)
      const res = await axios.post(`${USER_SERVICE_URI}/login`, values);
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem("user", res.data.user.token);
      history.push(history.location.state.from.pathname);
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: error,
      });
    }
  };
};

/**
 * Removes a set localStorage variable and signs a user out.
 * @return {Promise} - A Promise containing the payload or error
 */
export const signOutAction = () => {
  return (dispatch) => {
    console.log("signing out...")
    localStorage.clear();
    dispatch({
      type: UNAUTHENTICATED,
    });
  };
};
