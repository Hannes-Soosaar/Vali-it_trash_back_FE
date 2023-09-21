<template>
  <DeleteProductModal ref="DeleteProductModalRef"/>
  <ChangeProductInfoModal :product-response="productResponse" ref="ChangeProductInfoModal" @event-show-product-info-changed-success="handleSuccessMessage"/>

  <ChangeProductImageModal ref="ChangeProductImageModal" @event-image-updated = "handleImageSuccessMessage"/>

  <AlertSuccess :success-message="successMessage"/>
  <div class="container text-start" style="border: solid 1px grey; border-radius:20px">
    <div class="row justify-content-center">
      <div class="col col-6">
        <h2>{{ productResponse.productName }}</h2>
        <p>
          UPC: {{ productResponse.upc }}
        </p>
        <p>
          Toote info: {{ productResponse.productInfo }}
        </p>
        <table class="table">
          <tbody>
          <tr>
            <td>
              <h5>Materjalid</h5>
            </td>
            <td>
              <h5>Kategooriad</h5>
            </td>
            <td>
              <h5>Prügikastid</h5>
            </td>
            <td>
              <h5>Värv</h5>
            </td>
          </tr>
          <tr v-for="material in productResponse.materials" :key="productResponse.materials.materialId">
            <td>
              <p>{{ material.materialName }}</p>
            </td>
            <td>
              <p>{{ material.materialCategoryName }}</p>
            </td>
            <td>
              <p>{{ material.materialBinName }}</p>
            </td>
            <td>
              <p>{{ material.materialBinColorName }}</p>
            </td>
          </tr>
          </tbody>
        </table>

        <button class="btn btn-success" type="button" @click="openChangeProductInfoModal">Muuda toote andmeid</button>
        <button class="btn btn-success" type="button" @click="">Muuda toote materjale</button>
        <button @click="openDeleteProductModal" class="btn btn-danger" type="button">Kustuta toode</button>

      </div>
      <div class="col col-6">
        <ProductImage :image-data-base64="productResponse.imageString"/>
        <button class="btn btn-success" type="button" @click="openChangeProductImageModal">Muuda toote pilti</button>
      </div>
    </div>

  </div>
  <div class="d-grid gap-2 d-md-block">
    <button @click="$router.push({name: 'productsRoute'})" class="btn btn-success" type="button">Tagasi toodete
      nimekirja
    </button>
  </div>
</template>


<script>
import {useRoute} from "vue-router";
import DeleteProductModal from "@/components/modal/DeleteProductModal.vue";
import ProductImage from "@/views/ProductImage.vue";
import ChangeProductInfoModal from "@/components/modal/ChangeProductInfoModal.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";
import ChangeProductImageModal from "@/components/modal/ChangeProductImageModal.vue";

export default {
  name: "MyProductProfile",
  components: {ChangeProductImageModal, AlertSuccess, ChangeProductInfoModal, ProductImage, DeleteProductModal},

  data() {
    return {
      productId: Number(useRoute().query.productId),
      successMessage: '',
      productResponse: {
        productId: 0,
        imageString: '',
        productName: '',
        upc: '',
        productInfo: '',
        status: '',
        materials: [
          {
            materialId: 0,
            materialCategoryName: '',
            materialName: ''
          }
        ]
      }
    }
  },
  methods: {

    getProductInfo() {
      this.$http.get("/products/product", {
            params: {
              productId: this.productId
            }
          }
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        this.productResponse = response.data
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        const errorResponseBody = error.response.data
      })
    },

    openDeleteProductModal() {
      this.$refs.DeleteProductModalRef.$refs.ModalRef.openModal()
      this.$refs.DeleteProductModalRef.productId = this.productId
    },

    openChangeProductInfoModal() {
      this.$refs.ChangeProductInfoModal.productRequest.productName = this.productResponse.productName
      this.$refs.ChangeProductInfoModal.productRequest.upc = this.productResponse.upc
      this.$refs.ChangeProductInfoModal.productRequest.productInfo = this.productResponse.productInfo
      this.$refs.ChangeProductInfoModal.$refs.ModalRef.openModal()
    },

    openChangeProductImageModal() {
      this.$refs.ChangeProductImageModal.$refs.ModalRef.openModal()
      this.$refs.ChangeProductImageModal.productId = this.productId
    },

    handleSuccessMessage() {
      this.getProductInfo()
      this.successMessage = 'Toote andmed on muudetud'
      setTimeout(() => {
        this.successMessage = ''
      }, 2000)
    },

    handleImageSuccessMessage() {
      this.getProductInfo()
      this.successMessage = 'Toote pilt on muudetud'
      setTimeout(() => {
        this.successMessage = ''
      }, 2000)
    },


   handleImage(imageDataBase64){
      this.image.imageData = imageDataBase64
   }
  },
  beforeMount() {
    this.getProductInfo()
  },
}
</script>


<style scoped>

h2 {
  padding: 20px;
}

.container{
padding: 50px;
}

button {
  margin: 10px;
}
</style>