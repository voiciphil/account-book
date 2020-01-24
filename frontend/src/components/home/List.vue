<template>
  <div>
    <v-data-table
      v-bind:headers="header"
      v-bind:items="getFilteredTransactions()"
      v-bind:sort-by="['date', 'id']"
      v-bind:sort-desc="[true, true]"
      color="light-green lighten-1"
    >
      <template v-slot:top>
        <v-divider/>
        <v-toolbar
          flat
        >
          <v-container
            class="sign"
            fluid
          >
            <v-row
              justify="center"
            >
              <v-col>
                {{ '잔액: ' + total.toLocaleString() + '원' }}
              </v-col>
            </v-row>
          </v-container>
          <v-container
            class="sign"
            style="color: #33691e"
            fluid
          >
            <v-row
              max-width="50"
              justify="end"
            >
              <v-col>
                {{ '수입: ' + income.toLocaleString() + '원' }}
              </v-col>
            </v-row>
          </v-container>
          <v-container
            class="sign"
            style="color: #b71c1c"
            fluid
          >
            <v-row max-width="50">
              <v-col>
                {{ '지출: ' + ((-expenditure + 1) - 1).toLocaleString() + '원' }}
              </v-col>
            </v-row>
          </v-container>
          <v-spacer/>
          <v-dialog
            v-model="dialog"
            width="675"
          >
            <template v-slot:activator="{ on }">
              <v-toolbar-items>
                <v-btn
                  color="light-green lighten-1"
                  depressed
                  dark
                  v-on="on"
                >내역 추가</v-btn>
              </v-toolbar-items>
            </template>
            <v-card
              color="grey lighten-5"
              outlined
            >
              <v-row
                class="dialog"
                align="center"
              >
                <v-col>
                  <v-date-picker
                    v-model="picker"
                    color="light-green lighten-1"
                  />
                </v-col>
                <v-col class="mr-3">
                  <v-row
                    class="mb-4"
                  >
                    <v-text-field
                      v-model="category"
                      v-on:keyup.enter="addTransaction"
                      color="light-green lighten-1"
                      outlined
                      label="카테고리"
                    />
                  </v-row>
                  <v-row
                    class="my-4"
                  >
                    <v-text-field
                      v-model="breakdown"
                      v-on:keyup.enter="addTransaction"
                      color="light-green lighten-1"
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
                      color="light-green lighten-1"
                    />
                    <v-text-field
                      v-bind:label="mode ? '수입' : '지출'"
                      v-on:keyup.enter="addTransaction"
                      v-model="price"
                      type="number"
                      color="light-green lighten-1"
                      outlined
                    />
                  </v-row>
                  <v-row
                    class="mt-4"
                    justify="center"
                  >
                    <v-col>
                      <v-btn
                        v-on:click="dialog = false"
                        class="mr-2"
                        color="light-green lighten-1"
                        block
                        dark
                      >취소</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn
                        v-on:click="addTransaction"
                        color="light-green lighten-1"
                        block
                        dark
                      >확인</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="editDialog"
            width="675"
          >
            <v-card
              color="grey lighten-5"
              outlined
            >
              <v-row
                class="dialog"
                align="center"
              >
                <v-col>
                  <v-date-picker
                    v-model="editedItem.date"
                    color="light-green lighten-1"
                  />
                </v-col>
                <v-col
                  class="mr-3"
                >
                  <v-row
                    class="mb-4"
                  >
                    <v-text-field
                      v-model="editedItem.category"
                      v-on:keyup.enter="editTransaction"
                      color="light-green lighten-1"
                      outlined
                      label="카테고리"
                    />
                  </v-row>
                  <v-row
                    class="my-4"
                  >
                    <v-text-field
                      v-model="editedItem.breakdown"
                      v-on:keyup.enter="editTransaction"
                      color="light-green lighten-1"
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
                      color="light-green lighten-1"
                    />
                    <v-text-field
                      v-bind:label="mode ? '수입' : '지출'"
                      v-on:keyup.enter="editTransaction"
                      v-model="editedItem.price"
                      type="number"
                      color="light-green lighten-1"
                      outlined
                    />
                  </v-row>
                  <v-row
                    class="mt-4"
                    justify="end"
                  >
                    <v-col>
                      <v-btn
                        v-on:click="editDialog = mode = false"
                        class="mr-2"
                        color="light-green lighten-1"
                        block
                        dark
                      >취소</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn
                        v-on:click="editTransaction"
                        color="light-green lighten-1"
                        block
                        dark
                      >확인</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-divider/>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          v-on:click="editTransactionDialog(item)"
        >mdi-pencil</v-icon>
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
          text: '수정 / 삭제',
          align: 'center',
          sortable: false,
          value: 'action',
        },
      ],
      editedItem: {
        id: null,
        date: null,
        category: null,
        breakdown: null,
        price: null,
      },
      transactions: [],
      dialog: false,
      editDialog: false,
      picker: new Date().toISOString().substr(0, 10),
      mode: false,
      category: null,
      breakdown: null,
      price: null,
      total: 0,
      income: 0,
      expenditure: 0,
      month: new Date().toISOString().substr(0, 7),
      categoryFilter: '전체',
    };
  },
  async created() {
    await this.getTransactions();
    this.getIncome();
    this.getExpenditure();
    this.getTotal();

    bus.$on('filtrate', (month, category) => {
      this.month = month;
      this.categoryFilter = category;
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
      const res = await this.$axios.post('/api/transactions/all', {
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
    async addTransaction() {
      const res = await this.$axios.post('/api/transactions/add', {
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
        this.getIncome();
        this.getExpenditure();
        this.getTotal();
        bus.$emit('updateCategory');
      }
    },
    async deleteTransaction(item) {
      const res = await this.$axios.post('/api/transactions/delete', {
        id: item.id,
      });

      if (res.data.success) {
        this.transactions.splice(this.transactions.indexOf(item), 1);
        this.total -= item.price;
      }
    },
    async editTransaction() {
      this.editedItem.price = this.mode ? this.editedItem.price : -this.editedItem.price;
      const res = await this.$axios.post('/api/transactions/update', this.editedItem);

      if (res.data.success) {
        this.editDialog = false;
        this.transactions = [];
        this.mode = false;
        this.category = null;
        this.breakdown = null;
        this.price = null;
        this.income = 0;
        this.expenditure = 0;
        this.total = 0;
        await this.getTransactions();
        this.getIncome();
        this.getExpenditure();
        this.getTotal();
        bus.$emit('updateCategory');
      }
    },
    editTransactionDialog(item) {
      this.editedItem.id = item.id;
      this.editedItem.date = item.date;
      this.editedItem.category = item.category;
      this.editedItem.breakdown = item.breakdown;
      this.editedItem.price = item.price > 0 ? item.price : -item.price;
      this.mode = item.price > 0;
      this.editDialog = true;
    },
    getTotal() {
      this.transactions
        .filter(i => i.date.substr(0, 7) === this.month)
        .forEach((i) => {
          this.total += i.price;
        });
    },
    getIncome() {
      this.transactions
        .filter(i => i.date.substr(0, 7) === this.month)
        .filter(i => (this.categoryFilter === '전체' ? true : i.category === this.categoryFilter))
        .filter(i => i.price > 0)
        .forEach((i) => {
          this.income += i.price;
        });
    },
    getExpenditure() {
      this.transactions
        .filter(i => i.date.substr(0, 7) === this.month)
        .filter(i => (this.categoryFilter === '전체' ? true : i.category === this.categoryFilter))
        .filter(i => i.price < 0)
        .forEach((i) => {
          this.expenditure += i.price;
        });
    },
    getFilteredTransactions() {
      return this.transactions
        .filter(i => i.date.substr(0, 7) === this.month)
        .filter(i => (this.categoryFilter === '전체' ? true : i.category === this.categoryFilter));
    },
  },
};
</script>

<style scoped>
.dialog {
  margin-right: 1px !important;
  margin-left: 1px !important;
  background-color: #ffffff !important;
}
.sign {
  width: 200px;
  text-align: center;
  font-size: 18px;
}
</style>
