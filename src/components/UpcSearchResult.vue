<template>
  <div v-if="upcResponseBody.productId" class="input-group mb-3 justify-content-center"
       :key="upcResponseBody.productName">

    <div>
      {{ searchInput }}
    </div>
    <div>
      {{ upcResponseBody.productName }}
    </div>
    <div>
      {{ upcResponseBody.imageData }}
    </div>
    <div>
      {{ upcResponseBody.productInfo }}
    </div>
    <div>
      {{ upcResponseBody.materials }}
    </div>


  </div>
</template>
<script>
export default {


  name: 'UpcSearchResult',
  props: {
    searchInput: {},
    upcResponseBody: {}
  },

}
</script>