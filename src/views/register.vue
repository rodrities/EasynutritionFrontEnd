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
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Id"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Username"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Password"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Lastname"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Birthday"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Email"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Phone"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Address"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Active"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field  label="Linkedin"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="RoleId"></v-text-field>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn text to="/login">Sign Up</v-btn>
          </v-card-actions>
        </v-card>

      </v-container>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'register',

  components: {

  },

  data: () => ({
    //
  }),
};
</script>