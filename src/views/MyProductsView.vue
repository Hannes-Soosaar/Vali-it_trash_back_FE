<template>
  <div>

    <div class="container text-center">
      <div class="row justify-content-center">
        <h1> {{ this.companyName }} tooted </h1>
        <div>
          <button @click="$router.push({name: 'newProductRoute'})"  class="mybutton" type="button">Lisa uus toode</button>
        </div>
        <MyProductsTable :product-profiles="productProfiles"/>
      </div>
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
      companyName: sessionStorage.getItem('companyName'),
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
  margin-top: 30px;
}

h1 {
  margin: 20px;
}

h2 {
  font-size: 20px;
}

button {
  margin: 10px;
}

</style>