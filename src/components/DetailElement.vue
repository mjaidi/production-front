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
      <p><span class="info-title">Prix de Revient</span><span class="info-content">{{activeElement.attributes.element_cost}} dh</span></p>
      <p><span class="info-title">Prix de Vente HT</span><span class="info-content">{{activeElement.attributes.sales_price_ht}} dh</span></p>
      <p><span class="info-title">Taux Taxe</span><span class="info-content">{{activeElement.attributes.sales_tax*100}}%</span></p>
      <p><span class="info-title">Prix de Vente TTC</span><span class="info-content">{{activeElement.attributes.sales_price_ttc}} dh</span></p>
    </div>

    <div class="card-subtitle">Composition</div>
    <div class="card-info-text">
      <v-data-table :headers="headers":items="activeElement.attributes.child_elements" item-key="child.info.id" :rows-per-page-items="[10,25,50,100]" rows-per-page-text="Résultats par page" must-sort  >
        <template v-slot:items="props">
          <tr  @click="props.expanded = !props.expanded" >
            <td class="text-xs-left" ><span :class="props.item.grandchildren.length > 0 ? 'expandable' : ''"></span>{{ props.item.child.info.title }}</td>
            <td class="text-xs-right">{{ props.item.child.info.unit }}</td>
            <td class="text-xs-right">{{ props.item.child.info.category }}</td>
            <td class="text-xs-right">{{ props.item.child.quantity }}</td>
            <td class="text-xs-right">{{ props.item.child.cost }}</td>
          </tr>
        </template>
        <template  v-slot:expand="props">
          <v-card class="elevation-10" v-if="props.item.grandchildren.length > 0">
            <v-card-text>
                <ElementComposition :items='props.item.grandchildren' />
            </v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import ElementComposition from './ElementComposition'
  export default {
    name: 'DetailElement',
    components: {
      ElementComposition
    },
    data: () => ({
      expand: false,
      headers: [
        { text: 'Designation Produit', align: 'left', value: 'title'},
        { text: 'Unités', value: 'unit', align: 'right'},
        { text: 'Catégorie', value: 'category', align: 'right'},
        { text: 'Quantité', value: 'quantity', align: 'right'},
        { text: 'Prix Revient', value: 'cost', align: 'right'},
      ],
    }),
    computed: {
      activeElement() {
        return this.$store.getters.elements.activeElement
      },
    }
  }
</script>

<style lang="scss">
  .expandable {
    border-width: 8px ;
    border-style: solid;
    border-right: 8px  solid transparent;
    border-color: rgba(0,0,0,.50) transparent transparent;
    width: 0;
    height: 0;
    position: relative;
    top: 10px;
    margin-right: 5px;
  }
</style>
