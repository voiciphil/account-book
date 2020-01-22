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
              v-bind:rules="[rules.duplicated, rules.required]"
              v-bind:error="errors.id"
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
              v-bind:rules="[rules.required]"
              v-bind:error="errors.pw"
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
              v-bind:rules="[rules.required, rules.different]"
              v-bind:error="errors.repw"
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
      rules: {
        required: value => !!value || '입력해 주세요.',
        different: value => value === this.pw || '비밀번호가 일치하지 않습니다.',
        duplicated: () => !this.errors.duplicated || '아이디가 중복되었습니다.',
      },
      errors: {
        id: false,
        pw: false,
        repw: false,
        duplicated: false,
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
            this.$router.push('/signed-up');
          } else {
            this.errors.duplicated = true;
            this.errors.id = true;
            this.id = '';
          }
        }
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
