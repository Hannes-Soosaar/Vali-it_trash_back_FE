<template>
  <div v-if="errorResponse.message" class="input-group mb-3 justify-content-center"
       :key="errorResponse.message">
    <div class="row">
      <div class="row">
        <div class="col m-3">"{{ searchInput }}"</div>
      </div>
      <div class="row">
        <div class="col m-3 ">{{ errorResponse.message }}</div>
      </div>
      <div class="row">
        <div class="col m-3 ">{{ errorResponse.errorCode }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'searchResultWithNoMatch',
  props: {
    errorResponse: {},
    searchInput: {}
  }
}
</script>