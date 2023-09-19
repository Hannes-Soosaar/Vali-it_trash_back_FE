<template>
  <div>
    <Modal close-button-name="Sulge" ref="ModalRef">
      <template #header>
        Muuda toote {{ productResponse.productName }} andmeid
      </template>
      <template #body>
        <div>
          <div class="row">
            <div class="col mt-2">
              Toote nimi
            </div>
            <div class="col">
              <input v-model="productRequest.productName" class="m-1">
            </div>
          </div>
          <div class="row">
            <div class="col mt-2">
              UPC
            </div>
            <div class="col">
              <input v-model="productRequest.upc" class="m-1">
            </div>
          </div>
          <div class="row">
            <div class="col mt-2">
              Toote info
            </div>
            <div class="col">
              <input v-model="productRequest.productInfo" class="m-1">
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <button type="button" class="btn btn-secondary" @click="changeProductInfo">Muuda toote andmed</button>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/modal/ChangeProductModal.vue"
import router from "@/router";

export default {
  name: 'ChangeProductInfoModal',
  components: {Modal},
  props: {
    productResponse: {}
  },
  data() {
    return {
      productRequest: {
        productName: '',
        upc: '',
        productInfo: ''
      }
    }
  },
  methods: {

    changeProductInfo() {
      this.$http.put("/products", this.productRequest, {
            params: {
              productId: this.productResponse.productId,
            }
          }
      ).then(response => {
        this.$refs.ModalRef.closeModal()
        this.$emit ('event-show-product-info-changed-success')
      }).catch(error => {
        router.push({name:'errorRoute'})
      })
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