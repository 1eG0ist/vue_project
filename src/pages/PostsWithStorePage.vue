<template>
  <div>
    <div class="title-bar">
      <h3>Список постов</h3>
      <default-input
          :model-value="searchQuery"
          @update:model-value="setSearchQuery"
          style="width: 50%;"
          v-focus
      />
      <div class="app__btns">
        <default-button @click="dialogVisible=true">
          Создать пост
        </default-button>
        <default-select
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
            :options="sortOptions"
        />
      </div>
    </div>
    <create-post-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </create-post-dialog>
    <post-list
        :posts="sortedAndFilteredPosts"
        @remove="removeItem"
        @edit="editItem"
        v-if="!isPostsLoading"
    />
    <div v-else>
      Идет загрузка...
    </div>
    <div class="observe" v-intersection="loadPage"/>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import CreatePostDialog from "@/components/UI/CreatePostDialog.vue";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import DefaultSelect from "@/components/UI/DefaultSelect.vue";
import DefaultInput from "@/components/UI/DefaultInput.vue";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: "PostsPage",
  components: {
    DefaultInput,
    DefaultSelect,
    DefaultButton,
    CreatePostDialog,
    PostForm,
    PostList
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadPage: "post/loadPage",
      fetchPosts: "post/fetchPosts",
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    removeItem(post) {
      console.log(post.title + " to del ");
      this.posts = this.posts.filter(p => p.id !== post.id);
    },

    editItem(post) {
      this.$router.push({ path: `/posts/${post.id}` });
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),

    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndFilteredPosts: 'post/sortedAndFilteredPosts',
    })
  },
}
</script>

<style>

.title-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

form {
  display: flex;
  flex-direction: column;
}

.app__btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px
}

.observe {
  height: 20px;
  background: teal;
}
</style>