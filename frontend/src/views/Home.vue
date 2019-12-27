<template>
  <div
    v-if="auth"
  >
    <List/>
  </div>
</template>

<script>
import List from '../components/home/List.vue';

export default {
  name: 'home',
  components: {
    List,
  },
  data() {
    return {
      auth: false,
    };
  },
  async beforeCreate() {
    const res = await this.$axios.post('http://localhost:3000/api/auth/verify', {
      token: this.$store.getters.getToken,
    });
    if (!res.data.verified) {
      this.$router.push('/noauth');
    } else {
      this.auth = res.data.verified;
    }
  },
};
</script>
