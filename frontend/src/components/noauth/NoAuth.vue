<template>
  <div>
    <v-row
      class="mt-10"
      justify="center"
    >
      <v-card
        id="card"
        color="grey lighten-5"
        outlined
        width="250"
      >
        <v-container fluid>
          <v-row
            justify="center"
          >
            <span
              class="title font-weight-regular"
            >권한이 없습니다.</span>
          </v-row>
          <v-row
            class="mt-3 mb-n2"
            justify="center"
          >
            <v-col>
              <v-btn
                v-on:click="home"
                small
                block
                color="light-green lighten-1"
                dark
              >확인</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    home() {
      this.$router.push('/');
    },
  },
};
</script>

<style>
#card {
  border-color: #e0e0e0 !important;
}
</style>
