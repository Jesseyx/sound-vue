<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<style></style>

<script>
  export default {
    methods: {
      onScroll() {
        const el = this.$refs.scroll;
        if (el.scrollTop >= (el.scrollHeight - el.offsetHeight - 200)) {
          this.callFunc();
        }
      },
    },
    mounted() {
      this.$refs.scroll.addEventListener('scroll', this.onScroll, false);
    },
    beforeDestroy() {
      this.$refs.scroll.removeEventListener('scroll', this.onScroll, false);
    },
    props: {
      callFunc: {
        type: Function,
        required: true,
      },
    },
  };
</script>
