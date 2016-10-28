<template>
  <div class="card song-card">
    <div class="song-card-image" :style="songImgStyle">
      <div class="toggle-play-button">
        <i class="toggle-play-button-icon ion-ios-play"></i>
      </div>
    </div>

    <div class="song-card-user clearfix">
      <img class="song-card-user-image" :src="userAvatar" alt="User avatar">
      <div class="song-card-details">
        <router-link
          class="song-card-title"
          :title="song.title"
          :to="{ name: 'songs', params: { id: songId } }"
        >
          {{ title }}
        </router-link>

        <router-link
          class="song-card-user-username"
          :title="user.username"
          to="/"
        >
          {{ user.username }}
        </router-link>

        <song-heart
          :className="'song-card-heart'"
          :authedUser="authedUser"
        >
        </song-heart>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
  import SongHeart from '../SongHeart.vue';

  import { IMAGE_SIZES } from '../../constants/SongConstants';
  import { getImageUrl } from '../../utils/SongUtils';
  import { formatSongTitle } from '../../utils/FormatUtils';

  export default {
    components: {
      SongHeart,
    },
    computed: {
      songImgStyle() {
        const image = getImageUrl(this.song.artwork_url, IMAGE_SIZES.LARGE);
        return {
          backgroundImage: `url(${image})`,
        };
      },
      userAvatar() {
        return getImageUrl(this.user.avatar_url);
      },
      title() {
        return formatSongTitle(this.song.title);
      },
    },
    props: ['songId', 'song', 'user', 'authedUser'],
  };
</script>
