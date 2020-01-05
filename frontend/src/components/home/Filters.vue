<template>
  <div>
    <v-row
      justify="space-around"
      class="mt-5"
    >
      <v-col
        cols="3"
      >
        <v-select
          v-bind:items="price"
          v-model="priceModel"
          color="indigo darken-3"
          outlined
          dense
        />
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
      price: ['전체', '수입', '지출'],
      priceModel: '전체',
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

      await res.data.data.forEach((item) => {
        this.categories.push(item.category);
      });
    },
  },
};
</script>

<style>

</style>
