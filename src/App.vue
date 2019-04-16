<template>
  <v-app id="app">
    <div>
      <Sidebar />
    </div>
    <router-view class="offset"/>
  </v-app>
</template>

<script>
  import Sidebar from '@/components/navigation/Sidebar'

  export default {
    name: 'App',
    components: {
      Sidebar,
    }
  }
</script>

<style lang="scss">
  @import "./styles/index"
</style>
