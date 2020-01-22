<template>
  <div>
    <SignIn/>
  </div>
</template>

<script>
import SignIn from '../components/signin/SignIn.vue';

import bus from '../bus';

export default {
  components: {
    SignIn,
  },
  created() {
    bus.$emit('logout', false);
  },
};
</script>

<style>

</style>
