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
        <td class="text-xs-left width-small">{{props.item.cost}}</td>
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
      ...mapState(['elements']),
      childElements() {
        const list =  this.elements.list.map(e => ({name: e.attributes.title, value: e.id}))
        return list.filter(e => e.value !== this.parent_id)
      },
      activeElement() {
        return this.elements.activeElement
      }
    },
    props: ['parent_id'],
    watch: {
      activeElement() {
         this.joinElements = this.elements.activeElement.attributes.child_elements.map(c => ({
          parent_element_id: this.parent_id,
          child_element_id: (c.child.info === null ? null : {name: c.child.info.title, value: c.child.info.id}),
          quantity: c.child.quantity,
          id: c.child.join_id,
          cost: c.child.cost
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
      },

      removeJoin (id) {
        this.$store.dispatch('DESTROY_JOIN', {elem_id: this.parent_id, join_id: id})
      },
      updateJoin(item) {
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
    },
    mounted () {
      this.joinElements = this.elements.activeElement.attributes.child_elements.map(c => ({
        parent_element_id: this.parent_id,
        child_element_id: (c.child.info === null ? null : {name: c.child.info.title, value: c.child.info.id}),
        quantity: c.child.quantity,
        id: c.child.join_id,
        cost: c.child.cost

      }))
    }
  }
</script>

<style scoped lang="scss">
  .width-small {
    width: 50px;
  }
</style>
