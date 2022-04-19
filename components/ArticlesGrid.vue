<template>
  <div class="articles-grid">
    <template v-if="posts.length">
      <article-card v-for="post in posts" :key="post.id" :post="post" class="articles-grid__card" />
    </template>
    <div v-else class="articles-grid__empty">
      Постов не найдено
    </div>
  </div>
</template>

<script>
import ArticleCard from "~/components/ArticleCard";

export default {
  name: 'ArticlesGrid',
  components: {
    ArticleCard,
  },
  props: {
    posts: {
      type: Array,
      default() {
        return [];
      }
    },
  }
};
</script>

<style lang="scss">
.articles-grid {
  display: flex;
  flex-wrap: wrap;
  column-gap: 32px;
  row-gap: 40px;
  &__card {
    flex: 1 0 100%;
    max-width: 100%;
    @include media-breakpoint-up('sm') {
      flex: 1 0 100%;
      max-width: 100%;
    }
    @include media-breakpoint-up('md') {
      flex: 0 0 47%;
      max-width: 278px;
    }
    @include media-breakpoint-up('lg') {
      flex: 1 0 30%;
      max-width: 250px;
    }
    @include media-breakpoint-up('xl') {
      flex: 1 0 31%;
      max-width: 325px;
    }
  }
  &__empty {
    margin: 15px 0;
    font-size: 21px;
  }
}
</style>
