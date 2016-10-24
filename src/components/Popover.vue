<template>
  <div class="popover" :class="{ open: isOpen }" @click="toggleIsOpen" ref="node">
    <slot name="content"></slot>
    <slot name="bomb" v-if="isOpen"></slot>
  </div>
</template>

<style>
</style>

<script>
  export default {
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      toggleIsOpen() {
        this.isOpen = !this.isOpen;
      },
      onOutsideClick(e) {
        // must return false, otherwise it still continue
        if (!this.isOpen) return false;

        e.stopPropagation();
        const localNode = this.$refs.node;
        let source = e.target;

        while (source.parentNode) {
          if (source === localNode) {
            return false;
          }
          source = source.parentNode;
        }

        this.isOpen = false;
      },
    },
    mounted() {
      document.addEventListener('mousedown', this.onOutsideClick);
    },
    beforeDestroy() {
      document.removeEventListener('mousedown', this.onOutsideClick);
    },
  };
</script>
