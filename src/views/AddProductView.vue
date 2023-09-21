<template>

  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-5">

        <h1>Uue toote lisamine</h1>

        <div>
          <AlertDanger :error-message="errorResponse.message"/>

          <div class="form-floating mb-4">
            <input v-model="newProduct.productName" type="text" class="form-control" id="floatingInput"
                   placeholder="Toote nimetus">
            <label for="floatingInput">Toote nimetus</label>
          </div>

          <div class="form-floating mb-3">
            <input v-model="newProduct.upc" type="text" class="form-control" id="floatingInput" placeholder="UPC">
            <label for="floatingInput" class="form-label">UPC</label>
          </div>

          <div class="form-floating mb-3">
          <textarea v-model="newProduct.productInfo" type="text" class="form-control" id="floatingInput"
                    placeholder="Lisainfo"></textarea>
            <label for="floatingInput" class="form-label">Lisainfo</label>
          </div>

          <select v-model="newProduct.status" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Staatus</option>
            <option value="A">Aktiivne</option>
            <option value="D">Mitteaktiivne</option>
          </select>

          <!--      siin on pildi lisamise nupp:-->
          <p>
            <ImageInput @event-emit-base64="setProductImageInputData"/>
          </p>
          <button @click="addNewProduct" type="submit" class="btn btn-primary">Lisa toode</button>
        </div>

      </div>
    </div>
  </div>

</template>


<script>
import {FILL_MANDATORY_FIELDS} from "@/assets/script/AlertMessage";
import ImageInput from "@/components/ImageInput.vue";
import AlertDanger from "@/components/AlertDanger.vue";
import router from "@/router";
import {useRoute} from "vue-router";

export default {
  name: "AddProductView",
  components: {AlertDanger, ImageInput},
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
      }
    }
  },
  methods: {

    addNewProduct() {
      if (this.mandatoryFieldsAreFilled()) {
        this.sendNewProductProfile()
        sessionStorage.setItem('productName', this.newProduct.productName)
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
        this.handleRouterPushToMaterialView(this.productResponse.productId)

      }).catch(error => {
        if (error.response.status === 500) {
          this.errorResponse.message = 'Sellise UPC koodiga toode on juba andmebaasis olemas'
        } else {
          this.errorResponse = error.response.data
        }

      })
    },

    handleRouterPushToMaterialView(productId) {
      router.push({name: 'newProductMaterialRoute', query: {productId: productId}})
    },


    setProductImageInputData(imageDataBase64) {
      this.newProduct.imageData = imageDataBase64
    },

    mandatoryFieldsAreFilled() {
      return this.newProduct.productName.length > 0 && this.newProduct.upc.length > 0 && this.newProduct.status !== ''
    },

    // handleErrorResponse500(error) {
    //   if (error.response.status === 500) {
    //     this.errorResponse.message = 'Selline toode on juba andmebaasis olemas'
    //   }
    // },


  },


}
</script>


<style scoped>
h1 {
  margin: 20px;
}

</style>