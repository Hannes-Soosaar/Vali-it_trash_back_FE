<template>
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
</template>
<script>
import AlertDanger from "@/components/AlertDanger.vue"
import ImageInput from "@/components/ImageInput.vue"

export default {
  name: 'AddProductInput',
  components: {AlertDanger, ImageInput},
  props: {
    addNewProduct: {},
    errorResponse: {},
    newProduct: {},
    setProductImageInputData: {}
  }
}
</script>
<style scoped>
h1 {
  margin: 20px;
}
</style>