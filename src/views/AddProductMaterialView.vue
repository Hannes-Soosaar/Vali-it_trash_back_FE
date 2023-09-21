<template>
  <div>
    <h1>Materjalide lisamine tootele {{ productName }}</h1>


    <div class="container">
      <div class="row justify-content-center align-items-end">
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

        <div class="col col-2 text-center">
          <div class="row">
            <div>
              <button @click="addMaterialToProduct" type="button" class="mybutton">Lisa materjal</button>
            </div>
          </div>
        </div>

      </div>
      <div class="alert-container">
        <AlertSuccess :success-message="successMessage"/>
        <AlertDanger :error-message="errorResponse.message"/>
      </div>
    </div>



    <div class="container text-center">
      <div class="row justify-content-center mt-3">
        <div v-show="productMaterials.length>0" class="col col-5 custom-table-style">
          <div>
            <h3>Lisatud materjalid</h3>
          </div>

          <div>
            <table class="table">
              <thead>
              <tr class="row-text">
                <th scope="col"></th>
                <th scope="col" class="text-center">Kategooria</th>
                <th scope="col" class="text-center">Materjal</th>
                <th scope="col" class="text-center">Prügikast</th>
                <th scope="col" class="text-center">Prügikasti värv</th>
                <th scope="col" class="text-center"></th>
              </tr>
              </thead>
              <tbody>
              <tr class="row-text" v-for="(productMaterial, sequenceCounter) in productMaterials" :key="productMaterial">
                <td class="text-center">{{ sequenceCounter + 1 }}</td>
                <td class="text-center">{{ productMaterial.materialCategoryName }}</td>
                <td class="text-center">{{ productMaterial.materialName }}</td>
                <td class="text-center">{{ productMaterial.materialBinName }}</td>
                <td class="text-center">{{ productMaterial.materialBinColorName }}</td>
                <td class="fingerPointer" @click="deleteAddedMaterial(productMaterial.productMaterialId)">
                  <font-awesome-icon icon="fa-solid fa-trash" size="xl" style="color: #000000;"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-show="productMaterials.length<1">
          <alert-danger/>
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
      }, 1500)
    },

    handleDeletedMaterialDangerMessage() {
        this.errorResponse.message = 'Materjal tootelt eemaldatud'
        setTimeout(() => {
          this.errorResponse.message = '';
        }, 1500)

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

h3{
  color: #9a9a9a;
}

select {
  padding: 10px;
}

.custom-select-margin {
  margin-left: 20px;
  margin-right: 20px;

}

.custom-table-style {
  border: 1px solid #808080;
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.alert-container {
  height: 40px; /* Adjust the height as needed */
  margin-bottom: 10px; /* Add margin to separate from other content */
  margin-top: 20px;
}

.row-text {
  text-align: center; /* Center align text within rows */
}


</style>