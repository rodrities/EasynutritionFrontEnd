<template>
  <v-card>
    <v-card-title>
      Schedules
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
      <v-data-table :headers="headers" :items="displaySchedules" :items-per-page="5" :search="search"
                    class="elevation-1" ref="schedulesTable">
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
                      <v-text-field v-model="editedItem.state" label="State"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.userId" label="UserId"></v-text-field>
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
import ScheduleService from '../../services/schedules-service';

export default {
  name: "schedules",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'StartAt', value: 'startAt'},
        {text: 'EndAt', value: 'endAt'},
        {text: 'State', value: "state" },
        {text: 'UserId', value: 'userId'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      schedules: [],
      displaySchedules: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        schedulename: ''
      },
      defaultItem: {
        id: 0,
        schedulename: ''
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Schedule' : 'Edit Schedule'
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
    retrieveSchedules() {
      ScheduleService.getAll()
          .then(response => {
            this.schedules = response.data;
            this.displaySchedules = response.data.map(this.getDisplaySchedule);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplaySchedule(schedule) {
      return {
        id: schedule.id,
        startAt: schedule.startAt,
        endAt: schedule.endAt,
        state: schedule.state,
        userId: schedule.userId
      };
    },

    refreshList() {
      this.retrieveSchedules();
    },

    removeAllSchedules() {
      ScheduleService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displaySchedules.indexOf(item);
      console.log(item);
      this.editedItem = this.schedules[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displaySchedules.indexOf(item);
      this.editedItem = Object.assign({}, this.schedules[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteSchedule(this.editedItem.id);
      this.schedules.splice(this.editedIndex, 1);
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
        this.schedules[this.editedIndex] = this.editedItem;
        this.displaySchedules[this.editedIndex] = this.getDisplaySchedule(this.schedules[this.editedIndex]);
        ScheduleService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        ScheduleService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.schedules.push(item);
              this.displaySchedules.push(this.getDisplaySchedule(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteSchedule(id) {
      ScheduleService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddSchedule() {
      this.$router.push({name: 'add-schedule'});
    },
    navigateToEditSchedule(id) {
      this.$router.push({name: 'edit-schedule', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveSchedules();
  }

}
</script>

<style scoped>

</style>
