<template>

 <img :src="imageDataBase64" class="img-thumbnail">

</template>
<script>
export default {
  name: 'ProductImage',
  props: {
    imageDataBase64: String
  }


}
</script>


