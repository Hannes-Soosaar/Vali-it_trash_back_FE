<template>

  <div class="container text-start  ">

    <div class="row justify-content-center">
      <div class="">
        <div class=" container  justify-content-center">

          <table class="table">

            <tr>
              <td>
                <div class="container">
                  <h1>
                    <div class="row justify-content-center fw-bold">
                      {{ searchedCriteria.toUpperCase() }}
                    </div>
                  </h1>
                </div>
              </td>

            </tr>
            <tr>
              <td>
                <div class="container">
                  <h1>
                    <div class="row  justify-content-center fw-bold">
                       {{ searchedMaterialName }}
                    </div>
                  </h1>
                </div>
              </td>
            </tr>

          </table>

          <div class="container mb-1 mt-1">
            <h4>
              <div class="row container m-2"> {{
                  materialResponseBody.binRequirements
                }}
              </div>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <div class=" col  container">
      <div class="row m-5">
        <img v-if=" searchedMaterialName === 'Plast- ja metallpakend' " src="../assets/plastpakendite.jpeg"
             alt="No image to show "/>
        <img v-else-if=" searchedMaterialName === 'Biojäätmed' " src="../assets/Biojäätmed.jpg" alt="No image to show "/>
        <img v-else-if=" searchedMaterialName === 'Olmeprügi' " src="../assets/olmeprygi.jpg" alt="No image to show "/>
        <img v-else-if=" searchedMaterialName === 'Klaaspakend' " src="../assets/klaaspakend-pakendimaterjal-02.webp" alt="No image to show "/>
        <img v-else-if=" searchedMaterialName === 'Papp- ja paberpakendi' " src="../assets/papjapaber.jpeg" alt="No image to show "/>
        <img v-else src="../assets/sadcat.jpg" alt="No image to show "/>
      </div>
    </div>
  </div>

</template>

<script>
import ProductImage from "@/views/ProductImage.vue";

export default {
  name: 'MaterialSearchResult',
  components: {ProductImage},

  props: {
    materialResponseBody: {},
    searchInput: {}
  },

  data() {
    return {
      searchedCriteria: '',
      searchedMaterialName: '',
      imageNameToDisplay: ''
    }
  },

  methods: {
    setSearchedCriteria() {
      this.searchedCriteria = this.searchInput
    },

    setMaterial() {
      this.searchedMaterialName = this.materialResponseBody.binName
    },
  },

  mounted() {
    this.setSearchedCriteria()
    this.setMaterial()
  }

}


</script>