<template>
  <div>
    <Filters/>
    <List/>
  </div>
</template>

<script>
import Filters from '../components/home/Filters.vue';
import List from '../components/home/List.vue';

export default {
  components: {
    Filters,
    List,
  },
};
</script>
