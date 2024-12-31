<script>
export default {
  name: "default-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="updateInput"/>
</template>

<style scoped>
input {
  width: 100%;
  border-radius: 10px;
  border: 1px solid teal;
  padding: 10px 10px;
  background-color: whitesmoke;
}
</style>