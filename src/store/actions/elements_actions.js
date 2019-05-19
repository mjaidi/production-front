// ACTIONS
import axios from 'axios';
import router from '../../router';

const baseUrl = 'http://localhost:3000/api/v1';
const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};


export default {
  TOOGLE_SIDEBAR: (store) => {
    let sidebar = null;
    store.state.layout.shrink === true ? sidebar = false : sidebar = true;
    store.commit('TOOGLE_SIDEBAR_STATE', sidebar);
  },
  TOOGLE_SIDE_BY_SIDE: (store) => {
    let sideBySide = null;
    store.state.layout.sideBySide === true ? sideBySide = false : sideBySide = true;
    store.commit('TOOGLE_SIDE_BY_SIDE', sideBySide);
  },
  GET_ELEMENTS: async ({ commit }) => {
    await axios.get(`${baseUrl}/elements`, config)
      .then(res => commit('UPDATE_ELEMENTS', res.data.data))
      .catch(err => console.log(err));
  },
  GET_ELEMENT: async ({ commit }, payload) => {
    await axios.get(`${baseUrl}/elements/${payload}`, config)
      .then(res => commit('UPDATE_ACTIVE_ELEMENT', res.data.data))
      .catch(err => console.log(err));
  },
  DESTROY_ELEMENT: async ({ state, commit }, payload) => {
    await axios.delete(`${baseUrl}/elements/${payload}`, config)
      .then((res) => {
        commit('RESET_ACTIVE_ELEMENT', payload);
        commit('SET_FLASH', { message: 'Produit supprimé', variant: 'success' });
      })
      .catch(err => commit('SET_FLASH', { message: err, variant: 'success' }));
  },
  CREATE_ELEMENT: async ({ commit }, payload) => {
    await axios.post(`${baseUrl}/elements`, payload.data, config)
      .then((res) => {
        commit('CREATE_NEW_ELEMENT', res.data.object.data);
        commit('SET_FLASH', { message: 'Produit crée', variant: 'success' });
      })
      .catch(err => commit('SET_FLASH', { message: err, variant: 'error' }));
  },
  UPDATE_ELEMENT: async ({ commit }, payload) => {
    await axios.patch(`${baseUrl}/elements/${payload.id}`, payload.data, config)
      .then((res) => {
        commit('UPDATE_ACTIVE_ELEMENT', res.data.object.data);
        commit('SET_FLASH', { message: 'Produit modifié avec succès', variant: 'success' });
      })
      .catch(err => commit('SET_FLASH', { message: err, variant: 'success' }));
  },
  CREATE_JOIN: async ({ dispatch }, payload) => {
    await axios.post(`${baseUrl}/elements/${payload.id}/join_elements`, payload.data, config)
      .then(res => dispatch('GET_ELEMENT', payload.id))
      .catch(err => console.log(err));
  },
  DESTROY_JOIN: async ({ dispatch }, payload) => {
    await axios.delete(`${baseUrl}/elements/${payload.elem_id}/join_elements/${payload.join_id}`, config)
      .then(res => dispatch('GET_ELEMENT', payload.elem_id))
      .catch(err => console.log(err));
  },
  UPDATE_JOIN: async ({ dispatch }, payload) => {
    await axios.patch(`${baseUrl}/elements/${payload.elem_id}/join_elements/${payload.join_id}`, payload.data, config)
      .then(res => dispatch('GET_ELEMENT', payload.elem_id))
      .catch(err => console.log(err));
  },
};
