<template>
  <div class="me">
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
  import SongCards from '../components/SongCards.vue';

  export default {
    components: {
      SongCards,
    },
    props: ['authedLikes', 'authedUser', 'eHeight', 'playingSongId', 'playlist', 'playlistData', 'songEntities', 'userEntities'],
  };
</script>
