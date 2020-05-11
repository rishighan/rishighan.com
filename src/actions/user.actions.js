import axios from "axios";
import { USER_SERVICE_URI } from "../constants/endpoints";
import { LOGIN_USER } from "../constants/action-types";

export const userAPICall = (options) => async (dispatch) => {
  try {
    const serviceURI = USER_SERVICE_URI + options.callURIAction;
    const result = await axios(serviceURI, {
      method: options.callMethod,
      params: options.params,
      headers: options.headers,
      data: options.data || null,
    });

    if (!_.isUndefined(result)) {
      localStorage.setItem("token", result.data.user.token);
      dispatch({
          type: LOGIN_USER,
          isLoggedIn: true,
          loggedInUser: result.data.user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
