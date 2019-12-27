<template>
  <v-container fluid>
    <v-row
      class="mt-10"
      justify="center"
    >
      <v-card
        width="500px"
        height="300px"
        color="grey lighten-5"
        outlined
      >
        <v-container
          class="pa-n3"
          fluid
        >
          <v-row
            justify="center"
          >
          </v-row>
          <v-row class="ml-3 mr-10 mt-7">
            <v-text-field
              v-model="id"
              v-on:keyup.enter="login"
              width="250px"
              color="indigo darken-3"
              label="아이디"
              prepend-icon="mdi-account"
              outlined
              dense
            ></v-text-field>
          </v-row>
          <v-row class="ml-3 mr-10">
            <v-text-field
              v-model="pw"
              v-on:keyup.enter="login"
              color="indigo darken-3"
              label="비밀번호"
              type="password"
              prepend-icon="mdi-lock"
              outlined
              dense
            ></v-text-field>
          </v-row>
          <v-row
            class="mx-10"
            justify="center"
          >
            <v-btn
              v-on:click="login"
              color="indigo darken-3"
              dark
              rounded
            >로그인</v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      id: '',
      pw: '',
    };
  },
  methods: {
    async login() {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        id: this.id,
        pw: Buffer.from(this.pw).toString('base64'),
      });
      if (res.data.message === 'login success') {
        this.$store.commit('setToken', res.data.token);
        this.$router.push('/home');
      }
    },
  },
};
</script>

<style>

</style>
