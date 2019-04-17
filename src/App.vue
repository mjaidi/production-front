<template>
  <v-app id="app">
    <div>
      <Navbar/>
      <Sidebar/>
    </div>
    <router-view v-bind:class="{offset: !layout.shrink}"/>
  </v-app>
</template>

<script>
  import Sidebar from '@/components/navigation/Sidebar'
  import Navbar from '@/components/navigation/Navbar'
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    components: {
      Sidebar,
      Navbar
    },
    computed: mapState(['layout'])
  }
</script>

<style lang="scss">
  @import "./styles/index"
</style>
