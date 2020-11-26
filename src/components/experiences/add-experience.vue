<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Experience</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Id"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.name" label="Name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.description" label="Description"></v-text-field>
          </v-col>

        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ExperienceService from "@/services/experiences-service";

export default {
  name: "add-experience",
  data() {
    return {
      item: {
        id: 0,
        name: '',
        description:''
      }
    }
  },
  methods: {

    save() {
      ExperienceService.create(this.item)
          .then(() => {
            this.navigateToExperiences();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToExperiences();
    },
    navigateToExperiences() {
      this.$router.push({name: 'experiences'});
    }
  }
}
</script>

<style scoped>

</style>