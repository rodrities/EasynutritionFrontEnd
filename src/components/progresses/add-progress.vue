<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Progress</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.sessionId" label="SessionId"></v-text-field>
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
import ProgressService from "@/services/progresses-service";

export default {
  name: "add-progress",
  data() {
    return {
      item: {
        id: 0,
      }
    }
  },
  methods: {

    save() {
      ProgressService.create(this.item)
          .then(() => {
            this.navigateToProgresses();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToProgresses();
    },
    navigateToProgresses() {
      this.$router.push({name: 'progresses'});
    }
  }
}
</script>

<style scoped>

</style>
