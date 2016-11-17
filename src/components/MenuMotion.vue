<template>
  <transition
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot></slot>
  </transition>
</template>

<style></style>

<script>
  import Velocity from 'velocity-animate';

  export default {
    methods: {
      beforeEnter(el) {
        el.style.height = 0;
      },
      enter(el, done) {
        Velocity(
          el,
          { height: `${this.distance}px` },
          { easing: [210, 20], complete: done },
        );
      },
      leave(el, done) {
        Velocity(
          el,
          { height: 0 },
          { easing: [210, 5], complete: done },
        );
      },
    },
    props: {
      distance: {
        type: Number,
        required: true,
      },
    },
  };
</script>
