import axios from 'axios';
import {
  SAMPLE_ACTION,
} from '../constants/action-types';

export const fetchSomething = options => async (dispatch) => {
  try {
    // call to api
  } catch (error) {
    console.log('Error', error);
  }
};

