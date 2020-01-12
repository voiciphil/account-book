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
              color="indigo darken-3"
            />
          </template>
          <v-date-picker
            v-model="month"
            v-on:input="setMonth"
            type="month"
            color="indigo darken-3"
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
            label="카테고리"
            color="indigo darken-3"
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
      menu: false,
      categories: [],
    };
  },
  created() {
    this.getCategories();
    this.setMonth();
  },
  methods: {
    async getCategories() {
      const res = await this.$axios.post('http://localhost:3000/api/transactions/category', {
        token: localStorage.token,
      });

      res.data.data.forEach((i) => {
        this.categories.push(i.category);
      });
    },
    setMonth() {
      this.menu = false;
      bus.$emit('month', this.month);
    },
  },
};
</script>

<style>

</style>
