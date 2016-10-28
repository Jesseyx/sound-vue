<template>
  <div class="songs">
    <toolbar :playlist="playlist" :time="time"></toolbar>

    <div class="container">
      <song-cards
        :playlist="playlist"
        :playlists="playlists"
        :songEntities="songEntities"
        :userEntities="userEntities"
        :authedUser="authedUser"
        :playingSongId="playingSongId"
        :authedLikes="authedLikes"
      >
      </song-cards>
    </div>
  </div>
</template>

<style></style>

<script>
  import Toolbar from '../components/Toolbar.vue';
  import SongCards from '../components/SongCards.vue';

  export default {
    components: {
      Toolbar,
      SongCards,
    },
    watch: {
      playlist(nextPlaylist) {
        if (!(nextPlaylist in this.playlists) || this.playlists[nextPlaylist].items.length === 0) {
          this.$store.dispatch('fetchSongsIfNeeded', nextPlaylist);
        }
      },
    },
    beforeMount() {
      const { playlist, playlists } = this;
      if (!(playlist in playlists)) {
        this.$store.dispatch('fetchSongsIfNeeded', playlist);
      }
    },
    props: ['playlists', 'songEntities', 'userEntities', 'authedUser', 'authedLikes', 'time', 'playlist', 'playingSongId'],
  };
</script>
