<template>

  <div class="container text-start" style="border: solid 1px red; border-radius:20px">

    <div class="row justify-content-center">

      <div class="">

        <table class="table ">

          <tbody>

          <tr class="" style="border: solid 1px blue; border-radius:20px">

            <td>
              <div class="justify-content-center" style="border: solid 1px grey; border-radius:20px">
                <h5 class="row justify-content-around">Materjal</h5>
              </div>

            </td>

            <td>
              <div class="container " style="border: solid 1px grey; border-radius:20px">
                <h5 class="row justify-content-around"> Konteiner </h5>
              </div>
            </td>

            <td>
              <div class="container " style="border: solid 1px grey; border-radius:20px">
                <h5 class="row justify-content-around">Värviga</h5>
              </div>
            </td>

          </tr>

          <tr v-for="(material,index) in upcResponseBody.materials" :key="index" style="border: solid 1px violet;
          border-radius:20px">

            <td>
              <div class="container " style="border: solid 1px grey; border-radius:20px">
                <div class="row justify-content-center"> {{ material.materialName }}</div>
              </div>
            </td>

            <td>
              <div class=" container  justify-content-center" style="border: solid 1px grey; border-radius:20px">
                <div class="row justify-content-center"> {{ material.materialBinName }} </div>
              </div>
            </td>

            <td>
              <div class="container" style="border: solid 1px grey; border-radius:20px">
                <div class="row justify-content-center"> {{ material.materialBinColorName }} </div>
              </div>
            </td>

          </tr>
          </tbody>
        </table>

      </div>

    </div>

    <div class=" container justify-content-center" style="border: solid 1px grey; border-radius:20px">
      <h2 class="row justify-content-center">{{ upcResponseBody.productName }}</h2>
    </div>
      <div class="container" style="border: solid 1px grey; border-radius:20px; color:darkblue">
       <div class="row justify-content-evenly"> {{ upcResponseBody.productInfo }}</div>
      </div>
      <div class=" col  container" style="border: solid 1px grey; border-radius:20px">
        <div class="row m-5"><ProductImage :image-data-base64="upcResponseBody.imageData"/></div>
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