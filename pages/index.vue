<template>
  <div class="main">
    <articles-grid :posts="posts" />
    <the-pagination
      v-if="pagesCount"
      class="main__pagination"
      :pages-count="pagesCount"
      :current-page="currentPage"
      @onClickPage="clickPage"
    />
  </div>
</template>

<script>
import ArticlesGrid from "~/components/ArticlesGrid";

export default {
  name: 'IndexPage',
  components: { ArticlesGrid },
  async asyncData({ store, query, error }) {
    const currentPage = parseInt(query.page) || 1;
    const searchQuery = query.q || '';
    try {
      await store.dispatch('post/getPostList', { page: currentPage, searchQuery });
    } catch (e) {
      error({ statusCode: e.status, message: 'Статей не найдено' });
    }
  },
  computed: {
    posts() {
      return this.$store.getters['post/postList'];
    },
    pagesCount() {
      return this.$store.getters['post/pagesCount'];
    },
    currentPage() {
      return Number(this.$route.query.page) || 1;
    },
    searchQuery() {
      return this.$route.query.q || '';
    }
  },
  watchQuery: ['page', 'q'],
  methods: {
    clickPage(page) {
      this.$router.push({ query: { page, q: this.searchQuery } });
    },
  }
}
</script>

<style lang="scss">
.main {
  &__pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }
}
</style>
