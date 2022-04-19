<template>
<div class="search-input">
  <input v-model="query" class="search-input__field" type="text" placeholder="Поиск" @keyup.enter="$emit('onEnter', query)">
</div>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
      query: '',
    };
  },
  mounted() {
    this.query = this.$route.query.q || '';
  }
}
</script>

<style lang="scss">
.search-input {
  &__field {
    background: url('static/search.png') 8px 50% no-repeat rgba(60, 60, 67, 0.1);
    padding: 0 16px 0 36px;
    max-width: 500px;
    border-radius: 10px;
    border: 0;
    font-size: 17px;
    line-height: 22px;
    height: 36px;
    width: 100%;
    @include media-breakpoint-up('md') {
      height: 50px;
      max-width: 309px;
    }
  }
}
</style>
