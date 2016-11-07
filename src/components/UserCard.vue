<template>
  <div class="user-card">
    <img class="user-card-image" :src="avatarUrl" alt="User avatar">

    <div class="user-card-info">
      <router-link class="user-card-title" :to="{ name: 'user', params: { id: user.id } }">
        {{ user.username }}
      </router-link>

      <div class="user-card-subtitle">
        <i class="icon ion-location"></i>
        {{ location }}
      </div>
    </div>

    <div class="user-card-followers">
      <div class="user-card-followers-count">
        {{ followersCount }}
      </div>

      <div class="user-card-subtitle">
        Followers
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
  import { getImageUrl } from '../utils/SongUtils';
  import { getUserLocation } from '../utils/UserUtils';
  import { addCommas } from '../utils/FormatUtils';

  export default {
    computed: {
      avatarUrl() {
        return getImageUrl(this.user.avatar_url);
      },
      location() {
        return getUserLocation(this.user);
      },
      followersCount() {
        return addCommas(this.user.followers_count);
      },
    },
    props: ['user'],
  };
</script>
