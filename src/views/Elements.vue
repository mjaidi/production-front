<template>
  <div>
    <div class="title">Produits</div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex sm12 md6>
          <v-card class="card">
            <div class="subtitle">List Produits</div>
            <MPList />
          </v-card>
        </v-flex>
        <v-flex sm12 md6>
          <v-card class="card"  v-if="activeElement !== null">
            <div class="subtitle">Détail {{activeElement.attributes.title}}</div>
            <DetailElement />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MPList from '@/components/MPList.vue';
import DetailElement from '@/components/DetailElement.vue';

export default {
  name: 'Elements',
  components: {
    MPList,
    DetailElement,
  },
  computed: {
    activeElement() {
      return this.$store.getters.elements.activeElement
    }
  }
};
</script>
