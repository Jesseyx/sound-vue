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
    props: ['authedLikes', 'authedUser', 'currentTime', 'playingSongId', 'playlist', 'playlists', 'songEntities', 'userEntities', 'playSong'],
  };
</script>
