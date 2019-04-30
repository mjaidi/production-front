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
  GET_ESTIMATES: async ({ commit }) => {
    await axios.get(`${baseUrl}/estimates`, config)
      .then(res => commit('UPDATE_ESTIMATES', res.data.data))
      .catch(err => console.log(err));
  },
  GET_ESTIMATE: async ({ commit }, payload) => {
    await axios.get(`${baseUrl}/estimates/${payload}`, config)
      .then(res => commit('UPDATE_ACTIVE_ESTIMATE', res.data.data))
      .catch(err => console.log(err));
  },
  DESTROY_ESTIMATE: async ({ state, commit }, payload) => {
    await axios.delete(`${baseUrl}/estimates/${payload}`, config)
      .then((res) => {
        commit('RESET_ACTIVE_ESTIMATE', payload);
        commit('SET_FLASH', { message: 'Devis supprimé', variant: 'success' });
      })
      .catch(err => commit('SET_FLASH', { message: err, variant: 'success' }));
  },
  CREATE_ESTIMATE: async ({ commit }, payload) => {
    await axios.post(`${baseUrl}/estimates`, payload.data, config)
      .then((res) => {
        commit('CREATE_NEW_ESTIMATE', res.data.object.data);
        commit('SET_FLASH', { message: 'Devis crée', variant: 'success' });
      })
      .catch(err => commit('SET_FLASH', { message: err, variant: 'error' }));
  },
  UPDATE_ESTIMATE: async ({ commit }, payload) => {
    await axios.patch(`${baseUrl}/estimates/${payload.id}`, payload.data, config)
      .then((res) => {
        commit('UPDATE_ACTIVE_ESTIMATE', res.data.object.data);
        commit('SET_FLASH', { message: 'Devis modifié avec succès', variant: 'success' });
      })
      .catch(err => commit('SET_FLASH', { message: err, variant: 'success' }));
  },
  CREATE_ESTIMATE_ELEMENT: async ({ dispatch }, payload) => {
    await axios.post(`${baseUrl}/estimates/${payload.id}/estimate_elements`, payload.data, config)
      .then(res => dispatch('GET_ESTIMATE', payload.id))
      .catch(err => console.log(err));
  },
  DESTROY_ESTIMATE_ELEMENT: async ({ dispatch }, payload) => {
    await axios.delete(`${baseUrl}/estimates/${payload.elem_id}/estimate_elements/${payload.join_id}`, config)
      .then(res => dispatch('GET_ESTIMATE', payload.elem_id))
      .catch(err => console.log(err));
  },
  UPDATE_ESTIMATE_ELEMENT: async ({ dispatch }, payload) => {
    await axios.patch(`${baseUrl}/estimates/${payload.elem_id}/estimate_elements/${payload.join_id}`, payload.data, config)
      .then(res => dispatch('GET_ESTIMATE', payload.elem_id))
      .catch(err => console.log(err));
  },
};
