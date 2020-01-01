<template>
  <v-container fluid>
    <v-row
      class="mx-10 mt-7"
      justify="center"
    >
      <v-col cols="3">
        <v-text-field
          v-model="id"
          v-on:keyup.enter="login"
          color="indigo darken-3"
          label="아이디"
          outlined
          dense
        />
      </v-col>
    </v-row>
    <v-row
      class="mx-10 mt-n5"
      justify="center"
    >
      <v-col cols="3">
        <v-text-field
          v-model="pw"
          v-on:keyup.enter="login"
          color="indigo darken-3"
          label="비밀번호"
          type="password"
          outlined
          dense
        />
      </v-col>
    </v-row>
    <v-row
      class="mx-10 mt-n2"
      justify="center"
    >
      <v-btn
        class="mr-2"
        v-on:click="login"
        color="indigo darken-3"
        dark
        rounded
        outlined
        width="90px"
      >로그인</v-btn>
      <v-btn
        class="ml-2"
        v-on:click="signUp"
        color="indigo darken-3"
        dark
        rounded
        outlined
        width="90px"
      >회원가입</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      id: '',
      pw: '',
    };
  },
  methods: {
    async login() {
      const res = await this.$axios.post('http://localhost:3000/api/auth/login', {
        id: this.id,
        pw: Buffer.from(this.pw).toString('base64'),
      });
      if (res.data.message === 'login success') {
        localStorage.token = res.data.token;
        this.$router.push('/home');
      }
    },
    signUp() {
      this.$router.push('/signup');
    },
  },
};
</script>

<style>

</style>
