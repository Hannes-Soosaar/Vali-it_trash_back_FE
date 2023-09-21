<template>
  <DeleteProductModal ref="DeleteProductModalRef"/>
  <ChangeProductInfoModal :product-response="productResponse" ref="ChangeProductInfoModal"
                          @event-show-product-info-changed-success="handleSuccessMessage"/>
  <ChangeProductImageModal ref="ChangeProductImageModal" @event-image-updated="handleImageSuccessMessage"/>
  <AlertSuccess :success-message="successMessage"/>
  <div class="container text-start container-default-style">
    <div class="row justify-content-center">
      <div class="col col-6">
        <div class="custom-background">
          <h2>{{ productResponse.productName }}</h2>
          <hr class="my-3">
          <h3>
            UPC: {{ productResponse.upc }}
          </h3>
          <h3>
            Toote info: {{ productResponse.productInfo }}
          </h3>
          <font-awesome-icon @click="openChangeProductInfoModal" icon="fa-regular fa-pen-to-square"
                             class="fingerPointer" size="lg"
                             style="color: #000000;"/>
        </div>
        <table class="table">
          <tbody>
          <tr>
            <td>
              <h5>Kategooria</h5>
            </td>
            <td>
              <h5>Materjal</h5>
            </td>
            <td>
              <h5>Prügikast</h5>
            </td>
          </tr>
          <tr v-for="material in productResponse.materials" :key="productResponse.materials.materialId">
            <td>
              <p>{{ material.materialCategoryName }}</p>
            </td>
            <td>
              <p>{{ material.materialName }}</p>
            </td>
            <td>
              <p>{{ material.materialBinName }}</p>
            </td>
          </tr>
          </tbody>
        </table>

        <font-awesome-icon @click="navigateToAddMaterials" icon="fa-regular fa-pen-to-square" class="fingerPointer"
                           size="lg"
                           style="color: #000000;"/>


      </div>
      <div class="col col-6">
        <div>
          <ProductImage :image-data-base64="productResponse.imageString"/>
        </div>
        <div>
          <font-awesome-icon @click="openChangeProductImageModal" icon="fa-regular fa-folder-open" class="fingerPointer"
                             size="xl"
                             style="color: #000000;"/>
        </div>

      </div>
    </div>
  </div>
  <button @click="openDeleteProductModal" class="my-red-button" type="button">Kustuta toode</button>
</template>


<script>
import {useRoute} from "vue-router";
import DeleteProductModal from "@/components/modal/DeleteProductModal.vue";
import ProductImage from "@/views/ProductImage.vue";
import ChangeProductInfoModal from "@/components/modal/ChangeProductInfoModal.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";
import ChangeProductImageModal from "@/components/modal/ChangeProductImageModal.vue";
import router from "@/router";

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


    handleImage(imageDataBase64) {
      this.image.imageData = imageDataBase64
    },
    navigateToAddMaterials() {
      router.push({name: 'newProductMaterialRoute', query: {productId: this.productId}})
      sessionStorage.setItem('productName', this.productResponse.productName)
    },
  },
  beforeMount() {
    this.getProductInfo()
  },
}
</script>


<style scoped>


h2 {
  margin-top: 10px;
}

h3 {
  font-size: 18px;
}

h5 {
  color: #7f9179;
}


button {
  margin: 10px;
}

.container-default-style {
  border: solid 1px grey;
  border-radius: 20px;
  padding: 30px;
  margin-top: 50px;
  margin-bottom: 20px;
}

.custom-background {
  background-color: #c9d0c2;
  padding: 10px;
  border-radius: 10px;


}

</style>