<template>
  <div :class="{ sticky: sticky }" v-sticky="handleSticky" sticky-critical="50">
    <slot></slot>
  </div>
</template>

<style></style>

<script>
  import Sticky from '../directives/Sticky';

  export default {
    data() {
      return {
        sticky: false,
      };
    },
    directives: {
      Sticky,
    },
    methods: {
      handleSticky(sticky) {
        if (sticky && !this.sticky) {
          this.sticky = sticky;
        } else if (!sticky && this.sticky) {
          this.sticky = sticky;
        }
      },
    },
  };
</script>
