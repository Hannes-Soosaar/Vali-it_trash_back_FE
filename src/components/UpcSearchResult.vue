<template>

  <div class="container text-start" style="border: solid 1px grey; border-radius:20px">
    <div class="row justify-content-center">
      <div class="col col-6">

        <h2>{{ upcResponseBody.productName }}</h2>
        <table class="table">
          <tbody>
          <tr>
            <td>
              <h5>materjal</h5>
            </td>
            <td>
              <h5>Kontinerisse</h5>
            </td>
            <td>
              <h5>Värviga</h5>
            </td>
          </tr>
          <tr v-for="(material,index) in upcResponseBody.materials" :key="index">
            <td>
              <p>{{ material.materialName }}</p>
            </td>
            <td>
              <p>{{ material.materialBinName }}</p>
            </td>
            <td>
              <p>{{ material.materialBinColorName }}</p>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
      <div class="col col-6">
        <p><ProductImage :image-data-base64="upcResponseBody.imageData"/></p>
      </div>
    </div>

  </div>
  <div class="d-grid gap-2 d-md-block">
  </div>
  <!--  <div v-if="upcResponseBody.productId" class="input-group mb-3 justify-content-center"-->
  <!--       :key="upcResponseBody.productName">-->

  <!--    <div>-->
  <!--      {{ searchInput }}-->
  <!--    </div>-->
  <!--    <div>-->
  <!--      {{ upcResponseBody.productName }}-->
  <!--    </div>-->
  <!--    <div>-->
  <!--      {{ upcResponseBody.imageData }}-->
  <!--    </div>-->
  <!--    <div>-->
  <!--      {{ upcResponseBody.productInfo }}-->
  <!--    </div>-->
  <!--    <div>-->
  <!--      {{ upcResponseBody.materials }}-->
  <!--    </div>-->


  <!--  </div>-->
</template>
<script>


import ProductImage from "@/views/ProductImage.vue";

export default {


  name: 'UpcSearchResult',
  components: {ProductImage},
  props: {
    searchInput: {},
    upcResponseBody: {}
  },

}
</script>