<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <h1> Minu tooted </h1>
        <MyProductsTable  :product-profiles="productProfiles"/>
      </div>
    </div>
    <div>
      <button class="btn btn-success" type="button">Lisa toode</button>
    </div>
  </div>

</template>


<script>


import MyProductsTable from "@/components/products/MyProductsTable.vue";

export default {
  name: "MyProductsView",
  components: {MyProductsTable},

  data() {
    return {
      productProfiles: [
        {
          productId: 0,
          imageString: '',
          productName: '',
          upc: '',
          productInfo: '',
          status: '',
          materials: [
            {
              materialId: 0,
              materialCategoryName: '',
              materialName: ''
            }
          ]
        }
      ]
    }
  },

  methods: {

    getProductProfiles() {
      this.$http.get("/products", {
            params: {
              companyId: sessionStorage.getItem('companyId')
            }
          }
      ).then(response => {

        this.productProfiles = response.data

      }).catch(error => {
        this.errorResponse = error.response.data;
      })
    },

  },

  beforeMount() {
    this.getProductProfiles()
  }

}
</script>


<style scoped>

table {
  margin-top: 50px;
}

h1 {
  margin: 20px;
}

button {
  margin: 10px;
}

</style>