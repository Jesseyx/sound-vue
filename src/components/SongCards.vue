<template>
  <div class="content">
    <div class="padder" :style="{ height: `${paddingTop}px` }"></div>
    
    <s-row
      v-for="(item, index) in normalized"
      :list="item"
      :index="index"
      :chunk="chunk"
      :songEntities="songEntities"
      :userEntities="userEntities"
      :authedUser="authedUser"
      :playingSongId="playingSongId"
      :authedLikes="authedLikes"
      :playlist="playlist"
    >
    </s-row>

    <div class="padder" :style="{ height: `${paddingBottom}px` }"></div>

    <spinner v-if="isFetching"></spinner>
  </div>
</template>

<style></style>

<script>
  import Spinner from './Spinner.vue';
  import Row from './songCards/Row.vue';

  export default {
    data() {
      return {
        paddingBottom: 0,
        paddingTop: 0,
        start: 0,
        end: 0,

        chunk: 5,
      };
    },
    components: {
      Spinner,
      sRow: Row,
    },
    computed: {
      isFetching() {
        const { playlist, playlists } = this;
        const data = playlist in playlists ? playlists[playlist] : {};
        return data.isFetching;
      },
      normalized() {
        const { end, start, chunk, playlist, playlists } = this;
        const items = playlist in playlists ? playlists[playlist].items : [];
        const result = [];

        for (let i = start; i < end; i += chunk) {
          result.push(items.slice(i, i + chunk));
        }

        return result;
      },
    },
    methods: {
      onScroll() {
        this.checkIfNeedFetch();
        this.checkIfUpdateData();
      },

      checkIfNeedFetch() {
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200)) {
          this.$store.dispatch('fetchSongsIfNeeded', this.playlist);
        }
      },

      checkIfUpdateData() {
        const { end, paddingBottom, paddingTop, start } = this.getScrollState();

        if (paddingTop !== this.paddingTop
          || paddingBottom !== this.paddingBottom
          || end !== this.end
          || start !== this.start) {
          this.paddingBottom = paddingBottom;
          this.paddingTop = paddingTop;
          this.start = start;
          this.end = end;
        }
      },

      getScrollState() {
        const { eHeight, playlist, playlists } = this;
        const items = playlist in playlists ? playlists[playlist].items : [];

        const MARGIN_TOP = 20;
        const ROW_HEIGHT = 132;
        const ITEMS_PER_ROW = 5;
        const scrollY = window.scrollY;

        let paddingTop = 0;
        let paddingBottom = 0;
        let start = 0;
        let end = items.length;

        if ((scrollY - ((ROW_HEIGHT * 3) + (MARGIN_TOP * 2))) > 0) {
          const rowsToPad = Math.floor(
            (scrollY - ((ROW_HEIGHT * 2) + (MARGIN_TOP))) / (ROW_HEIGHT + MARGIN_TOP)
          );

          paddingTop = rowsToPad * (ROW_HEIGHT + MARGIN_TOP);
          start = rowsToPad * ITEMS_PER_ROW;
        }

        const rowsOnScreen = Math.ceil(eHeight / (ROW_HEIGHT + MARGIN_TOP));
        const itemsToShow = (rowsOnScreen + 5) * ITEMS_PER_ROW;

        if (items.length > (start + itemsToShow)) {
          end = start + itemsToShow;
          const rowsToPad = Math.ceil((items.length - end) / ITEMS_PER_ROW);
          paddingBottom = rowsToPad * (ROW_HEIGHT + MARGIN_TOP);
        }

        return {
          end,
          paddingBottom,
          paddingTop,
          start,
        };
      },
    },
    beforeUpdate() {
      this.checkIfUpdateData();
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll, false);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll, false);
    },
    props: ['playlist', 'playlists', 'songEntities', 'userEntities', 'authedUser', 'authedLikes', 'playingSongId', 'eHeight'],
  };
</script>
