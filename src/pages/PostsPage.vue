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
        <default-button @click="dialogVisible=true">
          Создать пост
        </default-button>
        <default-select v-model="selectedSort" :options="sortOptions"/>
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
    <!--<div class="pagination">
      <div
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="page"
          :class="{'current-page': page === pageNumber}"
          @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import CreatePostDialog from "@/components/UI/CreatePostDialog.vue";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import axios from "axios";
import DefaultSelect from "@/components/UI/DefaultSelect.vue";
import DefaultInput from "@/components/UI/DefaultInput.vue";

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
      posts: [],
      dialogVisible: false,
      isPostsLoading: true,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'Название'},
        {value: 'body', name: 'Содержимое'}
      ],
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0
    }
  },
  methods: {
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

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: this.page,
            _limit: this.limit
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert("Error" + e.message);
      } finally {
        this.isPostsLoading = false;
      }
    },

    // changePage(newPage) {
    //   this.page = newPage;
    // }

    async loadPage() {
      try {
        this.page += 1;
        console.log("Hekki");
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: this.page,
            _limit: this.limit
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
        console.log(this.posts);
      } catch (e) {
        alert("Error" + e.message);
      }
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() { // возвращается отсортированный массив, не мутируя исходный
      return [...this.posts].sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndFilteredPosts() {
      return this.sortedPosts.filter(post =>
          post.title.includes(this.searchQuery)
          || post.body.includes(this.searchQuery)
      );
    }
  },
  // watch: {
  //   page() {
  //     this.fetchPosts();
  //   }
  // }
  // watch: { // мутирует исходный массив
  //   selectedSort(newValue) { // такое же имя как у переменной selectedSort
  //     this.posts.sort((post1, post2) => {
  //       return post1[newValue]?.localeCompare(post2[newValue]);
  //     })
  //   }
  // }
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