<template>
  <v-card>
    <v-card-title>
      Experiences
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
      <v-data-table :headers="headers" :items="displayExperiences" :items-per-page="5" :search="search"
                    class="elevation-1" ref="experiencesTable">
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
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.user" label="User"></v-text-field>
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
import ExperienceService from '../../services/experiences-service';

export default {
  username: "experience",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Description', value: 'description'},
        {text: 'User', value: 'user'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      experiences: [],
      displayExperiences: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        description: '',
        user: ''
      },
      defaultItem: {
        id: 0,
        name: '',
        description: '',
        user: ''
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Experience' : 'Edit Experience'
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
    retrieveExperiences() {
      ExperienceService.getAll()
          .then(response => {
            this.users = response.data;
            this.displayExperiences = response.data.map(this.getDisplayExperience);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayExperience(experience) {
      return {
        id: experience.id,
        name: experience.name,
        description: experience.description,
        user: experience.user.username
      };
    },

    refreshList() {
      this.retrieveExperiences();
    },

    removeAllExperiences() {
      ExperienceService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displayExperiences.indexOf(item);
      console.log(item);
      this.editedItem = this.experiences[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displayExperiences.indexOf(item);
      this.editedItem = Object.assign({}, this.experiences[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteExperience(this.editedItem.id);
      this.experiences.splice(this.editedIndex, 1);
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
        this.experiences[this.editedIndex] = this.editedItem;
        this.displayExperiences[this.editedIndex] = this.getDisplayExperience(this.experiences[this.editedIndex]);
        ExperienceService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        ExperienceService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.users.push(item);
              this.displayExperiences.push(this.getDisplayExperience(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteExperience(id) {
      ExperienceService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddExperience() {
      this.$router.push({name: 'add-experience'});
    },
    navigateToEditExperience(id) {
      this.$router.push({name: 'edit-experience', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveExperiences();
  }

}
</script>

<style scoped>

</style>