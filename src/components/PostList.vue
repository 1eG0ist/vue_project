<script>
import PostItem from "@/components/PostItem.vue";

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div v-if="posts.length > 0" class="lst">
    <post-item
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @remove="$emit('remove', post)"
      @edit="$emit('edit', post)"
    />
  </div>
  <h2 v-else style="color: red; align-items: center">
    Список Пуст
  </h2>
</template>

<style scoped>
.lst {
  gap: 5px
}
</style>