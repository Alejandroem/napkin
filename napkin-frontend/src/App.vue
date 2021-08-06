<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div v-if="isAuth">Welcome back {{ userName }}!</div>
      <v-spacer></v-spacer>

      <v-btn v-if="isAuth" justify-end outlined @click="logout"> Logout </v-btn>
    </v-app-bar>
    <v-main>
      <div v-if="!isAuth">
        <LoginForm />
      </div>
      <div v-else>
        <Home />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

export default {
  created: function () {
    console.log("JWT", this.$store.state.jwt);
    console.log("App intialized");
    this.$store.dispatch("inspectToken");
  },
  name: "App",

  components: {
    LoginForm,
    Home,
  },

  computed: {
    isAuth() {
      return this.$store.state.isAuth;
    },
    userName() {
      return this.$store.state.currentUser;
    },
  },

  data: () => ({
    //
  }),

  methods: {
    logout() {
      return this.$store.dispatch("logout");
    },
  },
};
</script>
