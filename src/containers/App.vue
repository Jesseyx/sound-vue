<template>
  <div>
    <NavContainer></NavContainer>
    <router-view></router-view>
    <PlayerContainer></PlayerContainer>
  </div>
</template>

<style lang="sass">
</style>

<script>
  import NavContainer from './NavContainer.vue';
  import PlayerContainer from './PlayerContainer.vue';

  export default {
    components: {
      NavContainer,
      PlayerContainer,
    },
    mounted() {
      this.$store.dispatch('initEnvironment');
      this.$store.dispatch('initAuth');
    },
  };
</script>
