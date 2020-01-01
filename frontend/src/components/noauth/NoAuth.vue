<template>
  <div>
    <v-container fluid>
      <v-row
        class="mt-10"
        justify="center"
      >
        <span
          class="title font-weight-regular"
        >권한이 없습니다.</span>
      </v-row>
      <v-row
        class="mt-3"
        justify="center"
      >
        <v-btn
          v-on:click="home"
          small
          rounded
          outlined
          color="indigo darken-3"
          dark
        >확인</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'NoAuth',
  methods: {
    home() {
      this.$router.push('/');
    },
  },
};
</script>

<style>

</style>
