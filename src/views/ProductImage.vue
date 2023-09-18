<template>

 <img :src="imageDataBase64">

</template>
<script>
export default {
  name: 'ProductImage',
  props: {
    imageDataBase64: String
  }


}
</script>
