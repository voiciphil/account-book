<template>
  <div>
    <Filter/>
    <List/>
  </div>
</template>

<script>
import Filter from '../components/home/Filter.vue';
import List from '../components/home/List.vue';

export default {
  name: 'Home',
  components: {
    Filter,
    List,
  },
};
</script>
