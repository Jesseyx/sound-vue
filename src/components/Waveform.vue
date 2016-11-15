<template>
  <div class="waveform">
    <canvas class="waveform-canvas" ref="canvas"></canvas>

    <div
      class="waveform-image-container"
      @mousedown="handleMouseDown"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    >
      <img class="waveform-image" :src="waveformUrl.replace('http:', '')" alt="Song waveform" v-if="!waveformUrlIsJson">
      <div class="waveform-image-bg" :style="{ width: `${width}%` }"></div>
      <template v-if="!isActive">
        <div class="waveform-play-highlight"></div>
        <div class="waveform-play-highlight-icon" @click="playSong">
          <i class="icon ion-ios-play"></i>
        </div>
      </template>
      <template v-if="seekPercent">
        <div class="waveform-seek-line" :style="{ width: `${seekPercent * 100}%` }"></div>
        <div class="waveform-seek-bar" :style="{ width: `${seekPercent * 100}%` }"></div>
      </template>
    </div>
  </div>
</template>

<style></style>

<script>
  import { offsetLeft } from '../utils/MouseUtils';

  export default {
    data() {
      return {
        seekPercent: 0,
      };
    },
    computed: {
      width() {
        const { isActive, currentTime, duration } = this;

        return isActive ? (currentTime / (duration / 1000)) * 100 : 0;
      },
      waveformUrlIsJson() {
        return this.waveformUrl.indexOf('json') > -1;
      },
    },
    methods: {
      handleMouseDown() {
        const { isActive, duration } = this;
        if (!isActive) {
          return;
        }

        const { seekPercent } = this;
        const audioElement = document.getElementById('audio');
        if (!audioElement) {
          return;
        }

        const currentTime = Math.floor(seekPercent * (duration / 1000));
        audioElement.currentTime = currentTime;
        this.$store.dispatch('changeCurrentTime', currentTime);
      },
      handleMouseLeave() {
        this.seekPercent = 0;
      },
      handleMouseMove(e) {
        const { isActive } = this;
        if (!isActive) {
          return;
        }

        const seekPercent = (e.clientX - offsetLeft(e.currentTarget)) / e.currentTarget.offsetWidth;
        this.seekPercent = seekPercent;
      },
    },
    props: {
      currentTime: {
        type: Number,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      isActive: {
        type: Boolean,
        required: true,
      },
      waveformUrl: {
        type: String,
        required: true,
      },
      playSong: {
        type: Function,
        required: true,
      },
    },
  };
</script>
