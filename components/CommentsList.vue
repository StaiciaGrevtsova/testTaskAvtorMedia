<template>
<div class="comments-list">
  <div class="comments-list__title">
    Комментарии
  </div>
  <comment-item v-for="(item, index) in commentsList" :key="index" :comment="item" class="comments-list__item" />
</div>
</template>

<script>
export default {
  name: "CommentsList",
  props: {
    commentsList: {
      type: Array,
      default: () => ([]),
    }
  }
}
</script>

<style lang="scss">
.comments-list {
  &__title {
    font-weight: 500;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: -0.02em;
    margin-bottom: 38px;
  }
  &__item {
    padding: 6px 0;
    @include media-breakpoint-up('md') {
      padding: 6px 16px;
    }
  }
}
</style>
