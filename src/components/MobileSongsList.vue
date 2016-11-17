<template>
  <div class="mobile-songs">
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
  </div>
</template>

<style></style>

<script>
  import MobileSongListItem from './MobileSongListItem.vue';
  import Spinner from './Spinner.vue';

  export default {
    components: {
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
