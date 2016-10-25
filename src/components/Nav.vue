<template>
  <div class="nav">
    <div class="container clearfix">
      <div class="nav-logo">
        <i class="icon ion-radio-waves"></i>
      </div>

      <div class="nav-nav float-left">
        <div class="nav-nav-item">
          <a class="nav-nav-item-link active" href="#">SoundRedux</a>
        </div>
      </div>

      <div class="nav-nav float-right">
        <div class="nav-nav-item">
          <nav-search></nav-search>
        </div>
        <div class="nav-nav-item">
          <popover class="nav-user">
            <div class="nav-user-link" slot="content">
              <i class="icon ion-person"></i>
              <i class="icon ion-chevron-down"></i>
              <i class="icon ion-chevron-up"></i>
            </div>
            <div class="nav-user-popover popover-content" slot="bomb">
              <ul class="nav-user-popover-list">
                <li class="nav-user-popover-item">
                  <a class="button orange block" href="#" @click.prevent="loginUser">Sign into SoundCloud</a>
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

  import NavSearch from './NavSearch.vue';
  import Popover from './Popover.vue';

  export default {
    components: {
      NavSearch,
      Popover,
    },
    methods: {
      // when use mapActions(['loginUser']), the event must be @click.prevent="loginUser()", otherwise the event obj will be the payload to dispatch function
      loginUser() {
        this.$store.dispatch('loginUser');
      },
    },
  };
</script>
