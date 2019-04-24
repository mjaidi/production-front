<template>
  <div >
      <v-data-table :headers="headers":items="items" item-key="child.info.id" :rows-per-page-items="[10,25,50,100]" hide-headers hide-actions  >
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
</template>
<script>
  export default {
    props: [ 'items' ],
    name: 'ElementComposition',
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
  }
</script>
