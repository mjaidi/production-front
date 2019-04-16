<template>
  <div id="sidebar">
    <v-navigation-drawer fixed width="200" mobile-break-point=900>
      <div class="title">
        <v-icon class="title-icon">dashboard</v-icon>
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
  export default {
    name: 'Sidebar',
    data () {
      return {
        items: [
          { title: 'Produits', icon: 'dashboard', path: '/' },
          { title: 'Devis', icon: 'question_answer', path: '/devis_list' }
        ],
        right: true
      }
    },
  }
</script>

<style lang="scss" scoped>
  .title {
    padding-bottom: 10px;
    padding-top: 30px;
    h3 {
      font-size: 20px;
      padding-top: 5px;
    }
    .title-icon {
      margin: 0 auto;
      font-size: 35px;
      color: white;
    }
  }


</style>
