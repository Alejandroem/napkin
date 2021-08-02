import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader


import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt_decode from 'jwt-decode'
import Vuex from 'vuex'

import Vuetify from 'vuetify';


Vue.use(Vuex);
Vue.use(VueAxios, axios);

Vue.use(Vuetify);

const store = new Vuex.Store({
  state: {
    currentUser: '',
    isAuth: false,
    jwt: localStorage.getItem('t'),
    endpoints: {
      obtainJWT: 'http://0.0.0.0:8000/auth/obtain_token',
      refreshJWT: 'http://0.0.0.0:8000/auth/refresh_token'
    }
  },
  mutations: {
    updateUsername(state, username) {
      state.currentUser = username;
    },
    updateIsAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
    updateToken(state, newToken) {
      localStorage.setItem('t', newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      localStorage.removeItem('t');
      state.jwt = null;
    }
  },
  actions: {
    obtainToken(context, data) {
      const payload = {
        username: data.username,
        password: data.password
      }
      axios.post(this.state.endpoints.obtainJWT, payload)
        .then((response) => {
          this.commit('updateUsername', data.username);
          this.commit('updateToken', response.data.token);
          this.commit('updateIsAuth', true);
        })
        .catch((error) => {
          console.log(error);
          this.commit('updateIsAuth', false);
        })
    },
    refreshToken() {
      const payload = {
        token: this.state.jwt
      }
      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
          this.commit('updateIsAuth', true);
        })
        .catch((error) => {
          console.log(error)
          this.commit('updateIsAuth', false);
        })
    },
    inspectToken() {
      console.log("Inspect token", this.state.jwt);
      const token = this.state.jwt;
      if (token) {
        const decoded = jwt_decode(token);
        console.log("Decoded token ", decoded);
        const exp = decoded.exp
        //const orig_iat = decoded.orig_iat

        if (Date.now() >= exp * 1000) {
          this.commit('updateIsAuth', false);
        } else {
          console.log("Do nothing");
          this.commit('updateIsAuth', true);
        }
        // if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - orig_iat < 628200) {
        //   this.dispatch('refreshToken')
        // } else if (exp - (Date.now() / 1000) < 1800) {
        //   // DO NOTHING, DO NOT REFRESH          
        //   console.log("Do nothing");
        //   this.commit('updateIsAuth', true);
        // } else {
        //   // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
        //   console.log(" Prompt relogin ");
        //   this.commit('updateIsAuth', false);
        // }
      }
    }
  }
})


Vue.config.productionTip = false
new Vue({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  store: store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
