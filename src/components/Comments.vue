<template>
  <div class="sidebar" :class="{ sticky: sticky }" v-sticky="handleSticky" sticky-critical="50">
    <div class="comments" :class="{ timed: isActive && timedComments }">
      <div class="comments-header">
        <div class="comments-header-title">Comments</div>
        <SwitchBtn
          :isOn="timedComments"
          :toggleFunc="toggleTimedComments"
        >
        </SwitchBtn>
      </div>

      <SidebarContent
        :class="className"
        :height="eHeight - 200"
      >
        <Comment
          v-for="(comment, i) in normalized"
          :comment="comment"
          :index="i"
          :key="i"
        >
        </Comment>
      </SidebarContent>
    </div>
  </div>
</template>

<style></style>

<script>
  import Sticky from '../directives/Sticky';
  import Switch from './Switch.vue';
  import SidebarContent from './SidebarContent.vue';
  import Comment from './Comment.vue';

  const COMMENTS_REFRESH_RATE = 10;

  export default {
    data() {
      return {
        sticky: false,
        timedComments: false,
        className: null,
      };
    },
    components: {
      SwitchBtn: Switch,
      SidebarContent,
      Comment,
    },
    computed: {
      normalized() {
        const { comments, isActive, timedComments, currentTime } = this;

        if (isActive && timedComments) {
          return comments
            .slice()
            .filter((comment) => {
              const commentTime = comment.timestamp / 1000;
              return commentTime >= currentTime && commentTime < (currentTime + COMMENTS_REFRESH_RATE);
            })
            .sort((a, b) => a.timestamp - b.timestamp);
        }

        return comments
          .slice()
          .sort((a, b) => a.timestamp - b.timestamp);
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
      toggleTimedComments() {
        this.timedComments = !this.timedComments;
      },
    },
    props: ['comments', 'currentTime', 'eHeight', 'isActive'],
  };
</script>
