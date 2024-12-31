<script>

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="post">
    <div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Содержание: </strong>{{ post.body }}</div>
    </div>

    <div class="post__btns">
      <default-button @click="$emit('remove', post)">Удалить</default-button>
      <default-button @click="$emit('edit', post)">Редактировать</default-button>
    </div>
  </div>
</template>

<style scoped>
.post {
  padding: 15px;
  background: cadetblue;
  border-radius: 10px;
  border: 2px solid teal;
  margin-top: 10px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.post__btns {
  display: grid;
  grid-template-columns: repeat(3, 0fr);
  gap: 5px; /* Задает пространство между элементами */
}
</style>