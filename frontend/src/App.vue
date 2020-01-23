<template>
  <v-app
    id="main"
  >
    <v-app-bar
      app
      color="light-green lighten-1"
      dark
      elevation="3"
      height="55"
    >
      <v-toolbar-title
        class="headline"
      >
        가계부
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn
          v-if="show"
          v-on:click="logout"
          text
        >
          로그아웃
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import bus from './bus';

export default {
  name: 'App',
  data: () => ({
    show: false,
  }),
  created() {
    bus.$on('logout', (flag) => {
      this.show = flag;
    });
  },
  methods: {
    logout() {
      localStorage.token = null;
      this.show = false;
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
#main {
  background-color: #ffffff !important;
}
</style>
