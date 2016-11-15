<template>
  <div class="toggle-play-button active" :class="{ 'is-playing': isPlaying }" @click="togglePlay">
    <i class="toggle-play-button-icon ion-radio-waves"></i>
    <i class="toggle-play-button-icon ion-ios-play"></i>
  </div>
</template>

<style></style>

<script>
  export default {
    methods: {
      togglePlay() {
        const { isPlaying } = this;
        const audioElement = document.getElementById('audio');

        if (!audioElement) {
          return;
        }

        if (isPlaying) {
          audioElement.pause();
        } else {
          audioElement.play();
        }
      },
    },
    props: {
      isPlaying: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>
