<template>
  <div class="song-list-item" :class="{ active: isActive }">
    <div class="song-list-item-image" :style="{ backgroundImage: `url(${imgUrl}` }">
      <TogglePlayButtonContainer v-if="isActive"></TogglePlayButtonContainer>
      <div class="toggle-play-button" v-else @click="playThisSong">
        <i class="toggle-play-button-icon ion-ios-play"></i>
      </div>
    </div>

    <div class="song-list-item-info">
      <router-link class="song-list-item-title" :to="{ name: 'song', params: { id: song.id } }">
        {{ song.title }}
      </router-link>

      <div class="song-list-item-info-extra">
        <div class="song-list-item__user">
          <div class="song-list-item-user-image" :style="{ backgroundImage: `url(${avatarUrl}` }"></div>

          <router-link class="song-list-item-username" :to="{ name: 'user', params: { id: user.id } }">
            {{ user.username }}
          </router-link>
        </div>

        <div class="song-list-item-stats">
          <SongHeartCount
            :authedUser="authedUser"
            :authedLikes="authedLikes"
            :count="song.favoritings_count"
            :songId="songId"
          >
          </SongHeartCount>

          <div class="song-list-item-stat">
            <i class="icon ion-play"></i>
            <span>{{ song.playback_count | addCommas }}</span>
          </div>

          <div class="song-list-item-stat">
            <i class="icon ion-chatbubble"></i>
            <span>{{ song.comment_count | addCommas }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="song-list-item-waveform">
      <Waveform
        :currentTime="currentTime"
        :duration="song.duration"
        :isActive="isActive"
        :waveformUrl="waveformUrl"
        :playSong="playThisSong"
      >
      </Waveform>
    </div>
  </div>
</template>

<style></style>

<script>
  import { getImageUrl } from '../utils/SongUtils';
  import { IMAGE_SIZES } from '../constants/SongConstants';
  import { addCommas } from '../utils/FormatUtils';

  import TogglePlayButtonContainer from '../containers/TogglePlayButtonContainer.vue';
  import SongHeartCount from './SongHeartCount.vue';
  import Waveform from './Waveform.vue';

  export default {
    components: {
      TogglePlayButtonContainer,
      SongHeartCount,
      Waveform,
    },
    computed: {
      song() {
        const { songId, songEntities } = this;
        return songEntities[songId];
      },
      user() {
        const { song, userEntities } = this;
        return userEntities[song.user_id];
      },
      imgUrl() {
        return getImageUrl(this.song.artwork_url, IMAGE_SIZES.LARGE);
      },
      avatarUrl() {
        return getImageUrl(this.user.avatar_url);
      },
      waveformUrl() {
        return this.song.waveform_url.replace('https', 'http');
      },
    },
    methods: {
      playThisSong() {
        this.playSong(this.index);
      },
    },
    filters: {
      addCommas,
    },
    props: ['authedLikes', 'authedUser', 'currentTime', 'isActive', 'songId', 'songEntities', 'userEntities', 'playSong', 'index'],
  };
</script>
