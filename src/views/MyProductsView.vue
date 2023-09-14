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
              <th>
                <div class="dropdown">
                  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                     aria-expanded="false">
                    Sorteeri
                  </a>

                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Aktiivsed</a></li>
                    <li><a class="dropdown-item" href="#">Mitteaktiivsed</a></li>
                  </ul>
                </div>
              </th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="(productProfile, sequenceCounter) in productProfiles" :key="sequenceCounter">
              <th>{{ counterValue + sequenceCounter + 1 }}</th>
              <td>{{ productProfile.productName }}</td>
              <td>{{ productProfile.upc }}</td>
              <td> <p v-for="(material, index) in productProfile.materials" :key="index">
                    {{ material.materialName }}</p></td>
              <td>
                <div>
                  <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="...">
                </div>
              </td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-success" type="button">Lisa toode</button>
    </div>
  </div>

</template>


<script>


import {request} from "axios";

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

button {
  margin: 10px;
}

</style>