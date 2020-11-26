<template>
  <v-app>
    <v-app-bar app dark fixed>
      <v-toolbar-title>Easy Nutrition</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/login">Log Out</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-card>
          <v-card-title>Choose your Role</v-card-title>
          <v-form>
            <v-card-actions>
              <v-btn text to="/administrator">Administrador</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn text to="/client">Cliente</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn text to="/nutritionist">Nutricionista</v-btn>
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
  name: "main"
}
</script>

<style scoped>

</style>