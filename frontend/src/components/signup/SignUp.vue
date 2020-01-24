<template>
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
              v-on:keyup.enter="signUp"
              color="light-green lighten-1"
              label="아이디"
              outlined
              dense
              counter
              maxlength="20"
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
              v-on:keyup.enter="signUp"
              color="light-green lighten-1"
              label="비밀번호"
              type="password"
              outlined
              dense
              counter
              maxlength="20"
            />
          </v-col>
        </v-row>
        <v-row
          class="mt-n5"
          justify="center"
        >
          <v-col>
            <v-text-field
              v-model="repw"
              v-on:keyup.enter="signUp"
              color="light-green lighten-1"
              label="비밀번호 재입력"
              type="password"
              outlined
              dense
              counter
              maxlength="20"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="mt-n4"/>
      <v-container fluid>
        <v-row
          justify="center"
        >
          <v-col>
            <v-btn
              v-on:click="signUp"
              color="light-green lighten-1"
              dark
              block
              depressed
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
      repw: '',
    };
  },
  methods: {
    async signUp() {
      if (this.id !== '' && this.pw !== '' && this.repw !== '') {
        if (this.pw === this.repw) {
          try {
            await this.$axios.post('http://localhost:3000/api/auth/sign-up', {
              id: this.id,
              pw: this.pw,
            });
            this.$router.push('/signed-up');
          } catch (err) {
            // eslint-disable-next-line no-alert
            alert('아이디가 중복되었습니다.');
          }
        } else {
          // eslint-disable-next-line no-alert
          alert('비밀번호가 다릅니다.');
        }
      } else {
        // eslint-disable-next-line no-alert
        alert('빈 칸 없이 입력해 주세요.');
      }
    },
  },
};
</script>

<style>
#card {
  border-color: #e0e0e0 !important;
}
</style>
