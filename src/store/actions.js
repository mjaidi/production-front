// ACTIONS
import axios from 'axios';

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};


export default {
  TOOGLE_SIDEBAR : (store) => {
    let sidebar = null;
    store.state.layout.shrink === true ?  sidebar = false : sidebar = true;
    store.commit('TOOGLE_SIDEBAR_STATE', sidebar);
  },
  GET_ELEMENTS: async ({commit}) => {
    await axios.get('http://localhost:3000/api/v1/elements', config)
     .then(res => commit('UPDATE_PELEMENTS', res.data.data))
     .catch(err => console.log(err));
  },
  SET_ACTIVE_ELEMENT: (store, payload) => {
    store.commit('CHANGE_ACTIVE_ELEMENT', payload)
  },
};
