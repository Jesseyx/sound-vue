<template>
  <div class="container">
    <Spinner v-if="!user || !{}.hasOwnProperty.call(user, 'description')"></Spinner>

    <div class="content" v-else>
      <div class="grid">
        <div class="col-7-10">
          <div class="user card">
            <div class="user-detail">
              <img class="user-image" :src="avatarUrl" alt="User avatar">
            </div>

            <div class="user-info">
              <a class="user-follow-button button red-white small" :class="{ active: isFollowing }" v-if="authedUser" @click="toggleFollow">
                {{ isFollowing ? 'following' : 'follow' }}
              </a>

              <div class="user-username">
                {{ user.username }}
              </div>
              
              <div class="user-location">
                <i class="icon ion-location"></i>
                {{ location }}
              </div>

              <Profiles
                :user="user"
              >
              </Profiles>

              <div class="user-description" v-html="user.description"></div>
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
          <Followings
            :eHeight="eHeight"
            :user="user"
            :userEntities="userEntities"
          >
          </Followings>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
  import { getImageUrl } from '../utils/SongUtils';
  import { IMAGE_SIZES } from '../constants/SongConstants';
  import { getUserLocation } from '../utils/UserUtils';
  import { USER_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

  import Spinner from './Spinner.vue';
  import Profiles from './users/Profiles.vue';
  import SongLists from './SongLists.vue';
  import Followings from './Followings.vue';

  export default {
    components: {
      Spinner,
      Profiles,
      SongLists,
      Followings,
    },
    computed: {
      user() {
        const { userId, userEntities } = this;
        return userEntities[userId];
      },
      avatarUrl() {
        return getImageUrl(this.user.avatar_url, IMAGE_SIZES.LARGE);
      },
      isFollowing() {
        const { userId, authedFollowings } = this;
        return userId in authedFollowings && authedFollowings[userId] === 1;
      },
      location() {
        return getUserLocation(this.user);
      },
      playlist() {
        return this.user.username + USER_PLAYLIST_SUFFIX;
      },
    },
    methods: {
      toggleFollow() {
        const { userId } = this;
        this.$store.dispatch('toggleFollow', userId);
      },
      playSong(index) {
        const { playlist } = this;
        this.$store.dispatch('playSong', {
          playlist,
          index,
        });
      },
    },
    props: ['authedLikes', 'authedUser', 'authedFollowings', 'currentTime', 'eHeight', 'playingSongId', 'playlists', 'songEntities', 'userEntities', 'userId'],
    watch: {
      userId(newId) {
        this.$store.dispatch('fetchUserIfNeeded', newId);
      },
    },
    beforeMount() {
      const { userId } = this;
      this.$store.dispatch('fetchUserIfNeeded', userId);
    },
  };
</script>
