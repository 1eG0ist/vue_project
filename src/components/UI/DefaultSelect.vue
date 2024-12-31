<script>
export default {
  name: "default-select",
  props: {
    modelValue: {type: String},
    options: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  }
}
</script>

<template>
  <select :value="modelValue" @change="changeOption">
    <option class="select-option" disabled value="">Выберите из списка</option>
    <option
        class="select-option"
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
    >{{ opt.name }}</option>
  </select>
</template>

<style scoped>
select {
  border: 1px solid teal;
  background-color: darkcyan;
  border-radius: 10px;
  color: white
}
</style>