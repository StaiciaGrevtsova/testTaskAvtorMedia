<template>
  <div class="comment-item">
    <div class="comment-item__avatar">
      <img src="@/static/avatar.png" class="comment-item__image">
    </div>
    <div class="comment-item__content">
      <div class="comment-item__name">
        {{ comment.name }}
      </div>
      <p class="comment-item__body">
        {{ comment.body }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  props: {
    comment: {
      type: Object,
      default: () => ({}),
    }
  }
}
</script>

<style lang="scss">
.comment-item {
  display: flex;
  margin-bottom: 20px;
  &__avatar {
    margin-right: 12px;
  }
  &__image {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  &__name {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
    margin-bottom: 1px;
    @include media-breakpoint-up('md') {
      margin-bottom: 10px;
    }
  }
  &__body {
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: rgba(60, 60, 67, 0.6);
    margin: 0;
  }
}
</style>
