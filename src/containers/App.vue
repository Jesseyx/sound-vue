<template>
  <div>
    <nav-container></nav-container>
    <router-view></router-view>
  </div>
</template>

<style lang="sass">
</style>

<script>
  import NavContainer from './NavContainer.vue';

  export default {
    components: {
      NavContainer,
    },
    mounted() {
      this.$store.dispatch('initAuth');
    },
  };
</script>
