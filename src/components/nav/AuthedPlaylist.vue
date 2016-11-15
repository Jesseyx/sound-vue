<template>
  <router-link class="nav-playlist" :to="{ name: 'playlists', params: { id: playlistId } }">
    <div class="nav-playlist-title">
      {{ title }}
    </div>

    <div class="nav-playlist-images">
      <AuthedPlaylistImage
        v-for="songId in songIds"
        :song="songEntities[songId]"
        :key="songId"
      >
      </AuthedPlaylistImage>
    </div>
  </router-link>
</template>

<style></style>

<script>
  import AuthedPlaylistImage from './AuthedPlaylistImage.vue';

  export default {
    components: {
      AuthedPlaylistImage,
    },
    computed: {
      title() {
        const { playlist } = this;

        return `${playlist.title} (${playlist.track_count})`;
      },
      songIds() {
        return this.playlist.tracks.slice(0, 10);
      },
    },
    props: {
      playlistId: {
        type: Number,
        required: true,
      },
      playlist: {
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
