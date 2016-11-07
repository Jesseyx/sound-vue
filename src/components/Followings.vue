<template>
  <Sidebar>
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
  </Sidebar>
</template>

<style></style>

<script>
  import Sidebar from './Sidebar.vue';
  import SidebarContent from './SidebarContent.vue';
  import UserCard from './UserCard.vue';

  export default {
    components: {
      Sidebar,
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
