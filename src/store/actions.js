// ACTIONS
import axios from 'axios';
import router from '../router';
import elementsActions from './actions/elements_actions';
import estimatesActions from './actions/estimates_actions';

const baseUrl = 'http://localhost:3000/api/v1';
const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};


export default {
  ...elementsActions,
  ...estimatesActions,
};
