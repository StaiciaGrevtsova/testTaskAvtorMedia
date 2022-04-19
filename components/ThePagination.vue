<template>
  <ul class="pagination">
    <li
      class="pagination__item pagination__item--arrow"
      :class="{ 'pagination__item--disabled': currentPage === 1 }"
      @click="$emit('onClickPage', 1)"
    >
      <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.15991 1.41L3.57991 6L8.15991 10.59L6.74991 12L0.749912 6L6.74991 0L8.15991 1.41Z"/>
      </svg>
    </li>

    <template v-for="(item, index) in pagesCountArray">
      <li
        v-if="pagination(item).li"
        :key="index"
        class="pagination__item"
        :class="{ 'pagination__item--active': item === currentPage }"
      >
        <template v-if="pagination(item).page">
          <span
            class="pagination__clicked-area"
            @click="$emit('onClickPage', item)"
          >
            {{ item }}
          </span>
        </template>
        <template v-else>
          <div>
            ...
          </div>
        </template>
      </li>
    </template>
    <li
      class="pagination__item pagination__item--arrow"
      :class="{ 'pagination__item--disabled': currentPage === pagesCount }"
      @click="$emit('onClickPage', pagesCount)"
    >
      <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.840088 1.41L5.42009 6L0.840088 10.59L2.25009 12L8.25009 6L2.25009 0L0.840088 1.41Z" fill="#E2E2E2"/>
      </svg>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ThePagination",
  props: {
    pagesCount: {
      type: Number,
      default() {
        return 1;
      }
    },
    currentPage: {
      type: Number,
      default() {
        return 1;
      }
    },
  },
  data() {
    return {
      activeItemId: '',
      show: '',
      paginationSettings: {
        maxPagesShown: 4,
      },
    }
  },
  computed: {
    pagesCountArray() {
      return Array.from({length: this.pagesCount}, (_, i) => i + 1)
    },
    maxPages() {
      if (!isNaN(this.paginationSettings.maxPagesShown % 2)) {
        if (this.paginationSettings.maxPagesShown % 2 === 0) {
          return this.paginationSettings.maxPagesShown + 1;
        } else return this.paginationSettings.maxPagesShown;
      } else {
        return 5;
      }
    }
  },
  methods: {
    pagination(index) {
      if (index === 1 || index === 2 || index === this.pagesCountArray.length-1 || index === this.pagesCountArray.length) {
        return {
          li: true,
          page: true
        }
      }
      if (this.currentPage === 1) {
        if (index <= this.maxPages - 3) {
          return {
            li: true,
            page: true
          }
        } else if (index === this.maxPages - 2) {
          return {
            li: true,
            page: false
          }
        } else {
          return {
            li: false
          }
        }
      }

      if (index === this.currentPage) {
        return {
          li: true,
          page: true
        }
      } else if (this.currentPage - this.maxPages / 2 + 1 <= 0) {
        if ((index <= this.currentPage + this.maxPages / 2 - 1 + (Math.abs(this.currentPage - this.maxPages / 2 + 1)) && (index >= this.currentPage - this.maxPages / 2 + 1))) {
          return {
            li: true,
            page: true
          }
        } else if (index === this.currentPage + Math.round(this.maxPages / 2) - 1 + (Math.abs(this.currentPage - Math.round(this.maxPages / 2) + 1)) || (index === this.currentPage - Math.round(this.maxPages / 2) + 1)) {
          return {
            li: true,
            page: false
          }
        } else {
          return {
            li: false
          }
        }
      } else if (this.currentPage + this.maxPages / 2 + 1 > this.pagesCountArray.length) {
        if ((index <= this.currentPage + this.maxPages / 2 - 1) && (index >= this.currentPage - this.maxPages / 2 + 1 - (this.currentPage + Math.round(this.maxPages / 2) - this.pagesCountArray.length))) {
          return {
            li: true,
            page: true
          }
        } else if (index === this.currentPage - Math.round(this.maxPages / 2) + 1 - (this.currentPage + Math.round(this.maxPages / 2) - this.pagesCountArray.length)) {
          return {
            li: true,
            page: false
          }
        } else {
          return {
            li: false
          }
        }
      }
      if ((index <= this.currentPage + this.maxPages / 2 - 1) && (index >= this.currentPage - this.maxPages / 2 + 1)) {
        return {
          li: true,
          page: true
        }
      } else if ((index === this.currentPage + Math.round(this.maxPages / 2) - 1) || (index === this.currentPage - Math.round(this.maxPages / 2) + 1)) {
        return {
          li: true,
          page: false
        }
      } else {
        return {
          li: false
        }
      }
    },
  }
}
</script>

<style lang="scss">
.pagination {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  &__item {
    width: 32px;
    height: 32px;
    margin-left: 8px;
    border: 1px solid $--color-disabled;
    border-radius: 4px;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: $--color-primary;
    cursor: pointer;
    path {
      fill: $--color-primary
    }
    &--active,
    &:hover {
      color: $--color-action;
      border-color: $--color-action;
      path {
        fill: $--color-action;
      }
    }
    &--disabled {
      color: $--color-disabled;
      cursor: default;
      &:hover {
        color: $--color-disabled;
        border-color: $--color-disabled;
        path {
          fill: $--color-disabled;
        }
      }
      path {
        fill: $--color-disabled;
      }
    }
    &--arrow {
      padding-top: 5px;
    }
  }
  &__clicked-area {
    display: block;
    cursor: pointer;
    padding: 5px 0 0;
    height: 100%;
  }
}
svg {

}
</style>
