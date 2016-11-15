<template>
  <div class="card song-card" :class="{ active: isActive }">
    <div class="song-card-image" :style="style">
      <TogglePlayButtonContainer v-if="isActive"></TogglePlayButtonContainer>
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
          :to="{ name: 'song', params: { id: songId } }"
        >
          {{ title }}
        </router-link>

        <router-link
          class="song-card-user-username"
          :title="user.username"
          :to="{ name: 'user', params: { id: user.id } }"
        >
          {{ user.username }}
        </router-link>

        <SongHeart
          :authedUser="authedUser"
          :className="'song-card-heart'"
          :isLiked="isLiked"
          :songId="songId"
        >
        </SongHeart>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
  import { IMAGE_SIZES } from '../../constants/SongConstants';
  import { getImageUrl } from '../../utils/SongUtils';
  import { formatSongTitle } from '../../utils/FormatUtils';

  import SongHeart from '../SongHeart.vue';
  import TogglePlayButtonContainer from '../../containers/TogglePlayButtonContainer.vue';

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
    props: {
      authedLikes: {
        type: Object,
        required: true,
      },
      authedUser: Object,
      isActive: {
        type: Boolean,
        required: true,
      },
      playlist: {
        type: String,
        required: true,
      },
      song: {
        type: Object,
        required: true,
      },
      songId: {
        type: Number,
        required: true,
      },
      songIndex: {
        type: Number,
        required: true,
      },
      user: {
        type: Object,
        required: true,
      },
    },
  };
</script>
