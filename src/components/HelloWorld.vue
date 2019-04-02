<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-for="(element, index) in elements" v-bind:key="index">
      <p><strong>Description: </strong> {{element.attributes.description}}</p>
      <p><strong>Prix Achat: </strong> {{element.attributes.prix_achat}}</p>
      <hr>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'

  const config = {
   headers: {
        Accept: 'application/json',
      'Content-Type': 'application/json'
      }
}
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data: () => ({
    elements: null
  }),
  methods: {
    fetchElements() {
     axios.get(`http://localhost:3000/api/v1/elements`, config)
      .then(res => this.elements = res.data.data)
      .catch(err => console.log(err))
    }
  },
  mounted() {
    this.fetchElements()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
