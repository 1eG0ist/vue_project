<template>
  <div class="app">
    <nav-bar style="margin-top: 0; margin-right: 0"/>
    <router-view class="router-view"/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {NavBar},
}
</script>

<style>
* {
  margin: 0;
  padding-right: 2px;
  padding-left: 2px;
  box-sizing: border-box;
}

.app {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.router-view {
  padding: 20px;
}
</style>