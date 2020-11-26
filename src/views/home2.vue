<template>
  <v-container  class="green accent-4">
    <v-row justify="center" no-gutters>
      <v-col lg="2" >
        <v-img width="200" src="../assets/logo.png"></v-img>
      </v-col>
      <v-col>

        <h1 > <br> Welcome to Easy Nutrition</h1>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col md="4">
        <v-card
            class="mx-auto pa-2"
            max-width="300"
        >
          <v-img
              src="../assets/diet.jpg"
              height="200px"
          ></v-img>

          <v-card-title>
            Dieta Vegetariana
          </v-card-title>

          <v-card-subtitle>
            #1
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
                color="green lighten-2"
                text
            >
              Details
            </v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>

      <v-col  md="4">
        <v-card
            class="mx-auto pa-2"
            max-width="300"
        >
          <v-img
              src="../assets/zoom.jpg"
              height="200px"

          ></v-img>

          <v-card-title>
            Session #2
          </v-card-title>

          <v-card-subtitle>
            Alfredo Gomez
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
                color="green lighten-2"
                text
            >
              Details
            </v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: "home2"
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.home{
  width: 100%;
  height: 600px;
  background-size: cover;

}
h1 {
  font-size: 40px;
  font-weight: bold;
}
</style>
