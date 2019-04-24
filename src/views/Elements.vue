<template>
  <div>
    <div class="title">Produits</div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex :class='flexClass'>
          <v-card class="card">
            <div class="flex-between">
              <div class="subtitle">List Produits</div>
              <router-link  :to="'/elements/create'">
                <v-btn color="primary" small>+ Nouveau</v-btn>
              </router-link>
            </div>
            <ElementList />
          </v-card>
        </v-flex>
        <v-flex :class="flexClass">
          <v-card class="card"  v-if="activeElement !== null">
            <div class="flex-between">
              <div class="subtitle">Détail {{activeElement.attributes.title}}</div>
              <router-link  :to="'/elements/edit/' + activeElement.id">
                <v-btn color="primary" small><v-icon left small>edit</v-icon>modifier</v-btn>
              </router-link>
            </div>
            <DetailElement />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// @ is an alias to /src
import ElementList from '@/components/ElementList.vue';
import DetailElement from '@/components/DetailElement.vue';

export default {
  name: 'Elements',
  components: {
    ElementList,
    DetailElement,
  },
  computed: {
    ...mapState(['layout']),
    activeElement() {
      return this.$store.getters.elements.activeElement
    },
    flexClass() {
      if (this.layout.sideBySide) {
        return {
          md6: this.$vuetify.breakpoint.mdAndUp
        }
      }
    }
  }
};
</script>
