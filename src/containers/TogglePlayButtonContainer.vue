<template>
  <toggle-play-button :isPlaying="isPlaying"></toggle-play-button>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  import TogglePlayButton from '../components/TogglePlayButton.vue';

  export default {
    components: {
      TogglePlayButton,
    },
    computed: {
      ...mapGetters(['isPlaying']),
    },
  };
</script>
