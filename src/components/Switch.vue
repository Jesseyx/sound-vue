<template>
  <div class="switch" :class="{ on: isOn }" @click="toggleFunc">
    <div class="switch-button"></div>
  </div>
</template>

<style></style>

<script>
  export default {
    props: ['isOn', 'toggleFunc'],
  };
</script>
