<template>
  <component
    :is="currentView"
    v-if="playingSongId"
    :currentTime="currentTime"
    :isPlaying="isPlaying"
    :playingSongId="playingSongId"
    :playlists="playlists"
    :song="song"
    :user="user"
    :currentSongIndex="currentSongIndex"
    :selectedPlaylists="selectedPlaylists"
    :songEntities="songEntities"
  >
  </component>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  import Player from '../components/Player.vue';
  import MobilePlayer from '../components/MobilePlayer.vue';

  export default {
    data() {
      return {
        currentView: Player,
      };
    },
    components: {
      Player,
      MobilePlayer,
    },
    computed: {
      ...mapGetters(['currentTime', 'isPlaying', 'playingSongId', 'playlists', 'songEntities', 'userEntities', 'currentSongIndex', 'selectedPlaylists', 'isMobile']),
      song() {
        const { songEntities, playingSongId } = this;
        return songEntities[playingSongId];
      },
      user() {
        const { userEntities, song } = this;
        return userEntities[song.user_id];
      },
    },
    watch: {
      isMobile(newIsMobile) {
        if (newIsMobile) {
          this.currentView = 'MobilePlayer';
        }
      },
    },
  };
</script>
