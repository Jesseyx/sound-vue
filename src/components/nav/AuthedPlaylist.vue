<template>
  <router-link class="nav-playlist" :to="{ name: 'playlists', params: { id: playlistId } }">
    <div class="nav-playlist-title">
      {{ title }}
    </div>

    <div class="nav-playlist-images">
      <authed-playlist-image
        v-for="songId in songIds"
        :songId="songId"
      >
      </authed-playlist-image>
    </div>
  </router-link>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  import AuthedPlaylistImage from './AuthedPlaylistImage.vue';

  export default {
    components: {
      AuthedPlaylistImage,
    },
    computed: {
      ...mapGetters(['playlistEntities']),
      title() {
        const playlist = this.playlistEntities[this.playlistId];
        return `${playlist.title} (${playlist.track_count})`;
      },
      songIds() {
        return this.playlistEntities[this.playlistId].tracks.slice(0, 10);
      },
    },
    props: ['playlistId'],
  };
</script>
