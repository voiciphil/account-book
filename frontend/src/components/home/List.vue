<template>
  <div>
    <v-data-table
      v-bind:headers="header"
      v-bind:items="transactions"
      v-bind:sort-by="['date']"
      v-bind:sort-desc="[true]"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
        >
          <v-toolbar-title>내역</v-toolbar-title>
          <v-spacer/>
          <v-dialog
            v-model="dialog"
            width="675"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="indigo darken-4"
                dark
                flat
                v-on="on"
              >추가</v-btn>
            </template>
            <v-card>
              <v-row
                class="mx-3"
                align="center"
              >
                <v-col cols="6">
                  <v-date-picker
                    v-model="picker"
                    color="indigo darken-3"
                  />
                </v-col>
                <v-col class="mr-2">
                  <v-row>
                    <v-select
                      v-bind:items="categories"
                      v-model="category"
                      color="indigo darken-3"
                      outlined
                      label="카테고리"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="breakdown"
                      color="indigo darken-3"
                      outlined
                      label="내역"
                    />
                  </v-row>
                  <v-row>
                    <v-switch
                      v-model="mode"
                      inset
                      color="indigo darken-3"
                    />
                    <v-text-field
                      v-bind:label="mode ? '수입' : '지출'"
                      v-model="price"
                      type="number"
                      color="indigo darken-3"
                      outlined
                    />
                  </v-row>
                  <v-row justify="end">
                    <v-card-actions>
                      <v-btn
                        v-on:click="dialog = false"
                        class="mr-2"
                        color="indigo darken-3"
                        text
                      >취소</v-btn>
                      <v-btn
                        v-on:click="addTransaction"
                        color="indigo darken-3"
                        text
                      >확인</v-btn>
                    </v-card-actions>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          text: '날짜',
          align: 'left',
          sortable: true,
          value: 'date',
        },
        {
          text: '카테고리',
          value: 'category',
        },
        {
          text: '내역',
          value: 'breakdown',
        },
        {
          text: '수입',
          value: 'income',
        },
        {
          text: '지출',
          value: 'expenditure',
        },
      ],
      transactions: [],
      categories: [],
      dialog: false,
      picker: new Date().toISOString().substr(0, 10),
      mode: false,
      category: '',
      breakdown: '',
      price: 0,
    };
  },
  created() {
    this.getTransactions();
    this.getCategories();
  },
  methods: {
    async getTransactions() {
      const res = await this.$axios.post('http://localhost:3000/api/transactions/all', {
        token: localStorage.token,
      });

      this.transactions = res.data.data;
      for (let i = 0; i < this.transactions.length; i += 1) {
        if (this.transactions[i].price > 0) {
          this.transactions[i].income = this.transactions[i].price;
        } else if (this.transactions[i].price < 0) {
          this.transactions[i].expenditure = -this.transactions[i].price;
        }
      }
    },
    async getCategories() {
      const res = await this.$axios.post('http://localhost:3000/api/categories/all', {
        token: localStorage.token,
      });

      await res.data.data.forEach((item) => {
        this.categories.push(item.category);
      });
    },
    async addTransaction() {
      const res = await this.$axios.post('http://localhost:3000/api/transactions/add', {
        token: localStorage.token,
        date: this.picker,
        category: this.category,
        breakdown: this.breakdown,
        price: this.mode ? this.price : -this.price,
      });

      if (res.data.success) {
        this.dialog = false;
        this.transactions = [];
        await this.getTransactions();
      }
    },
  },
};
</script>

<style scoped>

</style>
