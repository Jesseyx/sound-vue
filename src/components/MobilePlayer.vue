<template>
  <MenuMotion :distance="100">
    <div class="mobile-player-container">
      <div class="mobile-player" :style="{ backgroundImage: `url(${artworkUrl})` }">
        <audio
          id="audio"
          ref="audio"
          :src="streamUrl"
          @ended="handleEnded"
          @loadedmetadata="handleLoadedMetadata"
          @loadstart="handleLoadStart"
          @pause="handlePause"
          @play="handlePlay"
          @timeupdate="handleTimeUpdate"
        >
        </audio>

        <div class="mobile-player-bg"></div>
        <div class="mobile-player-extras"></div>

        <div class="mobile-player-content fade-in">
          <div class="mobile-player-info">
            <div class="mobile-player-title">
              {{ songTitle }}
            </div>
            <div class="mobile-player-user">
              {{ user.username }}
            </div>
          </div>

          <div class="mobile-player-controls">
            <a class="mobile-player-button" href="#" @click.prevent="prevFunc">
              <i class="icon ion-ios-rewind"></i>
            </a>

            <a class="mobile-player-button" href="#" @click.prevent="togglePlay">
              <i :class="isPlaying ? 'ion-ios-pause' : 'ion-ios-play'"></i>
            </a>

            <a class="mobile-player-button" href="#" @click.prevent="nextFunc">
              <i class="ion-ios-fastforward"></i>
            </a>
          </div>
        </div>

        <div class="mobile-player-seek-bar">
          <div class="mobile-player-seek-duration-bar"></div>
        </div>
      </div>
    </div>
  </MenuMotion>
</template>

<style></style>

<script>
  import { getImageUrl } from '../utils/SongUtils';
  import { formatStreamUrl, formatSongTitle } from '../utils/FormatUtils';
  import { CHANGE_TYPES } from '../constants/SongConstants';

  import MenuMotion from './MenuMotion.vue';

  export default {
    data() {
      return {
        duration: 0,
        repeat: false,
        shuffle: false,
      };
    },
    components: {
      MenuMotion,
    },
    computed: {
      artworkUrl() {
        return getImageUrl(this.song.artwork_url);
      },
      streamUrl() {
        return formatStreamUrl(this.song.stream_url);
      },
      songTitle() {
        return formatSongTitle(this.song.title);
      },
    },
    methods: {
      handleEnded() {
        if (this.repeat) {
          this.$refs.audio.play();
        } else {
          this.changeSong('next');
        }
      },
      handleLoadedMetadata() {
        this.duration = Math.floor(this.$refs.audio.duration);
      },
      handleLoadStart() {
        this.$store.dispatch('changeCurrentTime', 0);
        this.duration = 0;
      },
      handlePause() {
        this.$store.dispatch('toggleIsPlaying', false);
      },
      handlePlay() {
        this.$store.dispatch('toggleIsPlaying', true);
      },
      handleTimeUpdate(e) {
        const audioElement = e.currentTarget;
        const currentTime = Math.floor(audioElement.currentTime);

        if (currentTime === this.currentTime) {
          return;
        }

        this.$store.dispatch('changeCurrentTime', currentTime);
      },
      changeSong(key) {
        let changeType;
        if (key === 'prev') {
          changeType = CHANGE_TYPES.PREV;
        } else if (key === 'next') {
          if (this.shuffle) {
            changeType = CHANGE_TYPES.SHUFFLE;
          } else {
            changeType = CHANGE_TYPES.NEXT;
          }
        } else {
          return;
        }

        this.$store.dispatch('changeSong', changeType);
      },
      prevFunc() {
        this.changeSong('prev');
      },
      nextFunc() {
        this.changeSong('next');
      },
      togglePlay() {
        const { isPlaying } = this;
        const audioElement = this.$refs.audio;

        if (isPlaying) {
          audioElement.pause();
        } else {
          audioElement.play();
        }
      },
    },
    mounted() {
      const audioElement = this.$refs.audio;
      audioElement.play();
    },
    watch: {
      playingSongId(val, oldVal) {
        if (oldVal !== val) {
          this.$nextTick(() => {
            this.$refs.audio.play();
          });
        }
      },
    },
    props: {
      currentTime: {
        type: Number,
        required: true,
      },
      isPlaying: {
        type: Boolean,
        required: true,
      },
      playingSongId: {
        type: Number,
        required: true,
      },
      playlists: {
        type: Object,
        required: true,
      },
      song: {
        type: Object,
        required: true,
      },
      user: {
        type: Object,
        required: true,
      },
      currentSongIndex: {
        type: Number,
        required: true,
      },
      selectedPlaylists: {
        type: Array,
        required: true,
      },
      songEntities: {
        type: Object,
        required: true,
      },
    },
  };
</script>
