<template>
  <StickyWrapper class="songs">
    <Toolbar
      :playlist="playlist"
      :time="time"
    >
    </Toolbar>

    <div class="container">
      <SongCards
        :authedLikes="authedLikes"
        :authedUser="authedUser"
        :eHeight="eHeight"
        :playingSongId="playingSongId"
        :playlist="playlist"
        :playlistData="playlistData"
        :songEntities="songEntities"
        :userEntities="userEntities"
      >
      </SongCards>
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
    props: {
      authedLikes: {
        type: Object,
        required: true,
      },
      authedUser: Object,
      eHeight: Number,
      playingSongId: Number,
      playlist: {
        type: String,
        required: true,
      },
      playlistData: {
        type: Object,
        required: true,
      },
      songEntities: {
        type: Object,
        required: true,
      },
      time: Number,
      userEntities: {
        type: Object,
        required: true,
      },
    },
  };
</script>
