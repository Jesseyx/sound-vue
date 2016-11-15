<template>
  <StickyWrapper class="sidebar">
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
          :key="comment.id"
        >
        </Comment>
      </SidebarContent>
    </div>
  </StickyWrapper>
</template>

<style></style>

<script>
  import StickyWrapper from './StickyWrapper.vue';
  import Switch from './Switch.vue';
  import SidebarContent from './SidebarContent.vue';
  import Comment from './Comment.vue';

  const COMMENTS_REFRESH_RATE = 10;

  export default {
    data() {
      return {
        selfCurrentTime: this.currentTime || 0,
        timedComments: false,
        className: null,
      };
    },
    components: {
      StickyWrapper,
      SwitchBtn: Switch,
      SidebarContent,
      Comment,
    },
    computed: {
      normalized() {
        const { comments, isActive, timedComments, selfCurrentTime } = this;

        if (isActive && timedComments) {
          return comments
            .slice()
            .filter((comment) => {
              const commentTime = comment.timestamp / 1000;
              return commentTime >= selfCurrentTime
                && commentTime < (selfCurrentTime + COMMENTS_REFRESH_RATE);
            })
            .sort((a, b) => a.timestamp - b.timestamp);
        }

        return comments
          .slice()
          .sort((a, b) => a.timestamp - b.timestamp);
      },
    },
    watch: {
      currentTime(nextCurrentTime) {
        const { selfCurrentTime, timedComments, isActive } = this;
        if (!timedComments || !isActive) {
          return;
        }

        if (nextCurrentTime % COMMENTS_REFRESH_RATE === 0
          || Math.abs(nextCurrentTime - selfCurrentTime) > COMMENTS_REFRESH_RATE) {
          this.className = 'animate-out';
          this.$nextTick(() => {
            this.className = null;
            this.selfCurrentTime = nextCurrentTime;
          });
        }
      },
    },
    methods: {
      toggleTimedComments() {
        this.timedComments = !this.timedComments;
      },
    },
    props: {
      comments: {
        type: Array,
        required: true,
      },
      currentTime: {
        type: Number,
        required: true,
      },
      eHeight: {
        type: Number,
        required: true,
      },
      isActive: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>
