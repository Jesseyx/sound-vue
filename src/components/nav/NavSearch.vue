<template>
  <div class="nav-search">
    <i class="icon ion-search"></i>
    <input
      v-model="searchValue"
      class="nav-search-input"
      type="text"
      placeholder="SEARCH"
      ref="search"
      @keyup.enter="handleSearch"
    />
  </div>
</template>

<style lang="sass">
</style>

<script>
  export default {
    data() {
      return {
        searchValue: '',
      };
    },
    methods: {
      handleSearch(e) {
        const { searchValue } = this;
        if (searchValue !== '') {
          this.$router.push({ name: 'songs', query: { q: searchValue }});
        }
      },
      handleSlashPress(e) {
        // ? code
        const keyCode = e.keyCode || e.which;
        const isInsideInput = e.target.tagName.toLowerCase().match(/input|textarea/);
        if (keyCode === 47 && !isInsideInput) {
          e.preventDefault();
          this.$refs.search.focus();
        }
      },
    },
    mounted() {
      document.addEventListener('keypress', this.handleSlashPress, false);
    },
    beforeDestroy() {
      document.removeEventListener('keypress', this.handleSlashPress, false);
    },
  };
</script>
