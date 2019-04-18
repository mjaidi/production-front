<template>
  <div>
    <div class="card-subtitle">Informations</div>
    <div class="card-info-text">
      <p><span class="info-title">Description</span><span class="info-content">{{activeElement.attributes.title}}</span></p>
      <p><span class="info-title">Type</span><span class="info-content">{{activeElement.attributes.type_element}}</span></p>
      <p><span class="info-title">Catégorie</span><span class="info-content">{{activeElement.attributes.category}}</span></p>
      <p><span class="info-title">Acheté/Fabriqué</span><span class="info-content">{{activeElement.attributes.built ? 'Fabriqué' : 'Acheté'}}</span></p>
    </div>
    <div class="card-subtitle">Prix</div>
    <div class="card-info-text">
      <p><span class="info-title">Prix de Revient</span><span class="info-content">{{activeElement.attributes.purchase_price_ht}} dh</span></p>
      <p><span class="info-title">Prix de Vente HT</span><span class="info-content">{{activeElement.attributes.sales_price_ht}} dh</span></p>
      <p><span class="info-title">Taux Taxe</span><span class="info-content">{{activeElement.attributes.sales_tax*100}}%</span></p>
      <p><span class="info-title">Prix de Vente TTC</span><span class="info-content">{{activeElement.attributes.sales_price_ttc}} dh</span></p>
    </div>

    <div class="card-subtitle">Composition</div>
    <div class="card-info-text">
      <v-data-table :headers="headers":items="activeElement.attributes.child_elements"item-key="name" :rows-per-page-items="[10,25,50,100]" rows-per-page-text="Résultats par page" must-sort  >
        <template v-slot:items="props">
            <td class="text-xs-left" >{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.unit }}</td>
            <td class="text-xs-right">{{ props.item.category }}</td>
            <td class="text-xs-right">{{ props.item.purchase_price_ht }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailElement',
  data: () => ({
    headers: [
      { text: 'Designation Produit', align: 'left', value: 'title'},
      { text: 'Unités', value: 'unit', align: 'right'},
      { text: 'Catégorie', value: 'category', align: 'right'},
      { text: 'Prix Revient', value: 'purchase_price_ht', align: 'right'},
    ],
  }),
    computed: {
      activeElement() {
        return this.$store.getters.elements.activeElement
      }
    }
  }
</script>
