<template>
  <div class="toolbar">
    <div class="container">
      <div class="toolbar-items">
        <router-link
          class="toolbar-item toolbar-genre"
          :class="{ active: g === genre }"
          v-for="g in genres"
          :to="{ name: 'songs', query: { q: g, t: time} }"
        >
          {{ g }}
        </router-link>

        <div class="toolbar-item toolbar-filter toolbar-times">
          <i class="icon ion-funnel"></i>

          <router-link
            class="toolbar-time"
            :class="{ active: t === time }"
            v-for="t in days"
            :to="{ name: 'songs', query: { q: genre, t: t } }"
          >
            {{ `${t} days` }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
  import { GENRES } from '../constants/SongConstants';

  export default {
    data() {
      return {
        days: [7, 30, 90],
        genres: GENRES,
      };
    },
    computed: {
      genre() {
        return this.playlist.split(' - ')[0];
      },
    },
    props: ['playlist', 'time'],
  };
</script>
