<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="joinElements"
      hide-actions
      item-key="child_element_id"
    >
    <template v-slot:items="props">
      <tr>
        <td class="text-xs-left"><v-combobox @blur="updateJoin(props.item)" :items='childElements' v-model="props.item.child_element_id" item-text="name" item-value="value" search-input></v-combobox></td>
        <td class="text-xs-left width-small"><v-text-field @blur="updateJoin(props.item)" v-model="props.item.quantity"></v-text-field></td>
        <td class="text-xs-left width-small">{{props.item.child_element_id === null ? '' : childElementUnits(props.item.child_element_id.value)}}</td>
        <td class="text-xs-left width-small">{{Math.round(props.item.cost * 100) / 100}}</td>
        <td class="width-small text-xs-center">
          <v-btn @click="removeJoin(props.item.id)" icon  class="error" ><v-icon>delete</v-icon></v-btn>
        </td>
      </tr>
    </template>

    </v-data-table>
    <v-btn @click="addJoin" outline><v-icon>add</v-icon>Ajouter une Ligne</v-btn>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'JoinElements',
    data () {
      return {
        joinElements: [],
        headers: [
          {text: 'Produit', align: 'left', value: 'child_element'},
          {text: 'Quantité', align: 'left', value: 'quantity'},
          {text: 'Unité', align: 'left', value: 'unit'},
          {text: 'Prix Revient', align: 'left', value: 'price'},
          {text: 'Actions', align: 'left', value: 'quantity'}
        ]
      }
    },
    computed: {
      ...mapState(['elements', 'estimates']),
      childElements() {
        const list =  this.elements.list.map(e => ({name: e.attributes.title, value: e.id, type_element: e.attributes.type_element}))
        if (this.type_join === 'join_elements') return list.filter(e => e.value !== this.parent_id)
        if (this.type_join === 'estimate_elements') return list.filter(e => e.type_element !== 'MP')
      },
      activeElement() {
        return this.elements.activeElement
      },
      activeEstimate() {
        return this.estimates.activeEstimate
      }
    },
    props: ['parent_id', 'type_join'],
    watch: {
      activeElement() {
         this.joinElements = this.activeElement.attributes.child_elements.map(c => ({
          parent_element_id: this.parent_id,
          child_element_id: (c.child.info === null ? null : {name: c.child.info.title, value: c.child.info.id}),
          quantity: c.child.quantity,
          id: c.child.join_id,
          cost: c.child.cost
        }))
      },
      activeEstimate() {
         this.joinElements = this.activeEstimate.attributes.estimate_elements_info.map(c => ({
          parent_element_id: this.parent_id,
          child_element_id: (c.info === null ? null : {name: c.info.title, value: c.info.id}),
          quantity: c.quantity,
          id: c.join_id,
          cost: c.cost
        }))
      }
    },
    methods: {
      childElementUnits(id) {
        const foundElement = this.elements.list.find(e => parseInt(e.id) === id)
        return foundElement === undefined ? '' : foundElement.attributes.unit
      },
      addJoin () {
        let checkEmptyjoinElements = this.joinElements.filter(join => join.parent_element_id === null)
        if (checkEmptyjoinElements.length >= 1 && this.joinElements.length > 0) return

        if (this.type_join === 'join_elements') {
          const payload = {
            id: this.parent_id,
            data: {
              join_element: {
                element_parent_id: this.parent_id,
                element_child_id: null,
                quantity: null
              }
            }
          }
          this.$store.dispatch('CREATE_JOIN', payload)
        }

        if (this.type_join === 'estimate_elements') {
          const payload = {
            id: this.parent_id,
            data: {
              estimate_element: {
                estimate_id: this.parent_id,
                element_id: null,
                quantity: null
              }
            }
          }
          this.$store.dispatch('CREATE_ESTIMATE_ELEMENT', payload)
        }

      },

      removeJoin (id) {
        if (this.type_join === 'join_elements') {
          this.$store.dispatch('DESTROY_JOIN', {elem_id: this.parent_id, join_id: id})
        }
        if (this.type_join === 'estimate_elements') {
          this.$store.dispatch('DESTROY_ESTIMATE_ELEMENT', {elem_id: this.parent_id, join_id: id})
        }
      },
      updateJoin(item) {
        if (this.type_join === 'join_elements') {
          const payload = {
            elem_id: this.parent_id,
            join_id: item.id,
            data: {
              join_element: {
                element_parent_id: this.parent_id,
                element_child_id: item.child_element_id.value,
                quantity: item.quantity
              }
            }
          }
          this.$store.dispatch('UPDATE_JOIN', payload)
        }
        if (this.type_join === 'estimate_elements') {
          const payload = {
            elem_id: this.parent_id,
            join_id: item.id,
            data: {
              estimate_element: {
                estimate_id: this.parent_id,
                element_id: item.child_element_id.value,
                quantity: item.quantity
              }
            }
          }
          this.$store.dispatch('UPDATE_ESTIMATE_ELEMENT', payload)
        }
      }
    },
    mounted () {
      if (this.type_join === 'join_elements') {
        this.joinElements = this.activeElement.attributes.child_elements.map(c => ({
          parent_element_id: this.parent_id,
          child_element_id: (c.child.info === null ? null : {name: c.child.info.title, value: c.child.info.id}),
          quantity: c.child.quantity,
          id: c.child.join_id,
          cost: c.child.cost

        }))
      }
      if (this.elements.updateList) {
        this.$store.dispatch('GET_ELEMENTS');
      }
      if (this.type_join === 'estimate_elements') {
        this.joinElements = this.activeEstimate.attributes.estimate_elements_info.map(c => ({
          parent_element_id: this.parent_id,
          child_element_id: (c.info === null ? null : {name: c.info.title, value: c.info.id}),
          quantity: c.quantity,
          id: c.join_id,
          cost: c.cost

        }))
      }
    }
  }
</script>

<style scoped lang="scss">
  .width-small {
    width: 50px;
  }
</style>
