<template>
<div class="post">
  <article-view :post="post" :loading="loadingText" @onSave="editPost" />
  <div v-if="errorMessage" class="post__error">{{ errorMessage }}</div>
  <comments-list id="comments" class="post__comments" :comments-list="comments" />
</div>
</template>

<script>
export default {
  async asyncData({ store, error, params }) {
    try {
      await store.dispatch('post/getPostById', params.post_id);
    } catch (e) {
      error({ statusCode: e.status, message: 'Нет такой статьи' });
    }

    try {
      await store.dispatch('post/getCommentsList', params.post_id);
    } catch (e) {
      error({ statusCode: e.status, message: 'Что-то пошло не так' });
    }
  },
  data() {
    return {
      errorMessage: '',
      loadingText: false,
      newPostBody: '',
    }
  },
  computed: {
    post() {
      return this.$store.getters['post/currentPost'];
    },
    comments() {
      return this.$store.getters['post/commentsList'];
    },
  },
  methods: {
    async editPost(id, body) {
      this.loadingText = true;
      try {
        await this.$store.dispatch('post/editPost', {
          id,
          body,
        });
      } catch (e) {
        this.errorMessage = 'Не удалось сохранить измененияя';
      } finally {
        this.loadingText = false;
      }
    }
  }
}
</script>

<style lang="scss">
.post {
  &__comments {
    margin-top: 32px;
  }
  &__error {
    color: $--color-error;
  }
}
</style>
