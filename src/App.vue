<template>
  <v-app id="app">
    <div v-if="flash.show && flash.variant === 'success'" role="alert" aria-live="polite" aria-atomic="true" class="show-alert alert alert-success offset" >
      <button type="button" data-dismiss="alert" aria-label="alertClose" class="close" @click="closeFlash()"><span aria-hidden="true">x</span></button>
      {{flash.message}}
    </div>
    <div v-if="flash.show && flash.variant === 'warning'" role="alert" aria-live="polite" aria-atomic="true" class="show-alert alert alert-warning offset" >
      <button type="button" data-dismiss="alert" aria-label="alertClose" class="close" @click="closeFlash()"><span aria-hidden="true">x</span></button>
      {{flash.message}}
    </div>
    <div v-if="flash.show && flash.variant === 'error'" role="alert" aria-live="polite" aria-atomic="true" class="show-alert alert alert-error offset" >
      <button type="button" data-dismiss="alert" aria-label="alertClose" class="close" @click="closeFlash()"><span aria-hidden="true">x</span></button>
      {{flash.message}}
    </div>
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
    data: () => ({
      flash: {
        message: null,
        show: false,
        variant: null,
      }
    }),
    computed: {
      ...mapState(['layout']),
      stateflash() {
        return this.layout.flash
      },
    },
    methods: {
      closeFlash() {
        this.$store.commit('SET_FLASH', null)
      }
    },
    watch: {
      stateflash() {
        if (this.stateflash !== null) {
          this.flash = {message: this.stateflash.message, show: true, variant: this.stateflash.variant}
        } else {
          this.flash = {message: null, show: false, variant: null}
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./styles/index"
</style>
