<template>
  <div
    class="sidebar-content"
    :style="{ maxHeight: `${height}px` }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot></slot>
  </div>
</template>

<style></style>

<script>
  export default {
    methods: {
      handleMouseEnter() {
        console.log('handleMouseEnter');
      },
      handleMouseLeave() {
        console.log('handleMouseLeave');
      },
    },
    props: ['height'],
  };
</script>
