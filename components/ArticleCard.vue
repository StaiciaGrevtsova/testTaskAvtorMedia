<template>
  <div class="article-card">
    <div class="article-card__image" @click="viewPost">
      <img src="@/static/article_preview.png" alt="">
    </div>
    <div class="article-card__content">
      <div class="article-card__title" @click="viewPost">
        {{ post.title }}
      </div>
      <div class="article-card__text">
        {{ post.body.length < limitBodySymbols ? post.body : post.body.substring(0,limitBodySymbols) + "..."}}
      </div>
      <div class="article-card__actions">
        <div class="article-card__comments" @click="viewComments">
          {{ post.comments ? post.comments.length : 0 }}
        </div>
        <div class="article-card__edit" @click="editPost"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    post: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      limitBodySymbols: 55,
    };
  },
  methods: {
    viewPost() {
      this.$router.push({ path: `/${this.post.id}` });
    },
    viewComments() {
      this.$router.push({ path: `/${this.post.id}#comments` });
    },
    editPost() {
      this.$router.push({ path: `/${this.post.id}?edit=true` });
    }
  }
};
</script>

<style lang="scss">
.article-card {
  padding: 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $--color-disabled;
  border-radius: 0;
  flex-direction: row-reverse;
  @include media-breakpoint-up('md') {
    flex-direction: column;
    border: 1px solid $--color-disabled;
    border-radius: 20px;
  }
  &__image {
    width: 100%;
    max-height: 250px;
    object-fit: contain;
    cursor: pointer;
    padding-left: 0;
    @include media-breakpoint-up('md') {
      flex: 1 0 50%;
      padding-left: 5px;
    }
    img {
      display: block;
      width: 100%;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 0 50%;
    padding: 0 0 14px;
    @include media-breakpoint-up('md') {
      padding: 16px 16px 14px;
      flex: 1 0 auto;
    }
  }
  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 8px;
    cursor: pointer;
  }
  &__text {
    font-size: 17px;
    line-height: 22px;
    color: rgba(60, 60, 67, 0.6);
    margin-bottom: 22px;
    flex: 1 0 auto;
  }
  &__actions {
    display: flex;
  }
  &__comments {
    background: url('../static/comment.svg') 0 0 no-repeat;
    height: 20px;
    padding-left: 32px;
    font-size: 17px;
    line-height: 17px;
    margin-right: 34px;
    cursor: pointer;
    color: rgba(60, 60, 67, 0.6);
  }
  &__edit {
    width: 20px;
    height: 20px;
    background: url('../static/edit.svg') 0 0 no-repeat;
    cursor: pointer;
  }
}
</style>
