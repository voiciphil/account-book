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
            <v-text
              class="headline"
            >로그인</v-text>
          </v-row>
          <v-row class="ml-3 mr-10 mt-7">
            <v-text-field
              color="indigo darken-3"
              label="아이디"
              prepend-icon="mdi-account"
              outlined
            ></v-text-field>
          </v-row>
          <v-row class="ml-3 mr-10">
            <v-text-field
              color="indigo darken-3"
              label="비밀번호"
              type="password"
              prepend-icon="mdi-lock"
              outlined
            ></v-text-field>
          </v-row>
          <v-row
            class="mx-10"
            justify="center"
          >
            <v-btn
              color="indigo darken-3"
              dark
              rounded
              large
            >로그인</v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {

};
</script>

<style>

</style>
