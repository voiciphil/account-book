<template>
  <div>
    <v-row
      justify="center"
      class="mt-5"
    >
      <v-date-picker
        v-model="picker"
        color="indigo darken-3"
        landscape
      >
      </v-date-picker>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
    };
  },
};
</script>

<style>

</style>
