<template>

  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-5">

        <h1>Uue toote lisamine</h1>
        <AddProductInput :add-new-product="addNewProduct" :error-response="errorResponse" :new-product="newProduct"
                      :set-product-image-input-data="setProductImageInputData"/>

        <div>
          <h2>Materjalide lisamine tootele {{newProduct.productName}}</h2>

          <select class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Materjali tüüp</option>
            <option v-for="category in categories" :key="category" >{{category.categoryName}}</option>
          </select>
        </div>



      </div>
    </div>
  </div>

</template>


<script>
import {FILL_MANDATORY_FIELDS} from "@/assets/script/AlertMessage";
import AddProductInput from "@/views/AddProductInput.vue";

export default {
  name: "AddProductView",
  components: { AddProductInput},
  data() {
    return {
      successMessage: '',
      newProduct: {
        companyId: sessionStorage.getItem('companyId'),
        imageData: '',
        productName: '',
        upc: '',
        productInfo: '',
        status: '',
        userId: sessionStorage.getItem('userId')
      },
      errorResponse: {
        message: '',
        errorCode: 0
      },
      productResponse: {
        productId: 0
      },
      categories: [
        {
          categoryId: 0,
          categoryName: ''
        }
      ]
    }
  },
  methods: {

    addNewProduct() {
      if (this.mandatoryFieldsAreFilled()) {
        this.sendNewProductProfile()
      } else {
        this.errorResponse.message = FILL_MANDATORY_FIELDS
        setTimeout(() => {
          this.errorResponse.message = '';
        }, 2000)
      }
    },


    sendNewProductProfile() {
      this.$http.post("/products", this.newProduct
      ).then(response => {
        this.productResponse = response.data
      }).catch(error => {
        this.errorResponse = error.response.data

      })
    },

    setProductImageInputData(imageDataBase64) {
      this.newProduct.imageData = imageDataBase64
    },

    mandatoryFieldsAreFilled() {
      return this.newProduct.productName.length > 0 && this.newProduct.upc.length > 0 && this.newProduct.status !== ''
    },

    getAllCategories() {
      this.$http.get("/get-all-categories")
          .then(response => {
            // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
            this.categories = response.data
          })
          .catch(error => {
            // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
            const errorResponseBody = error.response.data
          })
    },


  },
  beforeMount() {
    this.getAllCategories()
  }
}
</script>


<style scoped>
h1 {
  margin: 20px;
}
</style>