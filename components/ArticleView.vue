<template>
<div class="article-view">
  <div class="article-view__img-wrapper">
    <img src="@/static/main_image.png" alt="" class="article-view__img">
  </div>
  <h2 class="article-view__title">{{ post.title }}</h2>
  <template v-if="!isEditMode && !isLoading">
    <p class="article-view__body">
      {{ postBody }}
    </p>
    <div class="article-view__edit">
      <a href="#" class="article-view__edit-link" @click.prevent="setEditMode(true)">
        <svg class="article-view__edit-icon" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4374 0C15.0921 0 15.7197 0.26142 16.1781 0.723423L19.279 3.82432C19.7407 4.286 20.0001 4.91217 20.0001 5.56508C20.0001 6.21799 19.7407 6.84416 19.279 7.30584L7.95751 18.6238C7.25902 19.4295 6.2689 19.9245 5.1346 20.0023H0V19.0023L0.00324765 14.7873C0.0884382 13.7328 0.578667 12.7523 1.3265 12.0934L12.6954 0.724628C13.1564 0.26083 13.7834 0 14.4374 0ZM5.06398 18.0048C5.59821 17.967 6.09549 17.7184 6.49479 17.2616L14.0567 9.69972L10.3023 5.94519L2.6961 13.5496C2.29095 13.9079 2.04031 14.4092 2 14.8678V18.0029L5.06398 18.0048ZM11.7167 4.53115L15.4709 8.2855L17.8648 5.89162C17.9514 5.80502 18.0001 5.68756 18.0001 5.56508C18.0001 5.4426 17.9514 5.32514 17.8648 5.23854L14.7611 2.13486C14.6755 2.04855 14.5589 2 14.4374 2C14.3158 2 14.1992 2.04855 14.1136 2.13486L11.7167 4.53115Z" fill="black"/>
        </svg> Редактировать текст
      </a>
    </div>
  </template>
  <template v-else>
    <textarea v-model="postBody" class="article-view__textarea" :disabled="isLoading"></textarea>
    <div class="article-view__actions">
      <button class="article-view__button" :disabled="isLoading" @click="saveChanges">Сохранить изменения</button>
      <button class="article-view__button article-view__button--outline" :disabled="isLoading" @click="cancelEdit">Отменить</button>
    </div>
  </template>
</div>
</template>

<script>
export default {
  name: "ArticleView",
  props: {
    post: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      postBody: '',
      isLoading: false,
    }
  },
  computed: {
    isEditMode() {
      const editState = (this.$route.query.edit === 'true');
      return editState || false;
    }
  },
  watch: {
    loading(newValue) {
      this.isLoading = newValue;
    },
  },
  watchQuery: ['edit'],
  mounted() {
    this.postBody = this.post.body;
  },
  methods: {
    saveChanges() {
      this.setEditMode(false);
      this.$emit('onSave', this.post.id, this.postBody);
    },
    cancelEdit() {
      this.setEditMode(false);
      this.postBody = this.post.body;
    },
    setEditMode(state) {
      this.$router.push({ query: { edit: state }});
    },
  }
}
</script>

<style lang="scss">
.article-view {
  &__img-wrapper {
    margin: 0 -16px 25px;
    @include media-breakpoint-up('md') {
      margin: 0 0 25px;
    }
  }
  &__img {
    width: 100%;
  }
  &__title {
    font-weight: 700;
    font-size: 34px;
    line-height: 46px;
    letter-spacing: -0.02em;
    padding-bottom: 30px;
    border-bottom: 1px solid $--color-disabled;
    margin-bottom: 30px;
  }
  &__body {
    font-size: 18px;
    line-height: 30px;
    color: rgba(60, 60, 67, 0.6);
    padding: 0;
    margin-bottom: 32px;
  }
  &__edit {
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    letter-spacing: 0.5px;
  }
  &__edit-link {
    color: $--color-action;
    text-decoration: none;
  }
  &__edit-icon {
    margin-right: 22px;
    vertical-align: middle;
    path {
      fill: $--color-action;
    }
  }
  &__textarea {
    padding: 20px 20px 40px;
    width: 100%;
    max-height: 324px;
    background: #FFFFFF;
    border: 1px solid #D1D1D6;
    border-radius: 8px;
    font-family: Manrope, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    &:disabled {
      background: #f6f6f6;
    }
  }
  &__actions {
    margin-top: 30px;
  }
  &__button {
    background: $--color-action;
    border: 1px solid $--color-action;
    border-radius: 5px;
    margin-right: 0;
    margin-bottom: 15px;
    height: 50px;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    padding: 14px 20px;
    width: 100%;
    max-width: 325px;
    cursor: pointer;
    @include media-breakpoint-up('xl') {
      margin-right: 30px;
      margin-bottom: 0;
    }
    &:disabled {
      background-color: $--color-disabled;
      border-color: $--color-disabled;
    }
    &--outline {
      background: #FFFFFF;
      border: 1px solid $--color-action;
      color: $--color-action;
      &:disabled {
        background-color: #ffffff;
        border-color: $--color-disabled;
        color: $--color-disabled;
      }
    }
  }
}
</style>
