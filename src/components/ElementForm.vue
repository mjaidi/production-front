<template>
  <div>
    <v-form ref="form" v-model="valid">

      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 :class='flexClass'>
            <v-card class="card">
              <div class="subtitle">Informations</div>
              <div class="form-content">
                <v-text-field v-model="title" label="Titre"></v-text-field>
                <v-select v-model="category" label="Catégorie" :items="categories"></v-select>
                <v-text-field v-model="description" label="Description"></v-text-field>
                <v-select v-model="unit" label="Unité" :items="units"></v-select>
                <v-radio-group v-model="type_element" row>
                  <v-radio label="Matière Première" value="MP"></v-radio>
                  <v-radio label="Semi Fini" value="SF"></v-radio>
                  <v-radio label="Fini" value="Fini"></v-radio>
                </v-radio-group>
                <v-switch v-model="built" :label="builtToString()"></v-switch>
              </div>
            </v-card>
            <v-card class="card">
              <div class="subtitle">Prix</div>
              <div class="form-content">
                <div v-if="!built">
                  <v-text-field v-model="purchase_price_ht" label="Prix d'achat HT"></v-text-field>
                  <v-select v-model="purchase_tax" label="TVA" :items="tva" item-text="name" item-value="value"></v-select>
                </div>
                <div v-if="built">
                  <div class="card-info-text center-text">
                    <div v-if="!create">
                      <p><span class="info-title">Prix de Revient</span><span class="info-content">{{activeElement.attributes.element_cost}} dh</span></p>
                    </div>
                  </div>
                  <v-text-field v-model="sales_price_ht" label="Prix de vente HT"></v-text-field>
                  <v-select v-model="sales_tax" label="TVA" :items="tva" item-text="name" item-value="value"></v-select>
                </div>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs12 :class="flexClass" v-if="built">
            <v-card class="card" >
              <div class="subtitle">Composition</div>
              <div v-if="!create">
                <JoinElements ref="joinElements" v-bind:parent_id="id"/>
              </div>
              <div v-if="create">
                <p>Veuillez enregister les infos du produit avant d'ajouter une composition</p>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-btn type="submit" color="primary" large :disabled="!valid" @submit="validate" onSubmit="return false;" @click="validate">Enregistrer</v-btn>
    </v-form>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
  import JoinElements from './JoinElements'

  export default {
    name: 'ElementForm',
    components: {
      JoinElements,
    },
    props: ['id', 'create'],
    data: () => ({
      valid: false,
      title: null,
      category: null,
      description: null,
      unit: null,
      type_element: null,
      built: false,
      sales_price_ht: null,
      sales_tax: null,
      purchase_price_ht: null,
      purchase_tax: null,
      categories: ['Biscuit Carton', 'Biscuit SF', 'Ingrédients', 'Packaging'],
      units: ['Kg', 'unité', 'Litre', 'gr'],
      tva: [{name: '20%', value: 0.2}, {name: '0%', value: '0'}]
    }),
    computed: {
      ...mapState(['elements', 'layout']),
      activeElement() {
        if (this.create === false) {
          return this.elements.activeElement
        }
        return null
      },
      flexClass() {
        if (this.layout.sideBySide) {
            return { md6: this.$vuetify.breakpoint.mdAndUp}
          }
        }
    },
    methods: {
      builtToString() {
        return this.built === true ? 'Fabriqué' : 'Acheté'
      },
      validate(e) {
        e.preventDefault();
        if (this.$refs.form.validate()) {
          const payload = {
            id: this.id,
            data: {
              element: {
                title: this.title,
                category: this.category,
                description: this.description,
                unit: this.unit,
                type_element: this.type_element,
                built: this.built,
                sales_price_ht: this.sales_price_ht,
                sales_tax: this.sales_tax,
                purchase_price_ht: this.purchase_price_ht,
                purchase_tax: this.purchase_tax
              }
            }
          }
          if (this.create === false) {this.$store.dispatch('UPDATE_ELEMENT', payload)}
          if (this.create === true) {this.$store.dispatch('CREATE_ELEMENT', payload)}

        }
      }
    },
    mounted () {
      if (this.create === false) {
        if (this.activeElement === null) {
            this.$store.dispatch('GET_ELEMENT', this.id)
        } else {
          this.title = this.activeElement.attributes.title
          this.category = this.activeElement.attributes.category
          this.description = this.activeElement.attributes.description
          this.unit = this.activeElement.attributes.unit
          this.type_element = this.activeElement.attributes.type_element
          this.built = this.activeElement.attributes.built
          this.sales_price_ht = this.activeElement.attributes.sales_price_ht
          this.sales_tax = this.activeElement.attributes.sales_tax
          this.purchase_price_ht = this.activeElement.attributes.purchase_price_ht
          this.purchase_tax = this.activeElement.attributes.purchase_tax
        }
        if (this.elements.updateList) {
          this.$store.dispatch('GET_ELEMENTS');
        }
      }
    },
    watch: {
      activeElement (val) {
        this.title = val.attributes.title
        this.category = val.attributes.category
        this.description = val.attributes.description
        this.unit = val.attributes.unit
        this.type_element = val.attributes.type_element
        this.built = val.attributes.built
        this.sales_price_ht = val.attributes.sales_price_ht
        this.sales_tax = val.attributes.sales_tax
        this.purchase_price_ht = val.attributes.purchase_price_ht
        this.purchase_tax = val.attributes.purchase_tax
      }
    }
  }
</script>

<style scoped lang="scss">
  .center-text {
    margin: 10px 0;
    font-size: 15px;
  }
</style>
