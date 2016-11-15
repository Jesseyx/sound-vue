<template>
  <div class="container">
    <Spinner v-if="!song"></Spinner>

    <div class="content" v-else>
      <div class="grid">
        <div class="col-7-10">
          <div class="song card" :class="{ active: isActive }">
            <div class="song-main">
              <div class="song-image" :style="{ backgroundImage: `url(${artworkUrl})` }">
                <TogglePlayButtonContainer v-if="isActive"></TogglePlayButtonContainer>
                <div class="toggle-play-button" v-else @click="playThisSong">
                  <i class="toggle-play-button-icon ion-ios-play"></i>
                </div>
              </div>

              <div class="song-info">
                <div class="song-title">
                  {{ song.title }}
                </div>

                <div class="song-user">
                  <div class="song-user-image" :style="{ backgroundImage: `url(${avatarUrl})` }"></div>
                  <router-link class="song-username" :to="{ name: 'user', params: { id: user.id } } ">
                    {{ user.username }}
                  </router-link>
                </div>

                <div class="song-stats">
                  <SongHeartCount
                    :authedUser="authedUser"
                    :authedLikes="authedLikes"
                    :count="song.likes_count ? song.likes_count : song.favoritings_count"
                    :songId="songId"
                  >
                  </SongHeartCount>

                  <div class="song-stat">
                    <i class="icon ion-play"></i>
                    <span>{{ song.playback_count | addCommas }}</span>
                  </div>

                  <div class="song-stat">
                    <i class="icon ion-chatbubble"></i>
                    <span>{{ song.comment_count | addCommas }}</span>
                  </div>
                </div>

                <div class="song-description">
                  {{ song.description }}
                </div>
              </div>

              <div class="song-waveform">
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
          </div>

          <SongLists
            :authedLikes="authedLikes"
            :authedUser="authedUser"
            :currentTime="currentTime"
            :playingSongId="playingSongId"
            :playlist="playlist"
            :playlists="playlists"
            :songEntities="songEntities"
            :userEntities="userEntities"
            :playSong="playSong"
          >
          </SongLists>
        </div>

        <div class="col-3-10">
          <Comments
            v-if="song && song.comments"
            :comments="song.comments"
            :currentTime="currentTime"
            :eHeight="eHeight"
            :isActive="isActive"
          >
          </Comments>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
  import { getImageUrl } from '../utils/SongUtils';
  import { IMAGE_SIZES } from '../constants/SongConstants';
  import { addCommas } from '../utils/FormatUtils';
  import { SONG_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

  import Spinner from './Spinner.vue';
  import TogglePlayButtonContainer from '../containers/TogglePlayButtonContainer.vue';
  import SongHeartCount from './SongHeartCount.vue';
  import Waveform from './Waveform.vue';
  import SongLists from './SongLists.vue';
  import Comments from './Comments.vue';

  export default {
    components: {
      Spinner,
      TogglePlayButtonContainer,
      SongHeartCount,
      Waveform,
      SongLists,
      Comments,
    },
    computed: {
      song() {
        const { songId, songEntities } = this;
        return songEntities[songId];
      },
      user() {
        const { song, userEntities } = this;
        return song.user_id in userEntities ? userEntities[song.user_id] : {};
      },
      isActive() {
        const { playingSongId, songId } = this;
        return Boolean(playingSongId && playingSongId === songId);
      },
      artworkUrl() {
        return getImageUrl(this.song.artwork_url, IMAGE_SIZES.LARGE);
      },
      avatarUrl() {
        return getImageUrl(this.user.avatar_url);
      },
      waveformUrl() {
        return this.song.waveform_url.replace('https', 'http');
      },
      playlist() {
        return this.song.title + SONG_PLAYLIST_SUFFIX;
      },
    },
    methods: {
      playSong(index) {
        const { playlist } = this;
        this.$store.dispatch('playSong', {
          playlist,
          index,
        });
      },
      playThisSong() {
        this.playSong(0);
      },
    },
    filters: {
      addCommas,
    },
    watch: {
      songId(newId) {
        this.$store.dispatch('fetchSongIfNeeded', newId);
      },
    },
    beforeMount() {
      const { songId } = this;
      this.$store.dispatch('fetchSongIfNeeded', songId);
    },
    props: {
      authedUser: Object,
      authedLikes: {
        type: Object,
        required: true,
      },
      currentTime: {
        type: Number,
        required: true,
      },
      eHeight: Number,
      playingSongId: Number,
      playlists: {
        type: Object,
        required: true,
      },
      songId: {
        type: Number,
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
