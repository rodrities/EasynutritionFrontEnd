<template>
  <v-card>
    <v-card-title>
      Progresses
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
      <v-data-table :headers="headers" :items="displayProgresses" :items-per-page="5" :search="search"
                    class="elevation-1" ref="progressesTable">
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
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete Item</v-card-title>
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
import ProgressService from '../../services/progresses-service';

export default {
  name: "progresses",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Description', value: 'description'},
        {text: 'Session', value: 'Session'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      progresses: [],
      displayProgresses: [],
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
      return this.editedIndex === -1 ? 'New Progress' : 'Edit Progress'
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
    retrieveProgresses() {
      ProgressService.getAll()
          .then(response => {
            this.progresses = response.data;
            this.displayProgresses = response.data.map(this.getDisplayProgress);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayProgress(progress) {
      return {
        id: progress.id,
        description: progress.description,
      };
    },

    refreshList() {
      this.retrieveProgresses();
    },

    removeAllProgresses() {
      ProgressService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displayProgresses.indexOf(item);
      console.log(item);
      this.editedItem = this.progresses[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displayProgresses.indexOf(item);
      this.editedItem = Object.assign({}, this.progresses[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteProgress(this.editedItem.id);
      this.progresses.splice(this.editedIndex, 1);
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
        this.progresses[this.editedIndex] = this.editedItem;
        this.displayProgresses[this.editedIndex] = this.getDisplayProgress(this.progresses[this.editedIndex]);
        ProgressService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        ProgressService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.progresses.push(item);
              this.displayProgresses.push(this.getDisplayProgress(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteProgress(id) {
      ProgressService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddProgress() {
      this.$router.push({name: 'add-progress'});
    },
    navigateToEditProgress(id) {
      this.$router.push({name: 'edit-progress', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveProgresses();
  }

}
</script>

<style scoped>

</style>
