<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Subscription</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Id"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.maxSessions" label="MaxSessions"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.price" label="Price"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.active" label="Active"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.userId" label="UserId"></v-text-field>
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
import SubscriptionService from "@/services/subscriptions-service";

export default {
  name: "edit-subscription",
  data() {
    return {
      item: {
        id: 0,
      }
    }
  },
  methods: {
    retrieveSubscription(id) {
      SubscriptionService.get(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },

    save() {
      SubscriptionService.update(this.item.id, this.item)
          .then(() => {
            this.navigateToSubscriptions();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToSubscriptions();
    },
    navigateToSubscriptions() {
      this.$router.push({name: 'subscriptions'});
    }
  },
  created() {
    this.retrieveSubscription(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
