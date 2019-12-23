<template>
  <div>
    <v-row
      justify="center"
      class="mt-5"
    >
      <v-col cols="2">
        <v-menu
          v-model="menu"
          v-bind:close-on-content-click="false"
          v-bind:nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="mt-3"
              v-model="date"
              prepend-icon="mdi-calendar"
              readonly
              outlined
              dense
              v-on="on"
              color="indigo darken-3"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            v-on:input="menu = false"
            color="indigo darken-3"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="2">
        <v-radio-group
          v-model="radio"
          row
        >
          <v-radio
            label="수입"
            color="indigo darken-3"
            value="0"
          ></v-radio>
          <v-radio
            label="지출"
            color="indigo darken-3"
            value="1"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      radio: '0',
    };
  },
};
</script>

<style>

</style>
