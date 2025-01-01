<script>
export default {
  name: "NavBar",
}
</script>

<template>
  <div class = "nav-bar">
    <div @click="$router.push('/')" class="app-name"><strong>Name of app</strong></div>
    <button @click="$router.push('/posts')" class="route">Posts</button>
    <button @click="$router.push('/store')" class="route">Store Posts</button>
    <button @click="$router.push('/about')" class="route">About</button>
  </div>
</template>

<style scoped>

.nav-bar {
  height: 60px;
  background-color: darkcyan;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  column-gap: 20px;
  align-items: center;
  justify-content: start;
  padding: 0 0 0 10px;
}

.app-name {
  font-size: 24px;
  color: white;
}

.route {
  color: white;
  background-color: transparent;
  border: none;
}

</style>