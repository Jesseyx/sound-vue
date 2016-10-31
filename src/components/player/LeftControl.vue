<template>
  <div class="player-section">
    <div class="player-button" @click="prevFunc">
      <i class="icon ion-ios-rewind"></i>
    </div>

    <div class="player-button" @click="togglePlay">
      <i class="icon" :class="playStyle"></i>
    </div>

    <div class="player-button" @click="nextFunc">
      <i class="icon ion-ios-fastforward"></i>
    </div>
  </div>
</template>

<style></style>

<script>
  export default {
    computed: {
      playStyle() {
        const { isPlaying } = this;
        return {
          'ion-ios-pause': isPlaying,
          'ion-ios-play': !isPlaying,
        };
      },
    },
    methods: {
      prevFunc() {
        this.changeSong('prev');
      },
      nextFunc() {
        this.changeSong('next');
      },
    },
    props: ['isPlaying', 'changeSong', 'togglePlay'],
  };
</script>
