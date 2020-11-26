<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Schedule</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Id"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.startAt" label="StartAt"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.endAt" label="EndAt"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.state" label="State"></v-text-field>
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
import ScheduleService from "@/services/schedules-service";

export default {
  name: "edit-schedule",
  data() {
    return {
      item: {
        id: 0,
      }
    }
  },
  methods: {
    retrieveSchedule(id) {
      ScheduleService.get(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },

    save() {
      ScheduleService.update(this.item.id, this.item)
          .then(() => {
            this.navigateToSchedules();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToSchedules();
    },
    navigateToSchedules() {
      this.$router.push({name: 'schedules'});
    }
  },
  created() {
    this.retrieveSchedule(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
