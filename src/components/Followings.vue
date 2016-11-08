<template>
  <StickyWrapper class="sidebar">
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
          :key="following.id"
        >
        </UserCard>
      </SidebarContent>
    </div>
  </StickyWrapper>
</template>

<style></style>

<script>
  import StickyWrapper from './StickyWrapper.vue';
  import SidebarContent from './SidebarContent.vue';
  import UserCard from './UserCard.vue';

  export default {
    components: {
      StickyWrapper,
      SidebarContent,
      UserCard,
    },
    computed: {
      followings() {
        const { user, userEntities } = this;
        return user.followings.map(followingId => userEntities[followingId]);
      },
    },
    props: ['eHeight', 'user', 'userEntities'],
  };
</script>
