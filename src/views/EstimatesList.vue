<template>
  <div>

    <div class="title">Devis</div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="card">
            <div class="flex-between">
              <div class="subtitle">List Devis</div>
              <router-link  :to="'/estimates/create'">
                <v-btn color="primary" small>+ Nouveau</v-btn>
              </router-link>
            </div>

            <v-layout row wrap>
              <v-flex xs6 offset-xs3>
                <v-text-field
                  append-icon="search"
                  label="Client"
                  single-line
                  hide-details
                  @input="filterClients"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-data-table :headers="headers":items="items" item-key="title" :rows-per-page-items="[10,25,50,100]" rows-per-page-text="Résultats par page" must-sort :search="filters" :custom-filter="customFilter">
                  <template v-slot:items="props">
                    <tr>
                      <td class="text-xs-left" >{{ props.item.number }}</td>
                      <td class="text-xs-right">{{ props.item.client }}</td>
                      <td class="text-xs-right">{{ props.item.created_at }}</td>
                      <td class="text-xs-right">
                        <router-link  :to="'/estimates/edit/' + props.item.id">
                          <v-btn color="primary" left small><v-icon small>edit</v-icon>modifier</v-btn>
                        </router-link>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>


          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'EstimatesList',
  data: () => ({
    filters: {
      client: '',
    },
    headers: [
      { text: 'Numéro', align: 'left', value: 'title'},
      { text: 'Client', value: 'unit', align: 'right'},
      { text: 'Date', value: 'category', align: 'right'},
      { text: 'Actions', value: 'link', align: 'right'},
    ],
  }),
  computed: {
    ...mapState(['estimates']),
    items() {
      return this.estimates.list.map(e => e.attributes)
    }
  },
  methods: {
    customFilter(items, filters, filter, headers) {
      const cf = new this.$MultiFilters(items, filters, filter, headers);

      cf.registerFilter('client', function(searchWord, items) {
        if (searchWord.trim() === "") return items;

        return items.filter(item => {
          return item.client.toLowerCase().includes(searchWord.toLowerCase());
        }, searchWord)
      });

      return cf.runFilters();
    },
    filterClients(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {client: val});
    }
  },
  mounted() {
    if (this.estimates.updateList) {
      this.$store.dispatch('GET_ESTIMATES');
    }
  },

};
</script>

