const PAGE_LIMIT = 9;

export const state = () => {
  return {
    pageLimit: PAGE_LIMIT,
    pagesCount: 1,
    postList: [],
    currentPost: null,
    commentsList: [],
  };
};

export const actions = {
  async getPostList ({ state, commit }, { page, searchQuery } = { page: 1, searchQuery: ''}) {
    console.log(searchQuery);
    const { data, headers } = await this.$axios.get(`posts?_embed=comments&_page=${page}&_limit=${state.pageLimit}&q=${searchQuery}`);
    const postsTotalCount = headers['x-total-count'];
    commit('SET_LIST', data);
    commit('SET_PAGES_COUNT', postsTotalCount);
  },
  async getPostById ({ commit }, id) {
    const currentPost = await this.$axios.$get(`posts/${id}`);
    commit('SET_CURRENT_POST', currentPost);
  },
  async getCommentsList ({ commit }, id) {
    const commentsList = await this.$axios.$get(`posts/${id}/comments`);
    commit('SET_COMMENTS_LIST', commentsList);
  },
  async editPost ({ commit }, { id, body }) {
    return await this.$axios.$patch(`posts/${id}`, {
      body,
    });
  },
};

export const getters = {
  postList(state) {
    return state.postList;
  },
  pagesCount(state) {
    return state.pagesCount;
  },
  currentPost(state) {
    return state.currentPost;
  },
  commentsList(state) {
    return state.commentsList;
  },
};

export const mutations = {
  SET_LIST(state, data) {
    state.postList = data;
  },
  SET_CURRENT_POST(state, data) {
    state.currentPost = data;
  },
  SET_COMMENTS_LIST(state, data) {
    state.commentsList = data;
  },
  SET_PAGES_COUNT(state, data) {
    state.pagesCount = Math.ceil(data / state.pageLimit);
  },
};
