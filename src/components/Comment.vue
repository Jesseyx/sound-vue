<template>
  <div class="comment" :style="{ animationDelay: `${(index * 50)}ms` }">
    <div class="comment-image" :style="{ backgroundImage: `url(${avatarUrl})` }"></div>

    <div class="comment-info">
      <div class="comment-comment">
        {{ comment.body }}
      </div>
      <div class="comment-username">
        {{ user.username }}
      </div>
    </div>

    <div class="comment-time">
      {{ time }}
    </div>
  </div>
</template>

<style></style>

<script>
  import { getImageUrl } from '../utils/SongUtils';
  import { IMAGE_SIZES } from '../constants/SongConstants';
  import { formatSeconds } from '../utils/FormatUtils';

  export default {
    computed: {
      user() {
        return this.comment.user;
      },
      avatarUrl() {
        return getImageUrl(this.user.avatar_url, IMAGE_SIZES.LARGE)
      },
      time() {
        return formatSeconds(Math.floor(this.comment.timestamp / 1000));
      },
    },
    props: ['comment', 'index'],
  };
</script>
