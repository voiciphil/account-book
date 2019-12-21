<template>
  <v-app>
    <v-app-bar
      app
      color="indigo darken-3"
      dark
    >
      <v-toolbar-title
        class="headline"
      >
        가계부
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
