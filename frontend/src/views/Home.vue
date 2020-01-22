<template>
  <div>
    <Filters/>
    <List/>
  </div>
</template>

<script>
import Filters from '../components/home/Filters.vue';
import List from '../components/home/List.vue';

import bus from '../bus';

export default {
  components: {
    Filters,
    List,
  },
  created() {
    bus.$emit('logout', true);
  },
};
</script>
