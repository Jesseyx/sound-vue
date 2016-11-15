<template>
  <div class="switch" :class="{ on: isOn }" @click="toggleFunc">
    <div class="switch-button"></div>
  </div>
</template>

<style></style>

<script>
  export default {
    props: {
      isOn: {
        type: Boolean,
        required: true,
      },
      toggleFunc: {
        type: Function,
        required: true,
      },
    },
  };
</script>
