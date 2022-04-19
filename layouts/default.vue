<template>
  <div class="default-layout">
    <div class="default-layout__header" :class="`default-layout__header--${pageType}`">
      <the-header class="container" :page-type="pageType" />
    </div>
    <nuxt class="default-layout__container container" />
    <div class="default-layout__footer">
      <the-footer class="container" />
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader';
import TheFooter from '~/components/TheFooter';

export default {
  components: { TheHeader, TheFooter },
  computed: {
    pageType() {
      return this.$route.name;
    }
  }
};
</script>

<style lang="scss">
.default-layout {
  &__header {
    background: #FAFAFA;
    margin-bottom: 32px;
    @include media-breakpoint-up('md') {
      background: #FFFFFF;
      margin-bottom: 0;
    }
    &--post_id {
      margin-bottom: 0;
    }
  }
  &__footer {
    border-top: 1px solid #E8E8E8;
    padding: 30px 0 39px;
    margin-top: 136px;
  }
}
</style>
