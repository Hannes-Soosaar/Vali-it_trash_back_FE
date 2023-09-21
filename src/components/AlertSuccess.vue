<template>
  <div v-show="successMessage != null && successMessage.length > 0" class="alert success" role="alert">
    {{ successMessage }}
  </div>
</template>
<script>
export default {
  name: 'AlertSuccess',
  props: {
    successMessage: String
  }
}
</script>

<style>
.success{
  background-color: #b7c4a9;
}
</style>