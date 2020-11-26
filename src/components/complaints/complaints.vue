<template>
  <v-card>
    <v-card-title>
      Complaints
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
      <v-data-table :headers="headers" :items="displayComplaints" :items-per-page="5" :search="search"
                    class="elevation-1" ref="ComplaintsTable">
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
                      <v-text-field v-model="editedItem.description" label="Complaint Description"></v-text-field>
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

import ComplaintService from '../../services/complaints-service'

export default {

  name: "complaints",
  data (){
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Description', value: 'description'},
        {text: 'User', value: 'user'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      complaints: [],
      displayComplaints: [],
      editedIndex: -1,
      editedItem: {
        id: 0
      },
      defaultItem: {
        id: 0
      },
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Complaint' : 'Edit Complaint'
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
    retrieveComplaint() {
      ComplaintService.getAll()
          .then(response => {
            this.complaints = response.data;
            this.displayComplaints = response.data.map(this.getDisplayComplaint);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayComplaint(complaint) {
      return {
        id: complaint.id,
        description: complaint.description,
        user: complaint.user.username
      };
    },

    refreshList() {
      this.retrieveComplaint();
    },


    removeAllComplaints() {
      ComplaintService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displayComplaints.indexOf(item);
      console.log(item);
      this.editedItem = this.complaints[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displayComplaints.indexOf(item);
      this.editedItem = Object.assign({}, this.complaints[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteComplaint(this.editedItem.id);
      this.complaints.splice(this.editedIndex, 1);
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
        this.complaints[this.editedIndex] = this.editedItem;
        this.displayComplaints[this.editedIndex] = this.getDisplayComplaint(this.complaints[this.editedIndex]);
        ComplaintService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        ComplaintService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.complaints.push(item);
              this.displayComplaints.push(this.getDisplayComplaint(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },


    deleteComplaint(id) {
      ComplaintService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddComplaint() {
      this.$router.push({name: 'add-complaint'});
    },
    navigateToEditComplaint(id) {
      this.$router.push({name: 'edit-complaint', params: { id: id}});
    }

  },

  mounted() {
    this.retrieveComplaint();
  }

}

</script>

<style scoped>

</style>