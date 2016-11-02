<template>
  <div class="card song-card" :class="{ active: isActive }">
    <div class="song-card-image" :style="style">
      <toggle-play-button-container v-if="isActive"></toggle-play-button-container>
      <div class="toggle-play-button" v-else @click="playSong">
        <i class="toggle-play-button-icon ion-ios-play"></i>
      </div>
    </div>

    <div class="song-card-user clearfix">
      <img class="song-card-user-image" :src="avatar" alt="User avatar">
      <div class="song-card-details">
        <router-link
          class="song-card-title"
          :title="song.title"
          :to="{ name: 'songDetail', params: { id: songId } }"
        >
          {{ title }}
        </router-link>

        <router-link
          class="song-card-user-username"
          :title="user.username"
          :to="{ name: 'userDetail', params: { id: user.id } }"
        >
          {{ user.username }}
        </router-link>

        <song-heart
          :authedUser="authedUser"
          :className="'song-card-heart'"
          :isLiked="isLiked"
          :songId="songId"
        >
        </song-heart>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
  import SongHeart from '../SongHeart.vue';
  import TogglePlayButtonContainer from '../../containers/TogglePlayButtonContainer.vue';;

  import { IMAGE_SIZES } from '../../constants/SongConstants';
  import { getImageUrl } from '../../utils/SongUtils';
  import { formatSongTitle } from '../../utils/FormatUtils';

  export default {
    components: {
      SongHeart,
      TogglePlayButtonContainer,
    },
    computed: {
      style() {
        const image = getImageUrl(this.song.artwork_url, IMAGE_SIZES.LARGE);

        return {
          backgroundImage: `url(${image})`,
        };
      },
      avatar() {
        return getImageUrl(this.user.avatar_url);
      },
      title() {
        return formatSongTitle(this.song.title);
      },
      isLiked() {
        const { songId, authedLikes } = this;
        return Boolean(songId in authedLikes && authedLikes[songId] === 1);
      },
    },
    methods: {
      playSong() {
        const { songIndex, playlist } = this;
        this.$store.dispatch('playSong', {
          index: songIndex,
          playlist,
        });
      },
    },
    props: ['authedLikes', 'authedUser', 'isActive', 'playlist', 'song', 'songId', 'songIndex', 'user'],
  };
</script>
