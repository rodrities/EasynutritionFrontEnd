<template>
  <v-app>
    <v-app-bar app dark fixed>
      <v-toolbar-title>Easy Nutrition</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/calendar">Appointments</v-btn>
        <v-btn text to="/experiences">Experiences</v-btn>
        <v-btn text to="/complaints">Complaints</v-btn>
        <v-btn text to="/diets">Diets</v-btn>
        <v-btn text to="/login">Log Out</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>


<script>
export default {
name: "nutritionist"
}
</script>

<style scoped>

</style>
