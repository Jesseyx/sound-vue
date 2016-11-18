<template>
  <div class="mobile-nav">
    <MenuMotion :distance="(genres.length - 1) * 50">
      <div class="mobile-nav-menu" v-if="isGenreMenuOpen" @click="toggleGenreMenuOpen">
        <router-link
          v-for="genre in genres"
          class="mobile-nav-tab"
          :to="{ name: 'songs', query: { q: genre } }"
          :key="genre"
        >
          {{ genre }}
        </router-link>
      </div>
    </MenuMotion>

    <MenuMotion :distance="4 * 50">
      <div class="mobile-nav-menu mobile-scrollable" v-if="isUserMenuOpen" @click="toggleUserMenuOpen">
        <router-link
          v-for="detail in userPlaylistDetails"
          class="mobile-nav-tab"
          :to="detail.to"
          :key="detail.title"
        >
          {{ detail.title }}
        </router-link>
      </div>
    </MenuMotion>

    <div class="mobile-nav-items">
      <a class="mobile-nav-item" href="#" @click="toggleGenreMenuOpen">
        {{ playlist }}
        <i :class="isGenreMenuOpen ? 'ion-chevron-down' : 'ion-chevron-up'"></i>
      </a>
    </div>

    <div class="mobile-nav-items" v-if="authedUser">
      <a class="mobile-nav-item mobile-nav-auth" href="#" @click="toggleUserMenuOpen">
        <img class="mobile-nav-authed-image" :src="avatarUrl" alt="User avatar">
        {{ authedUser.username }}
      </a>
      <a class="mobile-nav-item mobile-nav-auth" href="#" @click.prevent="logout">
        {{ "Log Out" }}
      </a>
    </div>

    <div class="mobile-nav-items" v-else>
      <a class="mobile-nav-item mobile-nav-auth" href="#" @click.prevent="login">
        {{ "Sign into SoundCloud" }}
        <i class="icon ion-person"></i>
      </a>
    </div>
  </div>
</template>

<style></style>

<script>
  import { GENRES } from '../constants/SongConstants';
  import { getImageUrl } from '../utils/SongUtils';

  import MenuMotion from './MenuMotion.vue';

  export default {
    data() {
      return {
        isGenreMenuOpen: false,
        isUserMenuOpen: false,
      };
    },
    components: {
      MenuMotion,
    },
    computed: {
      playlist() {
        const { query } = this.$route;

        const time = query && query.t ? query.t : null;
        let playlist = query && query.q ? query.q : 'house';

        if (time) {
          playlist = `${playlist} - ${time}`;
        }

        return playlist;
      },
      genres() {
        const { isGenreMenuOpen, playlist } = this;
        return isGenreMenuOpen ? GENRES.filter(genre => genre !== playlist) : [];
      },
      userPlaylistDetails() {
        const { authedPlaylists, playlistEntities } = this;
        const playlistDetails = [];

        authedPlaylists.forEach((id) => {
          playlistDetails.push({
            title: playlistEntities[id].title,
            to: { name: 'playlists', params: { id } },
          });
        });

        return [
          {
            title: 'stream',
            to: { name: 'stream' },
          },
          {
            title: 'likes',
            to: { name: 'likes' },
          },
          ...playlistDetails,
        ];
      },
      avatarUrl() {
        return getImageUrl(this.authedUser.avatar_url);
      },
    },
    methods: {
      toggleGenreMenuOpen(e) {
        e.preventDefault();
        if (!this.isUserMenuOpen) {
          this.isGenreMenuOpen = !this.isGenreMenuOpen;
        }
      },
      toggleUserMenuOpen(e) {
        e.preventDefault();
        if (!this.isGenreMenuOpen) {
          this.isUserMenuOpen = !this.isUserMenuOpen;
        }
      },
      login() {
        this.$store.dispatch('loginUser', false);
      },
      logout() {
        this.$store.dispatch('logoutUser');
      },
    },
    props: {
      authedPlaylists: {
        type: Array,
        required: true,
      },
      authedUser: Object,
      playlistEntities: {
        type: Object,
        required: true,
      },
      songEntities: {
        type: Object,
        required: true,
      },
    },
  };
</script>
