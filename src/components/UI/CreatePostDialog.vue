<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: "create-post-dialog",
  mixins: [
      toggleMixin
  ]
}
</script>

<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div class="dialog__content" @click.stop>
      {{ $store.getters.getRealLikes }}
      <slot>

      </slot>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  padding: 20px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
}

.dialog__content {
  padding: 20px;
  margin: auto;
  background: white;
  border-radius: 16px;
  min-height: 100px;
  min-width: 300px;
}
</style>