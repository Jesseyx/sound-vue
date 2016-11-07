<template>
  <Popover class="song-list-item-stat song-heart-count" v-if="!authedUser">
    <div slot="content">
      <i class="icon ion-ios-heart"></i>
      <span>{{ countNum }}</span>
    </div>

    <div class="song-heart-count-popover popover-content" slot="bomb">
      <ul class="nav-user-popover-list">
        <li class="nav-user-popover-item">
          <a class="button orange block" @click="login">
            Sign into SoundCloud
          </a>
        </li>
      </ul>
    </div>
  </Popover>

  <div class="song-list-item-stat song-heart-count" :class="{ liked: isLiked }" @click="toggleLike" v-else>
    <i class="icon ion-ios-heart"></i>
    <span>{{ countNum }}</span>
  </div>
</template>

<style></style>

<script>
  import { addCommas } from '../utils/FormatUtils';

  import Popover from './Popover.vue';

  export default {
    components: {
      Popover,
    },
    computed: {
      isLiked() {
        const { songId, authedLikes } = this;
        return songId in authedLikes && authedLikes[songId];
      },
      countNum() {
        const { isLiked, count } = this;
        return addCommas(count + (isLiked ? 1 : 0));
      },
    },
    methods: {
      login() {
        this.$store.dispatch('loginUser');
      },
      toggleLike() {
        this.$store.dispatch('toggleLike', this.songId);
      },
    },
    props: ['authedUser', 'authedLikes', 'count', 'songId'],
  };
</script>
