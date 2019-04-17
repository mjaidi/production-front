<template>
  <div>
    <div class="title">Produits</div>
    <v-layout row >
      <v-flex xs12 sm6>
        <v-card class="card">
          <div class="subtitle">List Produits</div>
          <MPList />
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card class="card">
          <div class="subtitle">Détail Produits</div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import MPList from '@/components/MPList.vue';

export default {
  name: 'Elements',
  components: {
    MPList,
  },
};
</script>
