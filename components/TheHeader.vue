<template>
  <header class="header">
    <div class="header__logo">
      <nuxt-link to="/" class="header__logo-link">Logo</nuxt-link>
    </div>
    <div v-if="pageType === 'index'" class="header__title">
      Посты
    </div>
    <div class="header__rightside" :class="{ 'header__rightside--post': pageType === 'post_id' }">
      <div class="header__search">
        <search-input @onEnter="searchPosts" />
      </div>
      <nuxt-link to="/" class="header__menu"><img src="../static/posts.svg" alt=""> Посты</nuxt-link>
    </div>
    <div v-if="pageType === 'post_id'" class="header__mobile-post">
      <div class="header__mobile-back">
        <span class="header__mobile-back-link" @click="goBack">
          &lsaquo; Назад
        </span>
      </div>
      <div class="header__mobile-title">
        Пост
      </div>
    </div>
  </header>
</template>

<script>
import SearchInput from "~/components/SearchInput";

export default {
  name: "TheHeader",
  components: { SearchInput },
  props: {
    pageType: {
      type: String,
      default: 'index',
    }
  },
  methods: {
    searchPosts(query) {
      this.$router.push({ query: { q: query } });
    },
    goBack() {
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
.header {
  padding-top: 15px;
  padding-bottom: 10px;
  display: block;
  @include media-breakpoint-up('md') {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 37px;
    padding-bottom: 46px;
  }
  &__logo {
    font-family: Inter, Arial, sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
    display: none;
    @include media-breakpoint-up('md') {
      display: block;
    }
  }
  &__logo-link {
    text-decoration: none;
  }
  &__rightside {
    display: block;
    @include media-breakpoint-up('md') {
      display: flex;
      align-items: center;
    }
    &--post {
      display: none;
      @include media-breakpoint-up('md') {
        display: flex;
        align-items: center;
      }
    }
  }
  &__search {
    margin: 0;
    @include media-breakpoint-up('md') {
      margin-right: 92px;
      margin-left: 20px;
    }
  }
  &__menu {
    display: none;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.5px;
    color: $--color-action;
    text-decoration: none;
    img {
      display: inline-block;
      vertical-align: middle;
      padding-right: 4px;
    }
    @include media-breakpoint-up('md') {
      display: block;
    }
  }
  &__title {
    display: block;
    font-weight: 700;
    font-size: 32px;
    line-height: 36px;
    color: #000000;
    margin-bottom: 18px;
    @include media-breakpoint-up('md') {
      display: none;
      margin-bottom: 0;
    }
  }
  &__mobile-post {
    display: flex;
    @include media-breakpoint-up('md') {
      display: none;
    }
  }
  &__mobile-back {
    flex: 1 0 auto;
  }
  &__mobile-back-link {
    cursor: pointer;
    color: $--color-action;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }
  &__mobile-title {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }
}
</style>
