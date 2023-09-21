<template>
  <div>
    <h1>Materjalide lisamine tootele {{ productName }}</h1>


    <div class="container">
      <div class="row justify-content-center">
        <div class="col col-5 text-center">
          <h3>Vali toote kategooria</h3>
          <select v-model="selectedCategoryId" @change="setCategoryIdAndSendRequest"
                  class="form-select custom-select-margin">
            <option value="" selected disabled>Materjali tüüp</option>
            <option v-for="category in categories" :value="category.categoryId" :key="category">
              {{ category.categoryName }}
            </option>
          </select>
        </div>
        <div class="col col-5">
          <h3>Lisa tootele materjal(id)</h3>
          <select v-model="selectedMaterialId" class="form-select custom-select-margin">
            <option value="" selected disabled>Materjalid</option>
            <option v-for="material in materialResponse" :value="material.materialId" :key="material">
              {{ material.materialName }}
            </option>
          </select>
        </div>
        <div class="col col-2 align-content-center ">
          <div class="row">
            <div>
              <button @click="addMaterialToProduct" type="button" class="mybutton">Lisa materjal</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="alert-container">
      <AlertSuccess :success-message="successMessage"/>
      <AlertDanger :error-message="errorResponse.message"/>
    </div>

    <div class="container text-center">
      <div class="row justify-content-center mt-3">
        <div v-show="productMaterials.length>0" class="col col-5 myborder">
          <div>
            <h3>Lisatud materjalid</h3>
          </div>

          <div>
            <table class="table">
              <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Kategooria</th>
                <th scope="col">Materjal</th>
                <th scope="col">Prügikast</th>
                <th scope="col">Prügikasti värv</th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(productMaterial, sequenceCounter) in productMaterials" :key="productMaterial">
                <th scope="row">{{ sequenceCounter + 1 }}</th>
                <td>{{ productMaterial.materialCategoryName }}</td>
                <td>{{ productMaterial.materialName }}</td>
                <td>{{ productMaterial.materialBinName }}</td>
                <td>{{ productMaterial.materialBinColorName }}</td>
                <td class="fingerPointer" @click="deleteAddedMaterial(productMaterial.productMaterialId)">
                  <font-awesome-icon icon="fa-solid fa-trash" size="xl" style="color: #000000;"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import AlertSuccess from "@/components/AlertSuccess.vue";
import AlertDanger from "@/components/AlertDanger.vue";

export default {
  name: "AddProductMaterialView",
  components: {AlertDanger, AlertSuccess},
  data() {
    return {
      productName: sessionStorage.getItem('productName'),
      successMessage: '',
      selectedMaterialId: 0,
      selectedCategoryId: 0,
      productId: Number(useRoute().query.productId),
      categories: [
        {
          categoryId: 0,
          categoryName: ''
        }
      ],
      materialResponse: [
        {
          materialId: 0,
          materialName: ''
        }
      ],
      errorResponse: {
        message: '',
        errorCode: 0
      },
      productMaterials: [
        {
          productMaterialId: 0,
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
    getAllCategories() {
      this.$http.get("/categories")
          .then(response => {
            this.categories = response.data
          })
          .catch(error => {
            this.errorResponse = error.response.data
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

    setCategoryIdAndSendRequest(categoryId) {
      categoryId = this.selectedCategoryId
      this.getCategoryMaterials()

    },

    addMaterialToProduct() {
      this.$http.post("/productmaterial", null, {
            params: {
              productId: this.productId,
              materialId: this.selectedMaterialId
            }
          }
      ).then(response => {
        this.displayAddedMaterials()
        this.handleAddedMaterialSuccessMessage()
        this.selectedCategoryId = 0
        this.selectedMaterialId = 0
      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },

    getProductMaterials() {
      this.$http.get("/product-materials", {
            params: {
              productId: this.productId
            }
          }
      ).then(response => {
        this.productMaterials = response.data
      }).catch(error => {

      })
    },

    displayAddedMaterials() {
      this.getProductMaterials()
    },

    deleteAddedMaterial(productMaterialId) {
      this.$http.delete("/product-material", {
            params: {
              productMaterialId: productMaterialId
            }
          }
      ).then(response => {
        this.getProductMaterials()
        this.handleDeletedMaterialDangerMessage()
      }).catch(error => {

      })
    },

    handleAddedMaterialSuccessMessage() {
      this.successMessage = 'Materjal tootele lisatud'
      setTimeout(() => {
        this.successMessage = ''
      }, 2000)
    },

    handleDeletedMaterialDangerMessage() {
      this.errorResponse.message = 'Materjal tootelt eemaldatud'
      setTimeout(() => {
        this.errorResponse.message = '';
      }, 2000)
    },

    productMaterialsAreAdded() {
      if (this.productMaterials.length > 0) {
        return true
      }
    },

  },
  beforeMount() {
    this.getProductMaterials()
    this.getAllCategories()
    this.productMaterialsAreAdded()
  },


}
</script>


<style scoped>

h1 {
  padding: 20px;
}

select {
  padding: 10px;
}

.custom-select-margin {
  margin-left: 20px;
  margin-right: 20px;

}

.myborder {
  border: 1px solid #808080;
  border-radius: 20px;
  padding: 30px;
  margin-top: 50px;
  margin-bottom: 20px;
}

.alert-container {
  height: 40px; /* Adjust the height as needed */
  margin-bottom: 10px; /* Add margin to separate from other content */
}


</style>