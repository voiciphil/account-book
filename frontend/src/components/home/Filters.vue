<template>
  <div>
    <v-row
      justify="space-around"
      class="mt-5"
    >
      <v-col
        cols="3"
      >
        <v-menu
          v-model="menu"
          v-bind:close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="300px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="month"
              prepend-inner-icon="mdi-calendar"
              readonly
              outlined
              dense
              v-on="on"
              color="light-green lighten-1"
            />
          </template>
          <v-date-picker
            v-model="month"
            v-on:input="filtrate"
            type="month"
            color="light-green lighten-1"
            locale="ko-kr"
          />
        </v-menu>
      </v-col>
      <v-col
        cols="3"
      >
        <v-row>
          <v-select
            v-bind:items="categories"
            v-model="category"
            v-on:input="filtrate"
            label="카테고리"
            color="light-green lighten-1"
            outlined
            dense
          />
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import bus from '../../bus';

export default {
  data() {
    return {
      month: new Date().toISOString().substr(0, 7),
      category: '전체',
      menu: false,
      categories: [],
    };
  },
  created() {
    this.getCategories();
    this.filtrate();
    bus.$on('updateCategory', () => {
      this.getCategories();
    });
  },
  methods: {
    async getCategories() {
      const res = await this.$axios.post('/api/transactions/category', {
        token: localStorage.token,
      });

      this.categories = [];
      res.data.data.forEach((i) => {
        this.categories.push(i.category);
      });
      this.categories.sort();
      this.categories.unshift('전체');
    },
    filtrate() {
      this.menu = false;
      bus.$emit('filtrate', this.month, this.category);
    },
  },
};
</script>

<style>

</style>
