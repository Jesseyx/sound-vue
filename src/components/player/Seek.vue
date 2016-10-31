<template>
  <div class="player-section player-seek">
    <div class="player-seek-bar-wrap" @click="seek">
      <div class="player-seek-bar" ref="seekBar">
        <div class="player-seek-duration-bar" :style="seekStyle" v-if="duration">
          <div class="player-seek-handle" @click.prevent.stop="" @mousedown="handleSeekMouseDown"></div>
        </div>
      </div>
    </div>

    <div class="player-time">
      <span>{{ formatCurrentTime }}</span>
      <span class="player-time-divider"></span>
      <span>{{ formatDuration }}</span>
    </div>
  </div>
</template>

<style></style>

<script>
  import { formatSeconds } from '../../utils/FormatUtils';

  export default {
    props: ['currentTime', 'duration', 'seek', 'handleSeekMouseDown'],
    computed: {
      formatCurrentTime() {
        return formatSeconds(this.currentTime);
      },
      formatDuration() {
        return formatSeconds(this.duration);
      },
      seekStyle() {
        const { currentTime, duration } = this;
        const width = (currentTime / duration) * 100;

        return {
          width: `${width}%`,
        };
      },
    },
  };
</script>
