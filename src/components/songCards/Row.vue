<template>
  <div class="songs-row grid">
    <div class="col-1-5 clearfix" v-for="id in list">
      <card
        :songId="id"
        :song="songEntities[id]"
        :user="userEntities[songEntities[id].user_id]"
        :authedUser="authedUser"
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
    },
    props: ['list', 'chunk', 'songEntities', 'userEntities', 'authedUser'],
  };
</script>
