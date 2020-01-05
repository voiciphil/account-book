<template>
  <div>
    <v-data-table
      v-bind:headers="header"
      v-bind:items="transactions"
      v-bind:sort-by="['date']"
      v-bind:sort-desc="[true]"
    />
  </div>
</template>

<script>
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
          value: 'category',
        },
        {
          text: '내역',
          align: 'center',
          value: 'breakdown',
        },
        {
          text: '수입',
          align: 'center',
          value: 'income',
        },
        {
          text: '지출',
          align: 'center',
          value: 'expenditure',
        },
      ],
      transactions: [],
    };
  },
  created() {
    this.getTransactions();
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
  },
};
</script>

<style scoped>

</style>
