<template>
  <DeleteProductModal ref="DeleteProductModalRef"/>
  <div class="container text-start" style="border: solid 1px grey; border-radius:20px">
    <div class="row justify-content-center">
      <div class="col col-6">
        <h2>{{ productName }}</h2>
        <p>
          UPC: {{ upc }}
        </p>
        <table class="table">
          <tbody>
          <tr>
            <td>
              <h5>materjalid</h5>
            </td>
            <td>
              <h5>kategooriad</h5>
            </td>
            <td>
              <h5>prügikastid</h5>
            </td>
            <td>
              <h5>värv</h5>
            </td>
          </tr>
          <tr v-for="productMaterial in productMaterials" :key="productMaterial.materialName">
            <td>
              <p>{{ productMaterial.materialName }}</p>
            </td>
            <td>
              <p>{{ productMaterial.materialCategoryName }}</p>
            </td>
            <td>
              <p>{{ productMaterial.materialBinName }}</p>
            </td>
            <td>
              <p>{{ productMaterial.materialBinColorName }}</p>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
      <div class="col col-6">
        <ProductImage :image-data-base64="image.imageData"/>
      </div>
    </div>

  </div>
  <div class="d-grid gap-2 d-md-block">
    <button class="btn btn-success" type="button">Muuda toote andmeid</button>
    <button  @click="openDeleteProductModal"  class="btn btn-danger" type="button">Kustuta toode</button>
    <button @click="$router.push({name: 'productsRoute'})" class="btn btn-success" type="button">Tagasi toodete nimekirja</button>
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
      productName: String(useRoute().query.productName),
      upc: String(useRoute().query.upc),
      productInfo: String(useRoute().query.productInfo),
      productMaterials: [
        {
          materialCategoryName: '',
          materialBinColorName: '',
          materialBinName: '',
          materialBinRequirements: '',
          materialName: ''
        }
      ],
      image: {
        imageData: ''
      },
    }
  },
  methods: {
    getProductMaterials() {
      this.$http.get("/product-materials", {
            params: {
              productId: Number(useRoute().query.productId)
            }
          }
      ).then(response => {
        this.productMaterials = response.data
      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },


    getProductImage() {
      this.$http.get("/products/product-get-image", {
            params: {
              productId: Number(useRoute().query.productId)
            }
          }
      ).then(response => {
        this.image = response.data
      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },

    openDeleteProductModal() {
      this.$refs.DeleteProductModalRef.$refs.ModalRef.openModal()
      this.$refs.DeleteProductModalRef.productId = this.productId
    },


  },
  beforeMount() {
    this.getProductMaterials()
    this.getProductImage()
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