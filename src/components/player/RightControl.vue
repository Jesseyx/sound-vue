<template>
  <div class="player-section">

    <div class="player-button" :class="{ active: repeat }" @click="toggleRepeat">
      <i class="icon ion-loop"></i>
    </div>

    <div class="player-button" :class="{ active: shuffle }" @click="toggleShuffle">
      <i class="icon ion-shuffle"></i>
    </div>

    <Popover class="player-button top-right">
      <i class="icon ion-android-list" slot="content"></i>
      <Playlist
        :currentSongIndex="currentSongIndex"
        :selectedPlaylists="selectedPlaylists"
        :playlists="playlists"
        :songEntities="songEntities"
        slot="bomb"
      >
      </Playlist>
    </Popover>

    <div class="player-button player-volume-button" @click="toggleMute">
      <i class="icon ion-android-volume-off" v-if="muted"></i>

      <template v-else>
        <i class="icon ion-android-volume-mute" v-if="volume === 0"></i>
        <div class="player-volume-button-wrap" v-if="volume === 1">
          <i class="icon ion-android-volume-up"></i>
          <i class="icon ion-android-volume-mute"></i>
        </div>

        <div class="player-volume-button-wrap" v-if="volume !== 0 && volume !== 1">
          <i class="icon ion-android-volume-down"></i>
          <i class="icon ion-android-volume-mute"></i>
        </div>
      </template>
    </div>

    <div class="player-volume">
      <div class="player-seek-bar-wrap" @click="changeVolume">
        <div class="player-seek-bar" ref="volumeBar">
          <div class="player-seek-duration-bar" :style="volumeStyle">
            <div class="player-seek-handle" @click.prevent.stop="" @mousedown="handleVolumeMouseDown"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style></style>

<script>
  import Popover from '../Popover.vue';
  import Playlist from '../Playlist.vue';

  export default {
    components: {
      Popover,
      Playlist,
    },
    computed: {
      volumeStyle() {
        const { muted, volume } = this;
        const width = muted ? 0 : volume * 100;
        return {
          width: `${width}%`,
        };
      },
    },
    props: {
      repeat: {
        type: Boolean,
        required: true,
      },
      toggleRepeat: {
        type: Function,
        required: true,
      },
      shuffle: {
        type: Boolean,
        required: true,
      },
      toggleShuffle: {
        type: Function,
        required: true,
      },
      muted: {
        type: Boolean,
        required: true,
      },
      toggleMute: {
        type: Function,
        required: true,
      },
      volume: {
        type: Number,
        required: true,
      },
      changeVolume: {
        type: Function,
        required: true,
      },
      handleVolumeMouseDown: {
        type: Function,
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
      playlists: {
        type: Object,
        required: true,
      },
      songEntities: {
        type: Object,
        required: true,
      },
    },
  };
</script>
