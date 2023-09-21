<template>
  <div>
    <Modal close-button-name="Sulge" ref="ModalRef">
      <template #header>
        Vali uus pilt
      </template>

      <template #body>
        <ImageInput @event-emit-base64="setProductImageInputData"></ImageInput>
      </template>

      <template #footer>
        <button class="btn btn-success" type="button" @click="modifyProductPicture">Muuda pilt</button>
      </template>

    </Modal>

  </div>
</template>
<script>
import Modal from "@/components/modal/ChangeProductModal.vue";
import ImageInput from "@/components/ImageInput.vue";

export default {
  name: 'ChangeProductImageModal',
  components: {Modal, ImageInput},
  data() {
    return {
      productId: '',

      imageRequest: {
        imageData: ''
      }
    }
  },
  methods:{

    modifyProductPicture() {
      this.$http.put("/products/product-image", this.imageRequest, {
            params: {
              productId: this.productId
            }
          }
      ).then(response => {
        // pilt muudetud successmessage
        this.$refs.ModalRef.closeModal()
        this.$emit('event-image-updated')

      }).catch(error => {
        // pildi muutmine eba6nnestus message
      })
    },

    setProductImageInputData(imageDataBase64) {
      this.imageRequest.imageData = imageDataBase64

    },
  }
}
</script>
<style scoped>

h2 {
  padding: 20px;
}

button {
  margin: 10px;
}
</style>