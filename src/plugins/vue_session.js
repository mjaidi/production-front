import Vue from 'vue';
import VueSession from 'vue-session';
import axios from 'axios';

const options = {
  presist: true,
};

Vue.use(VueSession, options);

export const login = {
  name: 'login',
  methods: {
    login() {
      axios.post('http://somehost/user/login', {
        password: this.password,
        email: this.email,
      }).then(function (response) {
        if (response.status === 200 && 'token' in response.body) {
          this.$session.start();
          this.$session.set('jwt', response.body.token);
          Vue.http.headers.common.Authorization = `Bearer ${response.body.token}`;
          this.$router.push('/');
        }
      }, (err) => {
        console.log('err', err);
      });
    },
  },
};
