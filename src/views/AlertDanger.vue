<template>
  <div v-show="errorMessage != null && errorMessage.length > 0" class="alert alert-success" role="alert">
    {{ errorMessage }}
  </div>
</template>
<script>
export default {
  name: 'AlertDanger',
  props: {
    errorMessage: {}
  }
}
</script>