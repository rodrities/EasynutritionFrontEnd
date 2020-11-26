<template>
  <v-app>
    <div class="drawer-bar">
      <v-navigation-drawer
          class="green accent-4"
          v-model="drawer"
          app
      >
        <div  >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Account
              </v-list-item-title>
              <v-list-item-subtitle>
                name
              </v-list-item-subtitle>
              <div  class="profile-img">
              </div>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-divider class="black"></v-divider>
        <div >
          <v-list dense nav>
            <v-list-item text to="/users">
              <v-list-item-icon>
                <v-icon>mdi-wrench</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </div>
      </v-navigation-drawer>
    </div>

    <v-app-bar app dark fixed>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title> <v-btn text to="/home2" >Easy Nutrition </v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/calendar">Appointments</v-btn>

        <v-btn text to="/users">Nutritionists</v-btn>
        <v-btn text to="/subscriptions">Subscriptions</v-btn>
        <v-btn text to="/schedules">Schedules</v-btn>
        <v-btn text to="/progresses">Progresses</v-btn>

        <v-btn text to="/experiences">Experiences</v-btn>
        <v-btn text to="/complaints">Complaints</v-btn>
        <v-btn text to="/diets">Diets</v-btn>
        <v-btn text to="/login">Log Out</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <div>
        <h1 align="center">Welcome to EasyNutrition</h1>
      </div>
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
  name: 'App',

  components: {

  },

  data: () => ({ drawer: false
    //
  }),
};
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
#app {
  background-image: url("assets/hero.jpg");
  background-size: cover;

}
.drawer-bar {
  background-color: darkgreen;
  color: white;
}
.profile-img {
  margin-left: 27%;
  height: 100px;
  border-radius: 25%;
  background-image: url("assets/profileimg.png");
  background-size: contain;
}
</style>
