<template>
  <v-card>
    <v-card-title>
      Sessions
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
      <v-data-table :headers="headers" :items="displaySessions" :items-per-page="5" :search="search"
                    class="elevation-1" ref="sessionsTable">
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
                      <v-text-field v-model="editedItem.startAt" label="StartAt"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.endAt" label="EndAt"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.link" label="Link"></v-text-field>
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
import SessionService from '../../services/sessions-service';

export default {
  name: "sessions",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'StartAt', value: 'startAt'},
        {text: 'EndAt', value: 'endAt'},
        {text: 'Link', value: "link" },
        {text: 'User', value: 'user'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      sessions: [],
      displaySessions: [],
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
      return this.editedIndex === -1 ? 'New Session' : 'Edit Session'
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
    retrieveSessions() {
      SessionService.getAll()
          .then(response => {
            this.sessions = response.data;
            this.displaySessions = response.data.map(this.getDisplaySession);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplaySession(session) {
      return {
        id: session.id,
        startAt: session.startAt,
        endAt: session.endAt,
        link: session.link,
        user: session.user.username
      };
    },

    refreshList() {
      this.retrieveSessions();
    },

    removeAllSessions() {
      SessionService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displaySessions.indexOf(item);
      console.log(item);
      this.editedItem = this.sessions[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displaySessions.indexOf(item);
      this.editedItem = Object.assign({}, this.sessions[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteSession(this.editedItem.id);
      this.sessions.splice(this.editedIndex, 1);
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
        this.sessions[this.editedIndex] = this.editedItem;
        this.displaySessions[this.editedIndex] = this.getDisplaySession(this.sessions[this.editedIndex]);
        SessionService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        SessionService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.sessions.push(item);
              this.displaySessions.push(this.getDisplaySession(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteSession(id) {
      SessionService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddSession() {
      this.$router.push({name: 'add-session'});
    },
    navigateToEditSession(id) {
      this.$router.push({name: 'edit-session', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveSessions();
  }

}
</script>

<style scoped>

</style>
