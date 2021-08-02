<template>
  <div>
    <v-container fill-height fluid>
      <v-row no-gutters style="height: 150px" align="center" justify="center">
        <v-col cols="4">
          <v-card class="pa-6">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              align="center"
              justify="center"
            >
              <v-text-field
                v-model="username"
                :counter="10"
                :rules="usernameRules"
                label="Username"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="login"
              >
                Log in
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: "",
    showPassword: false,
    valid: true,
    usernameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length > 6) || "Password must be more than 6 characters",
    ],
  }),

  methods: {
    login() {
      const username = this.$data.username;
      const password = this.$data.password;
      this.$refs.form.validate();
      console.log(
        "Trying to login with username and password",
        username,
        password
      );
      this.$store.dispatch("obtainToken", {
        username: username,
        password: password,
      });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>