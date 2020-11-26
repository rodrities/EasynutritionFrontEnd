<template>
  <v-app>
    <v-app-bar app dark fixed>
      <v-toolbar-title>Easy Nutrition</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/login">Sign In</v-btn>
        <v-btn text to="/register">Sign Up</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-card>
          <v-card-title>Enter to the App</v-card-title>
          <v-form>
            <v-card-text>
              <v-text-field label="Username"
                            autocomplete="username"
                            required></v-text-field>
              <v-text-field label="Password"
                            type="password"
                            autocomplete="current-password"
                            required></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn text to="/main">Sign in</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'login',

  components: {

  },

  data: () => ({
    //
  }),
};
</script>