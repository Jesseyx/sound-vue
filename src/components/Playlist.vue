<template>
  <div class="popover-content playlist" @click.stop>
    <div class="playlist-header">
      <a class="playlist-header-button" :class="{ disabled: isFirstPlaylist }" href="#" @click.prevent="changeShownPlaylist('prev')">
        <i class="icon ion-ios-arrow-back"></i>
      </a>

      <div class="playlist-header-title">
        {{ shownPlaylist.split('|')[0] }}
      </div>

      <a class="playlist-header-button" :class="{ disabled: isLastPlaylist }" href="" @click.prevent="changeShownPlaylist('next')">
        <i class="icon ion-ios-arrow-forward"></i>
      </a>
    </div>

    <div class="playlist-body">
      <songs
        :songsId="currentItems"
        :songEntities="songEntities"
        :currentSongIndex="currentSongIndex"
        :playerIsShownCurrentPlaylist="playerIsShownCurrentPlaylist"
        :playSong="playSong"
      >
      </songs>
    </div>

    <div class="playlist-footer">
      {{ currentItems.length + (currentItems.length === 1 ? ' Song' : ' Songs') }}
    </div>
  </div>
</template>

<style></style>

<script>
  import Songs from './playlist/Songs.vue';

  export default {
    data() {
      return {
        shownPlaylistIndex: null,
      };
    },
    components: {
      Songs,
    },
    computed: {
      currentIndex() {
        const { shownPlaylistIndex, selectedPlaylists } = this;
        const lastPlaylistIndex = selectedPlaylists.length - 1;

        if (shownPlaylistIndex === null) {
          return lastPlaylistIndex;
        }

        return shownPlaylistIndex;
      },

      shownPlaylist() {
        const { currentIndex, selectedPlaylists } = this;
        return selectedPlaylists[currentIndex];
      },

      isFirstPlaylist() {
        return this.currentIndex === 0;
      },

      isLastPlaylist() {
        const { currentIndex, selectedPlaylists } = this;
        return currentIndex === selectedPlaylists.length - 1;
      },

      currentItems() {
        const { shownPlaylist, playlists } = this;
        return playlists[shownPlaylist].items;
      },

      playerIsShownCurrentPlaylist() {
        const { selectedPlaylists, shownPlaylist } = this;
        return selectedPlaylists[selectedPlaylists.length - 1] === shownPlaylist;
      },
    },
    methods: {
      changeShownPlaylist(key) {
        let { currentIndex: index } = this;
        const { selectedPlaylists } = this;

        if (key === 'prev') {
          index -= 1;
        } else if (key === 'next') {
          index += 1;
        }

        if (index < 0 || index >= selectedPlaylists.length) {
          return;
        }

        this.shownPlaylistIndex = index;
      },
      playSong(index) {
        console.log(index);
        const { shownPlaylist } = this;
        this.$store.dispatch('playSong', {
          playlist: shownPlaylist,
          index,
        });

        this.shownPlaylistIndex = null;
      },
    },
    props: ['currentSongIndex', 'selectedPlaylists', 'playlists', 'songEntities'],
  };
</script>
