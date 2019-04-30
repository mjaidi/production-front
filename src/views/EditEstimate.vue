<template>
  <div>
    <div class="title">Modifier {{activeEstimate === null ? '' : activeEstimate.attributes.title}}</div>
    <EstimateForm v-bind:id="id" v-bind:create="false"/>
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
    props: ['id'],
    computed: {
      ...mapState(['estimates']),
      activeEstimate() {
        return this.estimates.activeEstimate
      },
    }
  }
</script>
