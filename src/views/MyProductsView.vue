<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <h1> Minu tooted </h1>
        <div class="col col-8 bg-warning">

          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Toote nimi</th>
              <th scope="col">UPC</th>
              <th scope="col">Materjalid</th>
              <th scope="col">
                <font-awesome-icon icon="fa-solid fa-trash" size="lg" style="color: #000000;"/>
              </th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="(productProfile, sequenceCounter) in productProfiles" :key="sequenceCounter">
              <th>{{ counterValue + sequenceCounter + 1 }}</th>
              <td>{{ productProfile.productName }}</td>
              <td>{{ productProfile.upc }}</td>
              <td>Placeholder</td>
              <td>
                <div>
                  <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="...">
                </div>
              </td>

            </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  </div>

</template>


<script>


export default {
  name: "MyProductsView",

  data() {
    return {
      counterValue: 0,
      productProfiles: [
        {
          productId: 0,
          imageData: '',
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

    getProductProfile() {
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
    this.getProductProfile()
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

</style>