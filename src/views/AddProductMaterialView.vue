<template>
  <div>
    <h2>Materjalide lisamine tootele {{ }}</h2>

    <select v-model="selectedCategoryId" @change="categoryIsSelected" class="form-select">
      <option value="" disabled selected>Materjali tüüp</option>
      <option v-for="category in categories" :value="category.categoryId" :key="category">{{ category.categoryName}} </option>
    </select>
  </div>

  <div>
    <select v-show="selectedCategoryId>0" class="form-select">
      <option value="" disabled selected>Materjalid</option>
      <option v-for="material in materialResponse" :key="material" >{{material.materialName}}</option>
    </select>
  </div>

</template>


<script>
import {useRoute} from "vue-router";

export default {
  name: "AddProductMaterialView",
  data() {
    return {
      selectedCategoryId: 0,
      productId: Number(useRoute().query.productId),
      categories: [
        {
          categoryId: 0,
          categoryName: ''
        }
      ],
      materialResponse:[
        {
          materialId: 0,
          materialName: ''
        }
      ]
    }
  },
  methods: {
    getAllCategories() {
      this.$http.get("/categories")
          .then(response => {

            this.categories = response.data
          })
          .catch(error => {

            const errorResponseBody = error.response.data
          })
    },

    getCategoryMaterials() {
      this.$http.get("/material-names", {
            params: {
              categoryId: this.selectedCategoryId,
            }
          }
      ).then(response => {
        this.materialResponse = response.data
      }).catch(error => {

        const errorResponseBody = error.response.data
      })
    },

    categoryIsSelected(categoryId) {
      categoryId = this.selectedCategoryId
      this.getCategoryMaterials()

    },

  },
  beforeMount() {
    this.getAllCategories()
  },
}
</script>


<style scoped>

</style>