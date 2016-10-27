<template>
  <toolbar :playlist="playlist" :time="time"></toolbar>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  import Toolbar from '../components/Toolbar.vue';

  export default {
    components: {
      Toolbar,
    },
    computed: {
      ...mapGetters(['playlists']),
      time() {
        const query = this.$route.query;
        return query && query.t ? query.t : null;
      },
      playlist() {
        const query = this.$route.query;
        const playlist = query && query.q ? query.q : 'house';

        const time = query && query.t ? query.t : null;

        if (time) {
          return `${playlist} - ${time}`;
        }

        return playlist;
      },
    },
    watch: {
      playlist(nextPlaylist) {
        if (!(nextPlaylist in this.playlists) || this.playlists[nextPlaylist].items.length === 0) {
          this.$store.dispatch('fetchSongsIfNeeded', nextPlaylist);
        }
      },
    },
    beforeMount() {
      if (!this.playlist in this.playlists) {
        this.$store.dispatch('fetchSongsIfNeeded', this.playlist);
      }
    },
  };
</script>
