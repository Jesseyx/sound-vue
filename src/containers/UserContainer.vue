<template>
  <User
    :authedLikes="authedLikes"
    :authedUser="authedUser"
    :authedFollowings="authedFollowings"
    :currentTime="currentTime"
    :eHeight="eHeight"
    :playingSongId="playingSongId"
    :playlists="playlists"
    :songEntities="songEntities"
    :userEntities="userEntities"
    :userId="userId"
  >
  </User>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  import User from '../components/User.vue';

  export default {
    components: {
      User,
    },
    computed: {
      ...mapGetters(['authedLikes', 'authedUser', 'authedFollowings', 'currentTime', 'eHeight', 'playingSongId', 'playlists', 'songEntities', 'userEntities']),
      userId() {
        return parseInt(this.$route.params.id, 10);
      },
    },
  };
</script>
