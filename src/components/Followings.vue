<template>
  <div class="sidebar" :class="{ sticky: sticky }" v-sticky="handleSticky" sticky-critical="50">
    <div class="followings" v-if="user && user.followings">
      <div class="followings-header">
        <div class="followings-title">
          {{ `Following ${followings.length} Users` }}
        </div>
      </div>

      <SidebarContent
        :height="eHeight - 200"
      >
        <UserCard
          v-for="following in followings"
          :user="following"
        >
        </UserCard>
      </SidebarContent>
    </div>
  </div>
</template>

<style></style>

<script>
  import Sticky from '../directives/Sticky';
  import SidebarContent from './SidebarContent.vue';
  import UserCard from './UserCard.vue';

  export default {
    data() {
      return {
        sticky: false,
      };
    },
    components: {
      SidebarContent,
      UserCard,
    },
    computed: {
      followings() {
        const { user, userEntities } = this;
        return user.followings.map(followingId => userEntities[followingId]);
      },
    },
    directives: {
      Sticky,
    },
    methods: {
      handleSticky(sticky) {
        if (sticky && !this.sticky) {
          this.sticky = sticky;
        } else if (!sticky && this.sticky) {
          this.sticky = sticky;
        }
      },
    },
    props: ['eHeight', 'user', 'userEntities'],
  };
</script>
