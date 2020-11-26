<template>
  <v-card>
    <v-card-title>
      Subscriptions
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
      <v-data-table :headers="headers" :items="displaySubscriptions" :items-per-page="5" :search="search"
                    class="elevation-1" ref="subscriptionsTable">
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
                      <v-text-field v-model="editedItem.maxSessions" label="MaxSessions"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.active" label="Active"></v-text-field>
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
import SubscriptionService from '../../services/subscriptions-service';

export default {
  name: "subscriptions",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'MaxSessions', value: 'maxSessions'},
        {text: 'Price', value: 'price'},
        {text: 'Active', value: "active" },
        {text: 'User', value: 'user'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      subscriptions: [],
      displaySubscriptions: [],
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
      return this.editedIndex === -1 ? 'New Subscription' : 'Edit Subscription'
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
    retrieveSubscriptions() {
      SubscriptionService.getAll()
          .then(response => {
            this.subscriptions = response.data;
            this.displaySubscriptions = response.data.map(this.getDisplaySubscription);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplaySubscription(subscription) {
      return {
        id: subscription.id,
        maxSessions: subscription.maxSessions,
        price: subscription.price,
        active: subscription.active,
        user: subscription.user.username
      };
    },

    refreshList() {
      this.retrieveSubscriptions();
    },

    removeAllSubscriptions() {
      SubscriptionService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displaySubscriptions.indexOf(item);
      console.log(item);
      this.editedItem = this.subscriptions[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displaySubscriptions.indexOf(item);
      this.editedItem = Object.assign({}, this.subscriptions[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteSubscription(this.editedItem.id);
      this.subscriptions.splice(this.editedIndex, 1);
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
        this.subscriptions[this.editedIndex] = this.editedItem;
        this.displaySubscriptions[this.editedIndex] = this.getDisplaySubscription(this.subscriptions[this.editedIndex]);
        SubscriptionService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        SubscriptionService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.subscriptions.push(item);
              this.displaySubscriptions.push(this.getDisplaySubscription(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteSubscription(id) {
      SubscriptionService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddSubscription() {
      this.$router.push({name: 'add-subscription'});
    },
    navigateToEditSubscription(id) {
      this.$router.push({name: 'edit-subscription', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveSubscriptions();
  }

}
</script>

<style scoped>

</style>
