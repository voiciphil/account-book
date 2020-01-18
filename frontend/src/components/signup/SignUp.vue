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
          v-bind:rules="[rules.required]"
          v-bind:error="errors.id"
          color="indigo darken-3"
          label="아이디"
          outlined
          dense
          counter
          maxlength="20"
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
          v-bind:rules="[rules.required]"
          v-bind:error="errors.pw"
          color="indigo darken-3"
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
      class="mx-10 mt-n5"
      justify="center"
    >
      <v-col cols="3">
        <v-text-field
          v-model="repw"
          v-on:keyup.enter="signUp"
          v-bind:rules="[rules.required, rules.different]"
          v-bind:error="errors.repw"
          color="indigo darken-3"
          label="비밀번호 재입력"
          type="password"
          outlined
          dense
          counter
          maxlength="25"
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
  data() {
    return {
      id: '',
      pw: '',
      repw: '',
      rules: {
        required: value => !!value || '입력해 주세요.',
        different: value => value === this.pw || '비밀번호가 일치하지 않습니다.',
      },
      errors: {
        id: false,
        pw: false,
        repw: false,
      },
    };
  },
  methods: {
    async signUp() {
      this.errors.id = this.id === '';
      this.errors.pw = this.pw === '';
      this.errors.repw = this.repw === '';

      if (!this.errors.id && !this.errors.pw && !this.errors.repw) {
        if (this.pw === this.repw) {
          const res = await this.$axios.post('http://localhost:3000/api/auth/sign-up', {
            id: this.id,
            pw: this.pw,
          });

          if (res.data.success) {
            this.$router.push('/');
          }
        }
      }
    },
  },
};
</script>

<style>

</style>
