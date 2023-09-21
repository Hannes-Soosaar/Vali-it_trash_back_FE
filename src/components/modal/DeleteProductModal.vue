<template>
  <div>
    <Modal close-button-name="Sulge" ref="ModalRef">
      <template #header>
        Toote kustutamine
      </template>
      <template #body>
        Kas oled kindel, et soovid toote kustutada?
      </template>
      <template #footer>
        <button class="mybutton" @click="deleteProduct">Kustuta toode</button>
      </template>
    </Modal>
  </div>
</template>


<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import {PRODUCT_DELETED} from "@/assets/script/AlertMessage";

export default {
  name: 'DeleteProductModal',
  components: {Modal},
  data() {
    return{
      productId:Number
    }
  },
  methods:{


    deleteProduct() {
      this.$http.delete("/products", {
            params: {
              productId: this.productId
            }
          }
      ).then(response => {
       this.handleDeleteProductSuccess()
      }).catch(error => {
        router.push({name:'errorRoute'})
      })
    },

    handleDeleteProductSuccess() {
      this.$emit('event-show-deleted-product-success-message', PRODUCT_DELETED)
      router.push({name:'productsRoute'})
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