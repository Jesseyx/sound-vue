<template>
  <div class="card song-card" :class="{ active: isActive }">
    <div class="song-card-image" :style="songImgStyle">
      <toggle-play-button-container v-if="isActive"></toggle-play-button-container>
      <div class="toggle-play-button" v-else @click="playSong">
        <i class="toggle-play-button-icon ion-ios-play"></i>
      </div>
    </div>

    <div class="song-card-user clearfix">
      <img class="song-card-user-image" :src="userAvatar" alt="User avatar">
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
          :className="'song-card-heart'"
          :authedUser="authedUser"
          :isLiked="isLiked"
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
    props: ['songId', 'song', 'user', 'authedUser', 'authedLikes', 'isActive', 'songIndex', 'playlist'],
  };
</script>
