<template>
  <div class="songs-row grid">
    <div class="col-1-5 clearfix" v-for="(id, index) in list">
      <card
        :songId="id"
        :song="songEntities[id]"
        :user="userEntities[songEntities[id].user_id]"
        :authedUser="authedUser"
        :isActive="id === playingSongId"
        :authedLikes="authedLikes"
        :songIndex="baseIndex + index"
        :playlist="playlist"
      >
      </card>
    </div>

    <div class="col-1-5" v-for="id in paddingNum"></div>
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
        return this.chunk * this.index;
      },
    },
    props: ['list', 'index', 'chunk', 'songEntities', 'userEntities', 'authedUser', 'authedLikes', 'playingSongId', 'playlist'],
  };
</script>
