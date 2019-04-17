<template>
  <div>
    <v-data-table :headers="headers":items="items"item-key="name" :rows-per-page-items="[10,25,50,100]" rows-per-page-text="Résultats par page" must-sort >
      <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.unit }}</td>
          <td class="text-xs-right">{{ props.item.category }}</td>
          <td class="text-xs-right">{{ props.item.type_element }}</td>
          <td class="text-xs-right">{{ props.item.purchase_price_ht }}</td>
          <td class="text-xs-right">{{ props.item.sales_price_ht }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'MPList',
  data: () => ({
    headers: [
      { text: 'Designation Produit', align: 'left', value: 'title'},
      { text: 'Unités', value: 'unit', align: 'right'},
      { text: 'Catégorie', value: 'category', align: 'right'},
      { text: 'Type', value: 'type_element', align: 'right'},
      { text: 'Prix Achat HT', value: 'purchase_price_ht', align: 'right'},
      { text: 'Prix Vente HT', value: 'sales_price_ht', align: 'right'},
    ],
  }),
  computed: {
    ...mapState(['elements']),
    items() {
      return this.elements.list.map(e => e.attributes)
    }
  },
  mounted() {
    this.$store.dispatch('GET_ELEMENTS');
  },
};
</script>
