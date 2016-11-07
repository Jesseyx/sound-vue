<template>
  <div class="user-profiles">
    <div class="user-profile">
      {{ `${followersCount} followers` }}
    </div>
    <template v-if="user && user.profiles">
      <Profile
        v-for="profile in normalized"
        :profile="profile"
      >
      </Profile>
    </template>
  </div>
</template>

<style></style>

<script>
  import { addCommas } from '../../utils/FormatUtils';

  import Profile from './Profile.vue';

  export default {
    components: {
      Profile,
    },
    computed: {
      normalized() {
        return this.user.profiles.slice(0, 6);
      },
      followersCount() {
        return addCommas(this.user.followers_count);
      },
    },
    props: ['user'],
  };
</script>
