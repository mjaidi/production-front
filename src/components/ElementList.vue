<template>
  <div>
    <v-layout row wrap>
      <v-flex xs6 >
        <v-text-field
          class="with-margin"
          append-icon="search"
          label="Désignation"
          single-line
          hide-details
          @input="filterTitles"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 >
        <v-select
          class="with-margin"
          :items="categories"
          label="Catégorie"
          @change="filterCategories"
        ></v-select>
      </v-flex>
      <v-flex xs12>
        <v-data-table :headers="headers":items="items" item-key="title" :rows-per-page-items="[10,25,50,100]" rows-per-page-text="Résultats par page" must-sort :search="filters" :custom-filter="customFilter">
          <template v-slot:items="props">
            <tr  @click="setActiveItem(props.item.id)" :class="isActive(props.item.id) ? 'selected' : ''">
              <td class="text-xs-left" >{{ props.item.title }}</td>
              <td class="text-xs-right">{{ props.item.unit }}</td>
              <td class="text-xs-right">{{ props.item.category }}</td>
              <td class="text-xs-right">{{ props.item.type_element }}</td>
              <td class="text-xs-right">{{ props.item.element_cost }}</td>
              <td class="text-xs-right">{{ props.item.sales_price_ht }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'ElementList',
  data: () => ({
    filters: {
      title: '',
      category: '',
    },
    categories: ['Ingrédients', 'Packaging', 'Biscuit SF', 'Biscuits Carton'],
    headers: [
      { text: 'Designation Produit', align: 'left', value: 'title'},
      { text: 'Unités', value: 'unit', align: 'right'},
      { text: 'Catégorie', value: 'category', align: 'right'},
      { text: 'Type', value: 'type_element', align: 'right'},
      { text: 'Prix Revient', value: 'purchase_price_ht', align: 'right'},
      { text: 'Prix Vente HT', value: 'sales_price_ht', align: 'right'},
    ],
  }),
  computed: {
    ...mapState(['elements']),
    items() {
      return this.elements.list.map(e => e.attributes)
    }
  },
  methods: {
    setActiveItem(id) {
      this.$store.dispatch('SET_ACTIVE_ELEMENT', id)
    },
    isActive(id) {
      if (this.elements.activeElement === null) {
        return false
      } else {
        return  parseInt(this.elements.activeElement.id) === parseInt(id)
      }
    },
    customFilter(items, filters, filter, headers) {
      const cf = new this.$MultiFilters(items, filters, filter, headers);

      cf.registerFilter('title', function(searchWord, items) {
        if (searchWord.trim() === "") return items;

        return items.filter(item => {
          return item.title.toLowerCase().includes(searchWord.toLowerCase());
        }, searchWord)
      });

      cf.registerFilter('category', function(category, items) {
        if(category.trim() === '') return items;

        return items.filter(item => {
          return item.category.toLowerCase() === category.toLowerCase();
        }, category)
      });

      return cf.runFilters();
    },
    filterTitles(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {title: val});
    },
    filterCategories(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {category: val});
    }
  },
  mounted() {
    if (this.elements.updateList) {
      this.$store.dispatch('GET_ELEMENTS');
    }
  },

};
</script>

<style scoped lang="scss">
  .selected {
    background: #ccc;
  }
  .with-margin {
    margin: 0 15px;
  }

</style>
