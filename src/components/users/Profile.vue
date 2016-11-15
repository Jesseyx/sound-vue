<template>
  <div class="user-profile">
    <i class="icon" :class="[socialIcon]"></i>
    <a :href="profile.url" target="_blank" rel="noopener noreferrer">
      {{ profile.title ? profile.title : profile.service }}
    </a>
  </div>
</template>

<style></style>

<script>
  import { getSocialIcon } from '../../utils/FormatUtils';

  export default {
    computed: {
      socialIcon() {
        return getSocialIcon(this.profile.service);
      },
    },
    props: {
      profile: {
        type: Object,
        required: true,
      },
    },
  };
</script>
