<template>
  <v-card>
    <v-card-title>
      Diets
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
      <v-data-table :headers="headers" :items="displayDiets" :items-per-page="5" :search="search"
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
                      <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.session" label="Session"></v-text-field>
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
                <p>Are you sure you want to delete the item <b>{{ editedItem.title }}</b></p>
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
import DietService from '../../services/diets-service';

export default {
  name: "diets",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Title', value: 'title'},
        {text: 'Description', value: 'description'},
        {text: 'Session', value: "session" },
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      diets: [],
      displayDiets: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        title: '',

      },
      defaultItem: {
        id: 0,
        title: ''
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Diet' : 'Edit Diet'
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
    retrieveDiets() {
      DietService.getAll()
          .then(response => {
            this.diets = response.data;
            this.displayDiets = response.data.map(this.getDisplayDiet);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayDiet(diet) {
      return {
        id: diet.id,
        title: diet.title,
        description: diet.description,
        session: diet.session.id
      };
    },

    refreshList() {
      this.retrieveUsers();
    },

    removeAllDiets() {
      DietService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displayDiets.indexOf(item);
      console.log(item);
      this.editedItem = this.diets[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displayDiets.indexOf(item);
      this.editedItem = Object.assign({}, this.diets[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteDiet(this.editedItem.id);
      this.diets.splice(this.editedIndex, 1);
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
        this.displayDiets[this.editedIndex] = this.getDisplayDiet(this.users[this.editedIndex]);
        DietService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        DietService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.users.push(item);
              this.displayUsers.push(this.getDisplayDiet(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteDiet(id) {
      DietService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddDiet() {
      this.$router.push({name: 'add-diet'});
    },
    navigateToEditDiet(id) {
      this.$router.push({name: 'edit-diet', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveDiets();
  }

}
</script>

<style scoped>

</style>
