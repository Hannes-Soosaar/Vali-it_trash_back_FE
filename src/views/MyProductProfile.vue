<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <table class="table">
          <tbody>
          <tr>
            <td>mingi info ja pilt</td>
            <td>{{ productId }}</td>
            <td>{{ productName }}</td>
            <td>{{ upc }}</td>
            <td>toote infot oleks ka vaja</td>
            <td>{{ productMaterials.materialName }}</td>
          </tr>
          </tbody>
        </table>
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
      productInfo:String(useRoute().query.productInfo),
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
              productMaterials: this.productMaterials
            }
          }
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        this.productMaterials = response.data
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
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