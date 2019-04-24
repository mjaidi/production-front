import Vue from 'vue';
import Router from 'vue-router';
import Elements from './views/Elements.vue';
import DevisList from './views/DevisList.vue';
import Settings from './views/Settings.vue';
import EditElement from './views/EditElement.vue';
import CreateElement from './views/CreateElement.vue';

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
  ],
});
