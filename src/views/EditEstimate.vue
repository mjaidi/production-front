<template>
  <div>
    <div class="title">Modifier {{activeEstimate === null ? '' : activeEstimate.attributes.title}}</div>
    <EstimateForm v-bind:id="id" v-bind:create="false"/>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 >
            <v-card class="card">
              <div class="subtitle">Prix de revient</div>
              <h3 class="text-center">{{ Math.round(activeEstimate.attributes.estimate_cost * 100) / 100}} MAD</h3>
            </v-card>
          </v-flex>
          <v-flex xs12 >
            <v-card class="card">
              <div class="subtitle">Besions en MP</div>
                <v-data-table :headers="headers":items="items" item-key="title" :rows-per-page-items="[10,25,50,100]" rows-per-page-text="Résultats par page" must-sort >
                <template v-slot:items="props">
                  <tr>
                    <td class="text-xs-left" >{{ props.item.info.title }}</td>
                    <td class="text-xs-right">{{ props.item.info.unit }}</td>
                    <td class="text-xs-right">{{ props.item.info.category }}</td>
                    <td class="text-xs-right">{{ props.item.info.type_element }}</td>
                    <td class="text-xs-right">{{ Math.round(props.item.quantity * 100) / 100 }}</td>
                    <td class="text-xs-right">{{ Math.round(props.item.cost * 100) / 100  }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </div>
</template>

<script>

import EstimateForm from '../components/EstimateForm'
import {mapState} from 'vuex'

  export default {
    name: 'EditElement',
    components: {
      EstimateForm,
    },
    data: () => ({
      headers: [
        { text: 'Designation Produit', align: 'left', value: 'info.title'},
        { text: 'Unités', value: 'info.unit', align: 'right'},
        { text: 'Catégorie', value: 'info.category', align: 'right'},
        { text: 'Type', value: 'info.type_element', align: 'right'},
        { text: 'Quantité', value: 'quantity', align: 'right'},
        { text: 'Prix Revient HT', value: 'cost', align: 'right'},
      ],
    }),
    props: ['id'],
    computed: {
      ...mapState(['estimates']),
      activeEstimate() {
        return this.estimates.activeEstimate === null ? {attributes: ''} : this.estimates.activeEstimate
      },
      items() {
        return this.activeEstimate === null ? [] : this.activeEstimate.attributes.composition_mp
      }
    }
  }
</script>
