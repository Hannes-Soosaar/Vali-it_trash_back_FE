<template>
  <div class="container text-start" style="border: solid 1px grey; border-radius:20px">
    <h2>{{ upcResponseBody.productName }}</h2>

    <div class="container">
      <div class="row">
        <div class="col col-6">
          <table class="table">
            <tbody>
            <tr>
              <td>
                <h5>Materjal</h5>
              </td>
              <td>
                <h5> Konteiner </h5>
              </td>
              <td>
                <h5>Värviga</h5>
              </td>
            </tr>
            <tr v-for="(material,index) in upcResponseBody.materials" :key="index">
              <td>
                <div> {{ material.materialName }}</div>
              </td>
              <td>
                <div> {{ material.materialBinName }}</div>
              </td>
              <td>
                <div> {{ material.materialBinColorName }}</div>
              </td>
            </tr>
            </tbody>
          </table>

        </div>

        <div class="col col-6">
          <ProductImage :image-data-base64="upcResponseBody.imageData"/>
        </div>
      </div>
    </div>
    <div>
     <h5> {{ upcResponseBody.productInfo }}</h5>
    </div>
  </div>
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