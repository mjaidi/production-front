<template>
  <div>
    <div class="title">Modifier {{activeElement === null ? '' : activeElement.attributes.title}}</div>
    <ElementForm v-bind:id="id" v-bind:create="false"/>
  </div>
</template>

<script>

import ElementForm from '../components/ElementForm'
import {mapState} from 'vuex'

  export default {
    name: 'EditElement',
    components: {
      ElementForm,
    },
    props: ['id'],
    computed: {
      ...mapState(['elements']),
      activeElement() {
        return this.elements.activeElement
      },
    }
  }
</script>
