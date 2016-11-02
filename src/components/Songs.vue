<template>
  <div class="songs" :class="{ sticky: sticky }" v-sticky="handleSticky" sticky-critical="50">
    <toolbar
      :playlist="playlist"
      :time="time"
    >
    </toolbar>

    <div class="container">
      <song-cards
        :authedLikes="authedLikes"
        :authedUser="authedUser"
        :eHeight="eHeight"
        :playingSongId="playingSongId"
        :playlist="playlist"
        :playlistData="playlistData"
        :songEntities="songEntities"
        :userEntities="userEntities"
      >
      </song-cards>
    </div>
  </div>
</template>

<style></style>

<script>
  import Toolbar from '../components/Toolbar.vue';
  import SongCards from '../components/SongCards.vue';

  import Sticky from '../directives/Sticky';

  export default {
    data() {
      return {
        sticky: false,
      };
    },
    components: {
      Toolbar,
      SongCards,
    },
    directives: {
      Sticky,
    },
    methods: {
      handleSticky(sticky) {
        if (sticky && !this.sticky) {
          this.sticky = sticky;
        } else if (!sticky && this.sticky) {
          this.sticky = sticky;
        }
      },
    },
    watch: {
      playlist(nextPlaylist) {
        const { playlistData } = this;
        if (!playlistData.items || playlistData.items.length === 0) {
          this.$store.dispatch('fetchSongsIfNeeded', nextPlaylist);
        }
      },
    },
    beforeMount() {
      const { playlist, playlistData } = this;
      if (!playlistData.items || playlistData.items.length === 0) {
        this.$store.dispatch('fetchSongsIfNeeded', playlist);
      }
    },
    props: ['authedLikes', 'authedUser', 'eHeight', 'playingSongId', 'playlist', 'playlistData', 'songEntities', 'time','userEntities'],
  };
</script>
