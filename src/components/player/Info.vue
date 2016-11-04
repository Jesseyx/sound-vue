<template>
  <div class="player-section player-info">
    <img class="player-image" alt="Song artwork" :src="artworkUrl">
    <div class="song-card-details">
      <router-link
        class="song-card-title"
        :title="song.title"
        :to="{ name: 'song', params: { id: song.id } }"
      >
        {{ formatTitle }}
      </router-link>

      <router-link
        class="song-card-user-username"
        :title="user.username"
        :to="{ name: 'user', params: { id: user.id } }"
      >
        {{ user.username }}
      </router-link>
    </div>
  </div>
</template>

<style></style>

<script>
  import { getImageUrl } from '../../utils/SongUtils';
  import { formatSongTitle } from '../../utils/FormatUtils';

  export default {
    computed: {
      artworkUrl() {
        return getImageUrl(this.song.artwork_url);
      },
      formatTitle() {
        return formatSongTitle(this.song.title);
      },
    },
    props: ['song', 'user'],
  };
</script>
