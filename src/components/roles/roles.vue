<template>
  <v-card>
    <v-card-title>
      Roles
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="displayRoles" :items-per-page="5" :search="search"
                    class="elevation-1" ref="rolesTable">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Role Name"></v-text-field>
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
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete Item</v-card-title>
              <v-card-text>
                <p>Are you sure you want to delete the item <b>{{ editedItem.name }}</b></p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import RoleService from '../../services/roles-service';

export default {
  name: "roles",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      roles: [],
      displayRoles: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: ''
      },
      defaultItem: {
        id: 0,
        name: ''
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    retrieveRoles() {
      RoleService.getAll()
          .then(response => {
            this.roles = response.data;
            this.displayRoles = response.data.map(this.getDisplayRole);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayRole(role) {
      return {
        id: role.id,
        name: role.name
      };
    },

    refreshList() {
      this.retrieveRoles();
    },

    removeAllRoles() {
      RoleService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displayRoles.indexOf(item);
      console.log(item);
      this.editedItem = this.roles[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displayRoles.indexOf(item);
      this.editedItem = Object.assign({}, this.roles[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteRole(this.editedItem.id);
      this.roles.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.roles[this.editedIndex] = this.editedItem;
        this.displayRoles[this.editedIndex] = this.getDisplayRole(this.roles[this.editedIndex]);
        RoleService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        RoleService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.roles.push(item);
              this.displayRoles.push(this.getDisplayRole(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteRole(id) {
      RoleService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddRole() {
      this.$router.push({name: 'add-role'});
    },
    navigateToEditRole(id) {
      this.$router.push({name: 'edit-role', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveRoles();
  }

}
</script>

<style scoped>

</style>