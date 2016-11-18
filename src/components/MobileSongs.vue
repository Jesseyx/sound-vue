<template>
  <MobileInfiniteScroll class="mobile-songs" :callFunc="fetchSongs">
    <MobileSongCard
      v-for="(songId, i) in normalized"
      :index="i"
      :playingSongId="playingSongId"
      :playSong="playSong"
      :song="songEntities[songId]"
      :user="userEntities[songEntities[songId].user_id]"
      :key="`${songId}-${i}`"
    >
    </MobileSongCard>

    <Spinner v-if="isFetching"></Spinner>
  </MobileInfiniteScroll>
</template>

<style></style>

<script>
  import MobileInfiniteScroll from './MobileInfiniteScroll.vue';
  import MobileSongCard from './MobileSongCard.vue';
  import Spinner from './Spinner.vue';

  export default {
    components: {
      MobileInfiniteScroll,
      MobileSongCard,
      Spinner,
    },
    computed: {
      isFetching() {
        return this.playlistData.isFetching;
      },
      normalized() {
        const { playlistData } = this;
        return playlistData.items ? playlistData.items : [];
      },
    },
    methods: {
      playSong(index) {
        const { playlist } = this;

        this.$store.dispatch('playSong', {
          playlist,
          index,
        });
      },
      fetchSongs() {
        const { playlist } = this;
        this.$store.dispatch('fetchSongsIfNeeded', playlist);
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
