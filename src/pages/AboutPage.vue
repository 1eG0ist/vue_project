<script>
export default {
  name: "AboutPage"
}
</script>

<template>
  <div>
    <div>
      <strong>Company</strong>
    </div>
    <div>
      <code>
        let a = 12;
        for (let i = 0; i <= a; i++) {
          console.log(i);
        }
      </code>
    </div>
    <div>
    Abracadabra
    </div>
    <div v-for="buttonNumber in [1,2,3,4,5,6,7,8,9,10]">
      <button>
        {{ buttonNumber }}
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>