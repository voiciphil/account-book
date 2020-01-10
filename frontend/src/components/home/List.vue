<template>
  <div>
    <v-data-table
      v-bind:headers="header"
      v-bind:items="transactions.filter(i => i.date.substr(0, 7) === month)"
      v-bind:sort-by="['date', 'id']"
      v-bind:sort-desc="[true, true]"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
        >
          <v-row no-gutters>
            <v-col
              class="mr-n12"
            >
              <v-toolbar-title>
                {{ '잔액: ' + total.toLocaleString() + '원' }}
              </v-toolbar-title>
            </v-col>
            <v-col
              class="mx-n12"
            >
              <v-toolbar-title>
                {{ '수입: ' + income.toLocaleString() + '원' }}
              </v-toolbar-title>
            </v-col>
            <v-col
              class="ml-n12"
            >
              <v-toolbar-title>
                {{ '지출: ' + ((-expenditure + 1) - 1).toLocaleString() + '원' }}
              </v-toolbar-title>
            </v-col>
          </v-row>
          <v-spacer/>
          <v-dialog
            v-model="dialog"
            width="675"
          >
            <template v-slot:activator="{ on }">
              <v-toolbar-items>
                <v-btn
                  color="indigo darken-4"
                  dark
                  v-on="on"
                >내역 추가</v-btn>
              </v-toolbar-items>
            </template>
            <v-card
              color="grey lighten-4"
            >
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
                  <v-row
                    class="mb-4"
                  >
                    <v-select
                      v-bind:items="categories"
                      v-model="category"
                      color="indigo darken-3"
                      outlined
                      label="카테고리"
                    />
                  </v-row>
                  <v-row
                    class="my-4"
                  >
                    <v-text-field
                      v-model="breakdown"
                      color="indigo darken-3"
                      outlined
                      label="내역"
                    />
                  </v-row>
                  <v-row
                    class="my-4"
                  >
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
                  <v-row
                    class="mt-4"
                    justify="end"
                  >
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
      <template v-slot:item.action="{ item }">
        <v-icon
          v-on:click="deleteTransaction(item)"
        >mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import bus from '../../bus';

export default {
  data() {
    return {
      header: [
        {
          text: '날짜',
          align: 'center',
          sortable: true,
          value: 'date',
        },
        {
          text: '카테고리',
          align: 'center',
          sortable: false,
          value: 'category',
        },
        {
          text: '내역',
          align: 'center',
          sortable: false,
          value: 'breakdown',
        },
        {
          text: '수입',
          align: 'center',
          sortable: false,
          value: 'income',
        },
        {
          text: '지출',
          align: 'center',
          sortable: false,
          value: 'expenditure',
        },
        {
          text: '삭제',
          align: 'center',
          sortable: false,
          value: 'action',
        },
      ],
      transactions: [],
      categories: [],
      dialog: false,
      picker: new Date().toISOString().substr(0, 10),
      mode: false,
      category: null,
      breakdown: null,
      price: null,
      total: 0,
      income: 0,
      expenditure: 0,
      month: new Date().toISOString().substr(0, 7),
    };
  },
  async created() {
    await this.getTransactions();
    await this.getCategories();
    this.getIncome();
    this.getExpenditure();
    this.getTotal();

    bus.$on('month', (month) => {
      this.month = month;
      this.total = 0;
      this.income = 0;
      this.expenditure = 0;
      this.getIncome();
      this.getExpenditure();
      this.getTotal();
    });
  },
  methods: {
    async getTransactions() {
      const res = await this.$axios.post('http://localhost:3000/api/transactions/all', {
        token: localStorage.token,
      });

      this.transactions = res.data.data;
      for (let i = 0; i < this.transactions.length; i += 1) {
        if (this.transactions[i].price > 0) {
          this.transactions[i].income = this.transactions[i].price.toLocaleString();
        } else if (this.transactions[i].price < 0) {
          this.transactions[i].expenditure = (-this.transactions[i].price).toLocaleString();
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
        this.mode = false;
        this.category = null;
        this.breakdown = null;
        this.price = null;
        this.income = 0;
        this.expenditure = 0;
        this.total = 0;
        await this.getTransactions();
        await this.getIncome();
        await this.getExpenditure();
        await this.getTotal();
      }
    },
    async deleteTransaction(item) {
      const res = await this.$axios.post('http://localhost:3000/api/transactions/delete', {
        id: item.id,
      });

      if (res.data.success) {
        this.transactions.splice(this.transactions.indexOf(item), 1);
        this.total -= item.price;
      }
    },
    getTotal() {
      this.total = this.income + this.expenditure;
    },
    getIncome() {
      this.transactions
        .filter(i => i.date.substr(0, 7) === this.month)
        .filter(i => i.price > 0)
        .forEach((i) => {
          this.income += i.price;
        });
    },
    getExpenditure() {
      this.transactions
        .filter(i => i.date.substr(0, 7) === this.month)
        .filter(i => i.price < 0)
        .forEach((i) => {
          this.expenditure += i.price;
        });
    },
  },
};
</script>

<style scoped>

</style>
