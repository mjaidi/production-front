<template>
  <div>
    <div class="title">Créer un Produit</div>
    <ElementForm v-bind:id='null' v-bind:create="true" />
  </div>
</template>

<script>

import ElementForm from '../components/ElementForm'
import {mapState} from 'vuex'

  export default {
    name: 'CreateElement',
    components: {
      ElementForm,
    },
  }
</script>
