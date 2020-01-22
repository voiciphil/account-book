<template>
  <div>
    <v-row
      class="mt-10"
      justify="center"
    >
      <v-card
        id="card"
        outlined
        width="300"
      >
        <v-container fluid>
          <v-row
            justify="center"
          >
            <span
              class="title font-weight-regular"
            >회원가입이 완료되었습니다.</span>
          </v-row>
          <v-row
            class="mt-3 mb-n2"
            justify="center"
          >
            <v-col>
              <v-btn
                v-on:click="home"
                block
                color="light-green lighten-1"
                dark
                depressed
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

</style>
