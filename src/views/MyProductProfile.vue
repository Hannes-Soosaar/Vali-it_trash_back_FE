<template>
  <DeleteProductModal ref="DeleteProductModalRef"/>
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

      </div>
      <div class="col col-6">
        <ProductImage :image-data-base64="productResponse.imageString"/>
      </div>
    </div>

  </div>
  <div class="d-grid gap-2 d-md-block">
    <button class="btn btn-success" type="button">Muuda toote andmeid</button>
    <button @click="openDeleteProductModal" class="btn btn-danger" type="button">Kustuta toode</button>
    <button @click="$router.push({name: 'productsRoute'})" class="btn btn-success" type="button">Tagasi toodete
      nimekirja
    </button>
  </div>
</template>


<script>
import {useRoute} from "vue-router";
import DeleteProductModal from "@/views/DeleteProductModal.vue";
import router from "@/router";
import ProductImage from "@/views/ProductImage.vue";

export default {
  name: "MyProductProfile",
  components: {ProductImage, DeleteProductModal},
  data() {
    return {
      productId: Number(useRoute().query.productId),

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

button {
  margin: 10px;
}
</style>