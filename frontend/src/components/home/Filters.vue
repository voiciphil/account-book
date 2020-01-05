<template>
  <div>
    <v-row
      justify="center"
      class="mt-5"
    >
      <v-col
        cols="3"
      >
        <v-radio-group
          class="ml-12"
          v-model="radio"
          row
        >
          <v-radio
            label="전체"
            color="indigo darken-3"
            value="0"
          />
          <v-radio
            label="수입"
            color="indigo darken-3"
            value="1"
          />
          <v-radio
            label="지출"
            color="indigo darken-3"
            value="2"
          />
        </v-radio-group>
      </v-col>
      <v-col
        cols="3"
      >
        <v-menu
          v-model="menu"
          v-bind:close-on-content-click="false"
          v-bind:nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="300px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="mt-3"
              v-model="date"
              prepend-inner-icon="mdi-calendar"
              readonly
              outlined
              dense
              v-on="on"
              color="indigo darken-3"
            />
          </template>
          <v-date-picker
            v-model="date"
            v-on:input="menu = false"
            color="indigo darken-3"
          />
        </v-menu>
      </v-col>
      <v-col
        cols="3"
      >
        <v-select
          class="mt-3"
          v-bind:items="categories"
          label="카테고리"
          color="indigo darken-3"
          outlined
          dense
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      radio: '0',
      categories: [],
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      const res = await this.$axios.post('http://localhost:3000/api/categories/all', {
        token: localStorage.token,
      });
      // this.categories = [];
      await res.data.data.forEach((item) => {
        this.categories.push(item.category);
        console.log(item.category);
      });
      console.log(this.categories);
    },
  },
};
</script>

<style>

</style>
