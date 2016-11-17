<template>
  <div :class="className" :style="styleObj">
    <component :is="top"></component>
    <router-view></router-view>
    <component :is="bottom"></component>
  </div>
</template>

<style lang="sass">
</style>

<script>
  import { mapGetters } from 'vuex';

  import NavContainer from './NavContainer.vue';
  import PlayerContainer from './PlayerContainer.vue';

  export default {
    data() {
      return {
        top: 'NavContainer',
        bottom: 'PlayerContainer',
      };
    },
    components: {
      NavContainer,
      PlayerContainer,
    },
    computed: {
      ...mapGetters(['eHeight', 'isMobile', 'eWidth']),
      className() {
        const { isMobile } = this;
        return isMobile ? 'mobile' : null;
      },
      styleObj() {
        const { isMobile, eHeight, eWidth } = this;
        return isMobile ? { height: `${eHeight}px`, width: `${eWidth}px` } : null;
      },
    },
    watch: {
      isMobile(newIsMobile) {
        if (newIsMobile) {
          this.top = 'PlayerContainer';
          this.bottom = 'NavContainer';
        }
      },
    },
    mounted() {
      this.$store.dispatch('initEnvironment');
      this.$store.dispatch('initAuth');
    },
  };
</script>
