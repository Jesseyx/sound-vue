<template>
  <div class="songs-row grid">
    <div class="col-1-5 clearfix" v-for="(id, index) in list" :key="`${(baseIndex + index)}-${id}`">
      <card
        :authedLikes="authedLikes"
        :authedUser="authedUser"
        :isActive="id === playingSongId"
        :song="songEntities[id]"
        :songId="id"
        :songIndex="baseIndex + index"
        :playlist="playlist"
        :user="userEntities[songEntities[id].user_id]"
      >
      </card>
    </div>

    <div class="col-1-5" v-for="id in paddingNum" :key="`song-placeholder-${(baseIndex + id)}`"></div>
  </div>
</template>

<style></style>

<script>
  import Card from './Card.vue';

  export default {
    components: {
      Card,
    },
    computed: {
      paddingNum() {
        return (this.chunk - this.list.length);
      },
      baseIndex() {
        const { start, chunk, index } = this;
        return (start + (chunk * index));
      },
    },
    props: ['authedLikes', 'authedUser', 'start', 'chunk', 'index', 'list', 'playingSongId', 'playlist', 'songEntities', 'userEntities'],
  };
</script>
