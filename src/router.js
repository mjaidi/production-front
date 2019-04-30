import Vue from 'vue';
import Router from 'vue-router';
import Elements from './views/Elements.vue';
import EstimatesList from './views/EstimatesList.vue';
import Settings from './views/Settings.vue';
import EditElement from './views/EditElement.vue';
import CreateElement from './views/CreateElement.vue';
import CreateEstimate from './views/CreateEstimate.vue';
import EditEstimate from './views/EditEstimate.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/estimates',
      name: 'estimates',
      component: EstimatesList,
    },
    {
      path: '/',
      name: 'elements',
      component: Elements,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/elements/edit/:id',
      name: 'edit_elements',
      component: EditElement,
      props: true,
    },
    {
      path: '/elements/create',
      name: 'create_elements',
      component: CreateElement,
    },
    {
      path: '/estimates/create',
      name: 'create_estimate',
      component: CreateEstimate,
    },
    {
      path: '/estimates/edit/:id',
      name: 'edit_estimate',
      component: EditEstimate,
      props: true,
    },
  ],
});
