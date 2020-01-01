<template>
  <v-container fluid>
    <v-row
      class="mx-10 mt-7"
      justify="center"
    >
      <v-col cols="3">
        <v-text-field
          v-model="id"
          v-on:keyup.enter="signUp"
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
          v-on:keyup.enter="signUp"
          color="indigo darken-3"
          label="비밀번호"
          type="password"
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
          v-model="repw"
          v-on:keyup.enter="signUp"
          color="indigo darken-3"
          label="비밀번호 재입력"
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
  name: 'SignUp',
  data() {
    return {
      id: '',
      pw: '',
      repw: '',
    };
  },
  methods: {
    async signUp() {
      if (this.pw === this.repw) {
        const res = await this.$axios.post('http://localhost:3000/api/auth/signup', {
          id: this.id,
          pw: this.pw,
        });

        if (res.data.success) {
          this.$router.push('/');
        }
      }
    },
  },
};
</script>

<style>

</style>
