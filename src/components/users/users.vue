<template>
  <v-card>
    <v-card-title>
      Users
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
      <v-data-table :headers="headers" :items="displayUsers" :items-per-page="5" :search="search"
                    class="elevation-1" ref="usersTable">
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
                      <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.lastname" label="Lastname"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.birthday" label="Birthday"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.active" label="Active"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.linkedin" label="Linkedin"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.role.id" label="Role"></v-text-field>
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
                <p>Are you sure you want to delete the item <b>{{ editedItem.username }}</b></p>
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

import UserService from '../../services/users-service';
export default {
  name: "users",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Username', value: 'username'},
        {text: 'Password', value: 'password'},
        {text: 'Name', value: 'name'},
        {text: 'Lastname', value: 'lastname'},
        {text: 'Birthday', value: 'birthday'},
        {text: 'Email', value: 'email'},
        {text: 'Phone', value: 'phone'},
        {text: 'Address', value: 'address'},
        {text: 'Active', value: "active" },
        {text: 'Linkedin', value: "linkedin" },
        {text: 'Role', value: "role" },
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      users: [],
      displayUsers: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        username: '',
        role: ''
      },
      defaultItem: {
        id: 0,
        username: '',
        role: ''
      },
    }
  },


  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
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
    retrieveUsers() {
      UserService.getAll()
          .then(response => {
            this.users = response.data;
            this.displayUsers = response.data.map(this.getDisplayUser);
          })
          .catch((e) => {
            console.log(e);
          });
    },


    getDisplayUser(user) {
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        password: user.password,
        lastname: user.lastname,
        birthday: user.birthday,
        email: user.email,
        phone: user.phone,
        address: user.address,
        active: user.active,
        linkedin: user.linkedin,
        role: user.role.name
      };
    },


    refreshList() {
      this.retrieveUsers();
    },

    removeAllUsers() {
      UserService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displayUsers.indexOf(item);
      console.log(item);
      this.editedItem = this.users[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displayUsers.indexOf(item);
      this.editedItem = Object.assign({}, this.users[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteUser(this.editedItem.id);
      this.users.splice(this.editedIndex, 1);
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
        this.users[this.editedIndex] = this.editedItem;
        this.displayUsers[this.editedIndex] = this.getDisplayUser(this.users[this.editedIndex]);
        UserService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        UserService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.users.push(item);
              this.displayUsers.push(this.getDisplayUser(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteUser(id) {
      UserService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddUser() {
      this.$router.push({name: 'add-user'});
    },
    navigateToEditUser(id) {
      this.$router.push({name: 'edit-user', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveUsers();
  }

}
</script>

<style scoped>

</style>