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
};
</script>
