import Vue from 'vue';
import Router from 'vue-router';
import Elements from './views/Elements.vue';
import DevisList from './views/DevisList.vue';
import Settings from './views/Settings.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/devis_list',
      name: 'devis_list',
      component: DevisList,
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
  ],
});
