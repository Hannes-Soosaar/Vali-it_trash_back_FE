<template>
  <div class="container text-start" style="border: solid grey">
    <div class="row justify-content-center">
      <div class="col col-5 bg-success">
        <h2 style="background-color: grey">{{ productName }}</h2>
        <p>
          UPC: {{ upc }}
        </p>
        <p>
          Materjalide ja prügikastide info:
        </p>
        <table class="table">
          <tbody>
          <tr v-for="productMaterial in productMaterials" :key="productMaterial.materialName">
            <td>
              <p>{{productMaterial.materialName}}</p>
            </td>
            <td>
              <p>{{productMaterial.materialCategoryName}}</p>
            </td>
            <td>
              <p>{{productMaterial.materialBinName}}</p>
            </td>
          </tr>
          </tbody>
        </table>


      </div>
      <div class="col col-3">
        tere
      </div>
    </div>
  </div>
</template>


<script>
import {useRoute} from "vue-router";

export default {
  name: "MyProductProfile",
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
      ]
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
  },

  beforeMount() {
    this.getProductMaterials()
  }


}
</script>


<style scoped>

</style>