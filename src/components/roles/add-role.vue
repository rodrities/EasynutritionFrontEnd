<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Role</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.name" label="Role Name"></v-text-field>
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
import RoleService from "@/services/roles-service";

export default {
  name: "add-role",
  data() {
    return {
      item: {
        id: 0,
        name: ''
      }
    }
  },
  methods: {

    save() {
      RoleService.create(this.item)
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
    navigateToRoles() {
      this.$router.push({name: 'roles'});
    }
  }
}
</script>

<style scoped>

</style>
