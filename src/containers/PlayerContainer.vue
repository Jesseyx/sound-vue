<template>
  <Player
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
  </Player>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';
  import Player from '../components/Player.vue';

  export default {
    components: {
      Player,
    },
    computed: {
      ...mapGetters(['currentTime', 'isPlaying', 'playingSongId', 'playlists', 'songEntities', 'userEntities', 'currentSongIndex', 'selectedPlaylists']),
      song() {
        const { songEntities, playingSongId } = this;
        return songEntities[playingSongId];
      },
      user() {
        const { userEntities, song } = this;
        return userEntities[song.user_id];
      },
    },
  };
</script>
