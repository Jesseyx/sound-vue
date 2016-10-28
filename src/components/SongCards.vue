<template>
  <div class="content">
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

    <spinner v-if="playlistData.isFetching"></spinner>
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

        chunk: 5,
      };
    },
    components: {
      Spinner,
      sRow: Row,
    },
    computed: {
      playlistData() {
        const { playlist, playlists } = this;
        return (playlist in playlists ? playlists[playlist] : {});
      },
      end() {
        const { playlist, playlists } = this;
        const items = playlist in playlists ? playlists[playlist].items : [];

        return items.length;
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
    props: ['playlist', 'playlists', 'songEntities', 'userEntities', 'authedUser', 'authedLikes', 'playingSongId'],
  };
</script>
