<template>
  <div>
    <v-row
      class="mt-10"
      justify="center"
    >
      <v-card
        id="card"
        width="350"
        outlined
      >
        <v-container fluid>
          <v-row
            justify="center"
          >
            <v-col>
              <v-text-field
                v-model="id"
                v-on:keyup.enter="login"
                color="light-green lighten-1"
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
                v-on:keyup.enter="login"
                color="light-green lighten-1"
                label="비밀번호"
                type="password"
                outlined
                dense
              />
            </v-col>
          </v-row>
        </v-container>
        <v-divider class="mt-n6"/>
        <v-container fluid>
          <v-row
            justify="center"
          >
            <v-col>
              <v-btn
                v-on:click="login"
                color="light-green lighten-1"
                dark
                block
                depressed
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
                color="light-green lighten-1"
                block
                outlined
              >회원가입</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      pw: '',
    };
  },
  methods: {
    async login() {
      try {
        const res = await this.$axios.post('/api/auth/sign-in', {
          id: this.id,
          pw: Buffer.from(this.pw).toString('base64'),
        });
        if (res.data.message === 'login success') {
          localStorage.token = res.data.token;
          this.$router.push('/home');
        }
      } catch (err) {
        this.id = '';
        this.pw = '';
        // eslint-disable-next-line
        alert('아이디 또는 비밀번호를 확인해 주세요.');
      }
    },
    signUp() {
      this.$router.push('/sign-up');
    },
  },
};
</script>

<style scoped>
#card {
  border-color: #e0e0e0 !important;
}
</style>
