<script>
export default {
  name: "default-button",
}
</script>
<!--При использовании, все что будет навешано на элемент, например @click или style=
будет применено к корневому элементу, например конкретно здесь к button-->
<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 10px 10px;
  background: darkcyan;
  border-radius: 10px;
  border: 1px solid teal;
  color: white;
}
</style>