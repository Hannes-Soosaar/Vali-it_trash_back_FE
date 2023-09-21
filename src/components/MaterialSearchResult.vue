<template>
  <h2>{{ searchedCriteria.toUpperCase() }}</h2>
  <div class="container myborder backgroundColor text-center">
    <h3 class="mt-2"> {{ materialResponseBody.binRequirements }}</h3>
  </div>
  <h3>{{ searchedMaterialName }} </h3>
    <div class=" col container mt-3">
      <div class="row m-1">
        <img v-if=" searchedMaterialName === 'Plast- ja metallpakendi konteiner' " src="../assets/plastpakendite.jpeg"
             alt="No image to show "/>
        <img v-else-if=" searchedMaterialName === 'Biojäätmete konteiner' " src="../assets/Biojäätmed.jpg" alt="No image to show "/>
        <img v-else-if=" searchedMaterialName === 'Olmeprügi konteiner' " src="../assets/olmeprygi.jpg" alt="No image to show "/>
        <img v-else-if=" searchedMaterialName === 'Klaaspakendi konteiner' " src="../assets/klaaspakend-pakendimaterjal-02.webp" alt="No image to show "/>
        <img v-else-if=" searchedMaterialName === 'Papp- ja paberpakendi konteiner' " src="../assets/papjapaber.jpeg" alt="No image to show "/>
        <img v-else src="../assets/sadcat.jpg" alt="No image to show "/>
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

<style>
.myborder {
  border: 1px solid #808080;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;

}
.backgroundColor {
  background-color: #C2CFB2; /* or any other color you prefer */
}
</style>