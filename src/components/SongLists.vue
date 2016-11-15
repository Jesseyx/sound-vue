<template>
  <div class="tab-content" v-if="relatedSongItems">
    <SongListItem
      :authedLikes="authedLikes"
      :authedUser="authedUser"
      :currentTime="currentTime"
      :isActive="playingSongId === relatedSongId"
      :songId="relatedSongId"
      :songEntities="songEntities"
      :userEntities="userEntities"
      :playSong="playSong"
      :index="i + 1"
      v-for="(relatedSongId, i) in relatedSongItems"
      :key="relatedSongId"
    >
    </SongListItem>
  </div>
</template>

<style></style>

<script>
  import SongListItem from './SongListItem.vue';

  export default {
    components: {
      SongListItem,
    },
    computed: {
      relatedSongItems() {
        const { playlist, playlists } = this;
        const relatedSongs = playlist in playlists ? playlists[playlist] : {};

        return (relatedSongs.items && relatedSongs.items.slice(1)) || null;
      },
    },
    props: {
      authedLikes: {
        type: Object,
        required: true,
      },
      authedUser: Object,
      currentTime: {
        type: Number,
        required: true,
      },
      playingSongId: Number,
      playlist: {
        type: String,
        required: true,
      },
      playlists: {
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
      playSong: {
        type: Function,
        required: true,
      },
    },
  };
</script>
