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
        // must return false or a value, otherwise it still continue
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
      // check slots
      if (!this.$slots.content || !this.$slots.bomb) {
        throw new Error('Popover component requires exactly 2 children: content and bomb');
      }
      document.addEventListener('mousedown', this.onOutsideClick);
    },
    beforeDestroy() {
      document.removeEventListener('mousedown', this.onOutsideClick);
    },
  };
</script>
