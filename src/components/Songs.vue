<template>
  <StickyWrapper class="songs">
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
  </StickyWrapper>
</template>

<style></style>

<script>
  import StickyWrapper from './StickyWrapper.vue';
  import Toolbar from '../components/Toolbar.vue';
  import SongCards from '../components/SongCards.vue';

  export default {
    components: {
      StickyWrapper,
      Toolbar,
      SongCards,
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
    props: ['authedLikes', 'authedUser', 'eHeight', 'playingSongId', 'playlist', 'playlistData', 'songEntities', 'time', 'userEntities'],
  };
</script>
