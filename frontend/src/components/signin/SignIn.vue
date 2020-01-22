<template>
  <v-row
    class="mt-10"
    justify="center"
  >
    <v-card
      id="card"
      width="350"
      outlined
      color="grey lighten-5"
    >
      <v-container fluid>
        <v-row
          justify="center"
        >
          <v-col>
            <v-text-field
              v-model="id"
              v-bind:rules="[rules.idError, rules.required]"
              v-bind:error="errors.id"
              v-on:keyup.enter="login"
              color="indigo"
              label="아이디"
              outlined
              dense
            />
          </v-col>
        </v-row>
        <v-row
          class="mt-n5"
          justify="center"
        >
          <v-col>
            <v-text-field
              v-model="pw"
              v-bind:rules="[rules.pwError, rules.required]"
              v-bind:error="errors.pw"
              v-on:keyup.enter="login"
              color="indigo"
              label="비밀번호"
              type="password"
              outlined
              dense
            />
          </v-col>
        </v-row>
        <v-row
          class="mt-n2"
          justify="center"
        >
          <v-col>
            <v-btn
              v-on:click="login"
              color="indigo"
              dark
              block
              width="90px"
            >로그인</v-btn>
          </v-col>
        </v-row>
        <v-row
          class="mt-n3"
          justify="center"
        >
          <v-col>
            <v-btn
              v-on:click="signUp"
              color="indigo"
              dark
              block
              width="90px"
            >회원가입</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-row>
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

<style scoped>
#card {
  border-color: #e0e0e0 !important;
}
</style>
