<template>
  <div>
    <div class="title">Créer un Devis</div>
      <EstimateForm v-bind:id='null' v-bind:create="true" />
  </div>
</template>

<script>
import EstimateForm from '../components/EstimateForm'


  export default {
    name: 'CreateEstimate',
    components: {
      EstimateForm
    },
  }
</script>
