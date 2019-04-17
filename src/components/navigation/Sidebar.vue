<template>
  <div id="sidebar" v-bind:class="{'d-none': layout.shrink}">
    <v-navigation-drawer fixed width="200" mobile-break-point=900 >
      <div class="title">
        <v-icon class="title-icon">donut_small</v-icon>
        <h3 > Calcul des Besoins</h3>
      </div>


      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <router-link  v-for="item in items" :key="item.title" :to="item.path">
          <v-list-tile >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Sidebar',
    data () {
      return {
        items: [
          { title: 'Produits', icon: 'inbox', path: '/' },
          { title: 'Devis', icon: 'attach_money', path: '/devis_list' },
          { title: 'Parametres', icon: 'settings', path: '/settings' }
        ],
        right: true
      }
    },
    computed: mapState(['layout'])
  }
</script>

<style lang="scss" scoped>
  .title {
    padding-bottom: 10px;
    padding-top: 20px;
    text-align: center;
    h3 {
      font-size: 18px;
      padding-top: 15px;
      font-weight: 400;
    }
    .title-icon {
      margin: 0 auto;
      font-size: 35px;
      color: white;
    }
  }


</style>
