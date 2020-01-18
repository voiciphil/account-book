<template>
  <v-container fluid>
    <v-row
      class="mx-10 mt-7"
      justify="center"
    >
      <v-col cols="3">
        <v-text-field
          v-model="id"
          v-bind:rules="[rules.idError, rules.required]"
          v-bind:error="errors.id"
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
          v-bind:rules="[rules.pwError, rules.required]"
          v-bind:error="errors.pw"
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
  data() {
    return {
      id: '',
      pw: '',
      rules: {
        required: value => !!value || '입력해 주세요.',
        idError: () => !this.errors.notRegistered || '등록되지 않은 아이디입니다.',
        pwError: () => !this.errors.wrongPassword || '비밀번호가 일치하지 않습니다.',
      },
      errors: {
        id: false,
        pw: false,
        notRegistered: false,
        wrongPassword: false,
      },
    };
  },
  methods: {
    async login() {
      this.errors.id = this.id === '';
      this.errors.pw = this.pw === '';
      this.errors.notRegistered = false;
      this.errors.wrongPassword = false;

      if (this.errors.id || this.errors.pw) {
        return;
      }

      const res = await this.$axios.post('http://localhost:3000/api/auth/sign-in', {
        id: this.id,
        pw: Buffer.from(this.pw).toString('base64'),
      });

      if (res.data.message === 'login success') {
        localStorage.token = res.data.token;
        this.$router.push('/home');
      } else if (res.data.message === 'id not registered') {
        this.errors.notRegistered = true;
        this.id = '';
      } else if (res.data.message === 'password do not match') {
        this.errors.wrongPassword = true;
        this.pw = '';
      }
    },
    signUp() {
      this.$router.push('/sign-up');
    },
  },
  updated() {
    if (this.id !== '') {
      this.errors.id = false;
      this.errors.notRegistered = false;
    }
    if (this.pw !== '') {
      this.errors.pw = false;
      this.errors.wrongPassword = false;
    }
  },
};
</script>

<style>

</style>
