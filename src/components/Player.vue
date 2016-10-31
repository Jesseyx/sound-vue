<template>
  <div class="player">
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
      @volumechange="handleVolumeChange"
    >
    </audio>
    <div class="container">
      <div class="player-main">

        <info :song="song" :user="user" ></info>

        <left-control
          :isPlaying="isPlaying"
          :changeSong="changeSong"
          :togglePlay="togglePlay"
        >
        </left-control>

        <seek
          :currentTime="currentTime"
          :duration="duration"
          :seek="seek"
          :handleSeekMouseDown="handleSeekMouseDown"
          ref="seekComponent"
        >
        </seek>

        <right-control
          :repeat="repeat"
          :toggleRepeat="toggleRepeat"
          :shuffle="shuffle"
          :toggleShuffle="toggleShuffle"
          :muted="muted"
          :toggleMute="toggleMute"
          :volume="volume"
          :changeVolume="changeVolume"
          :handleVolumeMouseDown="handleVolumeMouseDown"
          ref="rightControlComponent"
        >
        </right-control>

      </div>
    </div>
  </div>
</template>

<style></style>

<script>
  import { formatStreamUrl } from '../utils/FormatUtils';
  import { CHANGE_TYPES } from '../constants/SongConstants';
  import { offsetLeft } from '../utils/MouseUtils';
  import LocalStorageUtils from '../utils/LocalStorageUtils';

  import Info from './player/Info.vue';
  import LeftControl from './player/LeftControl.vue';
  import Seek from './player/Seek.vue';
  import RightControl from './player/RightControl.vue';

  export default {
    data() {
      const previousVolumeLevel = Number.parseFloat(LocalStorageUtils.get('volume'));
      return {
        activePlaylistIndex: null,
        duration: 0,
        isSeeking: false,
        muted: false,
        repeat: false,
        shuffle: false,
        volume: previousVolumeLevel || 1,
      };
    },
    components: {
      Info,
      LeftControl,
      Seek,
      RightControl,
    },
    computed: {
      streamUrl() {
        return formatStreamUrl(this.song.stream_url);
      },
      artworkUrl() {
        return getImageUrl(this.song.artwork_url);
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
      handleLoadedMetadata(e) {
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
        if (this.isSeeking) {
          return false;
        }

        const audioElement = e.currentTarget;
        const currentTime = Math.floor(audioElement.currentTime);

        if (currentTime === this.currentTime) {
          return false;
        }

        this.$store.dispatch('changeCurrentTime', currentTime);
      },
      handleVolumeChange(e) {
        if (this.isSeeking) {
          return false;
        }

        const volume = e.currentTarget.volume;
        this.volume = volume;
        LocalStorageUtils.set('volume', volume);
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
      togglePlay() {
        const { isPlaying } = this;
        const audioElement = this.$refs.audio;

        if (isPlaying) {
          audioElement.pause();
        } else {
          audioElement.play();
        }
      },
      seek(e) {
        const percent = (e.clientX - offsetLeft(e.currentTarget)) / e.currentTarget.offsetWidth;
        const currentTime = Math.floor(percent * this.duration);

        this.$store.dispatch('changeCurrentTime', currentTime);
        this.$refs.audio.currentTime = currentTime;
      },
      bindSeekMouseEvents() {
        document.addEventListener('mousemove', this.handleSeekMouseMove);
        document.addEventListener('mouseup', this.handleSeekMouseUp);
      },
      unbindSeekMouseEvents() {
        document.removeEventListener('mousemove', this.handleSeekMouseMove);
        document.removeEventListener('mouseup', this.handleSeekMouseUp);
      },
      handleSeekMouseDown() {
        this.bindSeekMouseEvents();
        this.isSeeking = true;
      },
      handleSeekMouseMove(e) {
        const { seekBar } = this.$refs.seekComponent.$refs;
        const diff = e.clientX - offsetLeft(seekBar);
        const pos = diff < 0 ? 0 : diff;
        let percent = pos / seekBar.offsetWidth;
        percent = percent > 1 ? 1 : percent;

        this.$store.dispatch('changeCurrentTime', Math.floor(percent * this.duration));
      },
      handleSeekMouseUp(e) {
        if (!this.isSeeking) {
          return;
        }

        this.unbindSeekMouseEvents();

        this.isSeeking = false;
        this.$refs.audio.currentTime = this.currentTime;
      },
      toggleRepeat() {
        this.repeat = !this.repeat;
      },
      toggleShuffle() {
        this.shuffle = !this.shuffle;
      },
      toggleMute() {
        const audioElement = this.$refs.audio;

        if (this.muted) {
          audioElement.muted = false;
        } else {
          audioElement.muted = true;
        }

        this.muted = !this.muted;
      },
      changeVolume(e) {
        const volume = (e.clientX - offsetLeft(e.currentTarget)) / e.currentTarget.offsetWidth;
        this.$refs.audio.volume = volume;
      },
      bindVolumeMouseEvents() {
        document.addEventListener('mousemove', this.handleVolumeMouseMove);
        document.addEventListener('mouseup', this.handleVolumeMouseUp);
      },
      unbindVolumeMouseEvents() {
        document.removeEventListener('mousemove', this.handleVolumeMouseMove);
        document.removeEventListener('mouseup', this.handleVolumeMouseUp);
      },
      handleVolumeMouseDown() {
        this.bindVolumeMouseEvents();
        this.isSeeking = true;
      },
      handleVolumeMouseMove(e) {
        const { volumeBar } = this.$refs.rightControlComponent.$refs;
        const diff = e.clientX - offsetLeft(volumeBar);
        const pos = diff < 0 ? 0 : diff;
        let percent = pos / volumeBar.offsetWidth;
        percent = percent > 1 ? 1 : percent;

        this.volume = percent;
        this.$refs.audio.volume = percent;
      },
      handleVolumeMouseUp() {
        if (!this.isSeeking) {
          return;
        }

        this.unbindVolumeMouseEvents();
        this.isSeeking = false;

        LocalStorageUtils.set('volume', this.volume);
      },
      handleKeyDown(e) {
        const keyCode = e.keyCode || e.which;
        const isInsideInput = e.target.tagName.toLowerCase().match(/input|textarea/);
        if (isInsideInput) {
          return;
        }

        if (keyCode === 32) {
          // space btn
          e.preventDefault();
          this.togglePlay();
        } else if (keyCode === 37 || keyCode === 74) {
          // <- or J
          e.preventDefault();
          this.changeSong('prev');
        } else if (keyCode === 39 || keyCode === 75) {
          // -> or K
          e.preventDefault();
          this.changeSong('next');
        }
      },
    },
    props: ['currentTime', 'isPlaying', 'playingSongId', 'playlists', 'song', 'user'],
    mounted() {
      document.addEventListener('keydown', this.handleKeyDown, false);

      const audioElement = this.$refs.audio;

      audioElement.volume = this.volume;
      audioElement.play();
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.handleKeyDown, false);
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
  };
</script>
