<template>
  <v-toolbar >
    <v-toolbar-side-icon @click="toggleSidebar()"></v-toolbar-side-icon>

    <v-toolbar-title >iBuild</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'Navbar',
    methods: {
      toggleSidebar() {
        this.$store.dispatch('TOOGLE_SIDEBAR')
      }
    }
  }
</script>
