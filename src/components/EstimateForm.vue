<template>
  <div>
    <v-form ref="form" v-model="valid">

      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 :class='flexClass'>
            <v-card class="card">
              <div class="subtitle">Informations</div>
              <div class="form-content">
                <v-text-field v-model="number" label="Numéro"></v-text-field>
                <v-text-field v-model="client" label="Titre"></v-text-field>
                <v-text-field v-model="remise" label="Remise"></v-text-field>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs12 :class="flexClass">
            <v-card class="card" >
              <div class="subtitle">Composition</div>
              <div v-if="!create">
                <JoinElements ref="joinElements" v-bind:parent_id="id" v-bind:type_join="'estimate_elements'"/>
              </div>
              <div v-if="create">
                <p>Veuillez enregister les infos du devis avant d'ajouter une composition</p>
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
  import JoinElements from './JoinElements'
    import { mapState } from 'vuex'

  export default {
    name: 'EstimateForm',
    components: {
      JoinElements
    },
    props: ['id', 'create'],
    data: () => ({
      valid: false,
      number: null,
      client: null,
      remise: null,
    }),
    computed: {
      ...mapState(['estimates', 'layout']),
      activeEstimate() {
        if (this.create === false) {
          return this.estimates.activeEstimate
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
      validate(e) {
        e.preventDefault();
        if (this.$refs.form.validate()) {
          const payload = {
            id: this.id,
            data: {
              estimate: {
                number: this.number,
                client: this.client,
                remise: this.remise,
              }
            }
          }
          if (this.create === false) {this.$store.dispatch('UPDATE_ESTIMATE', payload)}
          if (this.create === true) {this.$store.dispatch('CREATE_ESTIMATE', payload)}

        }
      }
    },
    mounted () {
      if (this.create === false) {
          this.$store.dispatch('GET_ESTIMATE', this.id)
      }
    },
    watch: {
      activeEstimate (val) {
        this.number = val.attributes.number
        this.client = val.attributes.client
        this.remise = val.attributes.remise
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
