<template>

  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-6">
        <form>
          <div class="form-floating mb-4">
            <label for="floatingInput">Toote nimetus</label>
            <input v-model="newProduct.productName" type="text" class="form-control" id="floatingInput" placeholder="Toote nimetus">
          </div>

          <div class="mb-3">
            <label for="upc" class="form-label">UPC</label>
            <input v-model="newProduct.upc" type="text" class="form-control" id="upc">
          </div>

          <div class="mb-3">
            <label for="additionalInfo" class="form-label">Lisainfo</label>
            <textarea v-model="newProduct.productInfo" type="text" class="form-control" id="additionalInfo"></textarea>
          </div>

          <select v-model="newProduct.status" class="form-select" aria-label="Default select example">
            <option value="" disabled selected>Staatus</option>
            <option value="A">Aktiivne</option>
            <option value="D">Mitteaktiivne</option>
          </select>

          <div class="mb-3">
            <label for="formFile" class="form-label"></label>
            <ImageInput @event-emit-base64="setProductImageInputData"/>
          </div>

          <button @click="addNewProduct" type="submit" class="btn btn-primary">Lisa toode</button>
        </form>
      </div>
    </div>
  </div>

</template>


<script>
import ImageInput from "@/components/ImageInput.vue";

export default {
  name: "AddProductView",
  components: {ImageInput},
  data() {
    return {
      newProduct: {
        companyId: sessionStorage.getItem('companyId'),
        imageData: '',
        productName: '',
        upc: '',
        productInfo: '',
        status: '',
        userId: sessionStorage.getItem('userId')
      }

    }
  },
  methods: {
    addNewProduct() {
      this.$http.post("/products", this.newProduct
      ).then(response => {
        // siin tuleb success message kuvamine

      }).catch(error => {
        //
        const errorResponseBody = error.response.data
      })
    },

    setProductImageInputData(imageDataBase64){
      this.newProduct.imageData = imageDataBase64
    }

  }
}
</script>


<style scoped>

</style>