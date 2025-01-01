<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      }
    }
  },

  methods: {
    createPost() {
      this.post.id = Date.now();
      // emit - создает событие, на которое может подписаться родительский элемент
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      }
    },
  }
}
</script>

<template>
  <form @submit.prevent class="post-form">
    <h4>Create post</h4>
    <default-input
        v-model="post.title"
        type="text"
        placeholder="Title"
        v-focus
    />
    <default-input
        v-model="post.body"
        type="text"
        placeholder="Body"
    />
    <default-button
      @click="createPost"
      style="align-self: flex-end"
    >
      Create
    </default-button>
  </form>
</template>

<style scoped>
.post-form {
  gap: 10px
}
</style>