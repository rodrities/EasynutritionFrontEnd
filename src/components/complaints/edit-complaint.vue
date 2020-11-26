<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Complaint</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Complaint Id"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.name" label="Complaint Name"></v-text-field>
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
import ComplaintService from "@/services/complaints-service";

export default {
  name: "edit-Complaint",
  data() {
    return {
      item: {
        id: 0,
        name: '',
        description: ''
      }
    }
  },
  methods: {
    retrieveRole(id) {
      ComplaintService.get(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },

    save() {
      ComplaintService.update(this.item.id, this.item)
          .then(() => {
            this.navigateToRoles();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToRoles();
    },
    navigateToComplaints() {
      this.$router.push({name: 'complaints'});
    }
  },
  created() {
    this.retrieveComplaint(this.$route.params.id);
  }
}

</script>

<style scoped>

</style>