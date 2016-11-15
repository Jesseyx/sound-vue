<template>
  <div class="me">
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
  </div>
</template>

<style></style>

<script>
  import SongCards from '../components/SongCards.vue';

  export default {
    components: {
      SongCards,
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
      userEntities: {
        type: Object,
        required: true,
      },
    },
  };
</script>
