<template>
  <div class="nav">
    <div class="container clearfix">
      <div class="nav-logo">
        <i class="icon ion-radio-waves"></i>
      </div>

      <div class="nav-nav float-left">
        <div class="nav-nav-item">
          <router-link class="nav-nav-item-link active" :to="{ name: 'songs' }">SoundRedux</router-link>
        </div>
        
        <div class="nav-nav-item" v-if="authedUser">
          <router-link class="nav-nav-user-link" :to="{ name: 'stream' }" active-class="active">
            <span class="nav-nav-user-link-text">stream</span>
          </router-link>
        </div>

        <div class="nav-nav-item" v-if="authedUser">
          <router-link class="nav-nav-user-link" :to="{ name: 'likes' }" active-class="active">
            <span class="nav-nav-user-link-text">likes</span>
          </router-link>
        </div>

        <popover class="nav-nav-item nav-playlists" v-if="authedUser">
          <div class="nav-nav-user-link" :class="{ active: selected }" slot="content">
            <span class="nav-nav-user-link-text">{{ playlistName }}</span>
            <i class="icon ion-chevron-down"></i>
            <i class="icon ion-chevron-up"></i>
          </div>
          <div class="nav-playlists-popover popover-content" slot="bomb">
            <authed-playlist
              v-for="playlistId in authedPlaylists"
              :playlist="playlistEntities[playlistId]"
              :playlistId="playlistId"
              :songEntities="songEntities"
            >
            </authed-playlist>
          </div>
        </popover>
      </div>

      <div class="nav-nav float-right">
        <div class="nav-nav-item">
          <nav-search></nav-search>
        </div>
        <div class="nav-nav-item">
          <popover class="nav-user" v-if="authedUser">
            <div class="nav-user-link" slot="content">
              <img class="nav-authed-image" :src="avatar" alt="User avatar" />
              <i class="icon ion-chevron-down"></i>
              <i class="icon ion-chevron-up"></i>
            </div>
            <div class="nav-user-popover popover-content" slot="bomb">
              <ul class="nav-user-popover-list">
                <li class="nav-user-popover-item">
                  <a href="#" @click.prevent="logout">Log Out</a>
                </li>
              </ul>
            </div>
          </popover>

          <popover class="nav-user" v-if="!authedUser">
            <div class="nav-user-link" slot="content">
              <i class="icon ion-person"></i>
              <i class="icon ion-chevron-down"></i>
              <i class="icon ion-chevron-up"></i>
            </div>
            <div class="nav-user-popover popover-content" slot="bomb">
              <ul class="nav-user-popover-list">
                <li class="nav-user-popover-item">
                  <a class="button orange block" href="#" @click.prevent="login">Sign into SoundCloud</a>
                </li>
              </ul>
            </div>
          </popover>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
  import { mapGetters } from 'vuex';

  import NavSearch from './nav/NavSearch.vue';
  import Popover from './Popover.vue';
  import AuthedPlaylist from './nav/AuthedPlaylist.vue';

  import { getImageUrl } from '../utils/SongUtils';

  export default {
    components: {
      NavSearch,
      Popover,
      AuthedPlaylist,
    },
    computed: {
      avatar() {
        return getImageUrl(this.authedUser.avatar_url);
      },
      selected() {
        return this.$route.name === 'playlists';
      },
      playlistName() {
        const { id } = this.$route.params;
        const { playlistEntities } = this;

        if (this.selected && (id in playlistEntities)) {
          return playlistEntities[id].title;
        }

        return 'playlist';
      },
    },
    methods: {
      // when use mapActions(['loginUser']), the event must be @click.prevent="loginUser()", otherwise the event obj will be the payload to dispatch function
      login() {
        this.$store.dispatch('loginUser');
      },
      logout() {
        this.$store.dispatch('logoutUser');
      },
    },
    props: ['authedPlaylists', 'authedUser', 'playlistEntities', 'songEntities'],
  };
</script>
