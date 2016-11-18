<template>
  <MobileInfiniteScroll class="mobile-songs" :callFunc="fetchSongs">
    <MobileSongListItem
      v-for="(songId, i) in normalized"
      :index="i"
      :playingSongId="playingSongId"
      :playSong="playSong"
      :song="songEntities[songId]"
      :user="userEntities[songEntities[songId].user_id]"
      :key="`${songId}-${i}`"
    >
    </MobileSongListItem>

    <Spinner v-if="isFetching"></Spinner>
  </MobileInfiniteScroll>
</template>

<style></style>

<script>
  import MobileInfiniteScroll from './MobileInfiniteScroll.vue';
  import MobileSongListItem from './MobileSongListItem.vue';
  import Spinner from './Spinner.vue';

  export default {
    components: {
      MobileInfiniteScroll,
      MobileSongListItem,
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
    props: {
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
      userEntities: {
        type: Object,
        required: true,
      },
    },
  };
</script>
