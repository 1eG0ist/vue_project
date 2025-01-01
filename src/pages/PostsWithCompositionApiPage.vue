<template>
  <div>
    <div class="title-bar">
      <h3>Список постов</h3>
      <default-input
          v-model="searchQuery"
          style="width: 50%;"
          v-focus
      />
      <div class="app__btns">
        <default-select v-model="selectedSort" :options="sortOptions"/>
      </div>
    </div>
    <post-list
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
    />
    <div v-else>
      Идет загрузка...
    </div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import CreatePostDialog from "@/components/UI/CreatePostDialog.vue";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import DefaultSelect from "@/components/UI/DefaultSelect.vue";
import DefaultInput from "@/components/UI/DefaultInput.vue";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
  name: "PostsWithCompositionApiPage",
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
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'Название'},
        {value: 'body', name: 'Содержимое'}
      ],
    }
  },
  methods: {

  },
  mounted() {
  },
  computed: {

  },
  setup(props) {
    const { posts, isPostsLoading, totalPages } = usePosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts  } = useSortedAndSearchedPosts(sortedPosts);
    return {
      posts,
      isPostsLoading,
      totalPages,
      selectedSort,
      searchQuery,
      sortedPosts,
      sortedAndSearchedPosts,
    }
  }
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

.pagination {
  background: white;
  padding: 10px 50px 10px 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 10px;
}

.page {
  border-radius: 10px;
  border: 1px solid teal;
  padding: 10px;
}

.current-page {
  border-radius: 10px;
  border: 3px solid teal;
  padding: 10px;
}

.observe {
  height: 20px;
  background: teal;
}
</style>