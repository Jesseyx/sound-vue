<template>
  <div class="player-section">

    <div class="player-button" :class="{ active: repeat }" @click="toggleRepeat">
      <i class="icon ion-loop"></i>
    </div>

    <div class="player-button" :class="{ active: shuffle }" @click="toggleShuffle">
      <i class="icon ion-shuffle"></i>
    </div>

    <popover class="player-button top-right">
      <i class="icon ion-android-list" slot="content"></i>
      <playlist
        :currentSongIndex="currentSongIndex"
        :selectedPlaylists="selectedPlaylists"
        :playlists="playlists"
        :songEntities="songEntities"
        slot="bomb"
      >
      </playlist>
    </popover>

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
    props: ['repeat', 'toggleRepeat', 'shuffle', 'toggleShuffle', 'muted', 'toggleMute', 'volume', 'changeVolume', 'handleVolumeMouseDown', 'currentSongIndex', 'selectedPlaylists', 'playlists', 'songEntities'],
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
  };
</script>
