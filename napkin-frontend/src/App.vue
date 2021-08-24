<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div v-if="isAuth">Welcome back {{ userName }}!</div>
      <v-tabs v-model="tab">
        <v-tab key="calculator">Calculator</v-tab>
        <v-tab key="file">File</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-btn v-if="isAuth" justify-end outlined @click="logout"> Logout </v-btn>
    </v-app-bar>
    <v-main>
      <div v-if="!isAuth">
        <LoginForm />
      </div>
      <div v-else>
        <Home v-if="tab == 0" />
        <File v-if="tab == 1" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import File from "./components/File";

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
    File,
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
    tab: null,
  }),

  methods: {
    logout() {
      return this.$store.dispatch("logout");
    },
  },
};
</script>
