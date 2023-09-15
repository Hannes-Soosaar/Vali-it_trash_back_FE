<template>
  <div class="col col-8">
    <table class="table table-hover">

      <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">productId</th>
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
      <tr @click="navigateToMyProductProfile(productProfile.productId, productProfile.productName, productProfile.upc)"
          v-for="(productProfile, sequenceCounter) in productProfiles"
          :key="productProfile.productId + '-' + productProfiles.productName + '-' + productProfiles.upc">
        <th>{{ sequenceCounter + 1 }}</th>
        <td>{{ productProfile.productId }}</td>
        <td>{{ productProfile.productName }}</td>
        <td>{{ productProfile.upc }}</td>
        <td><p v-for="(material, index) in productProfile.materials" :key="index">
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
</template>

<script>
import router from "@/router";

export default {
  name: 'MyProductsTable',
  props: {
    productProfiles: {},
  },
  data() {
    return {
    }
  },


  methods: {
    navigateToMyProductProfile(productId, productName, upc) {
      router.push({name: 'productProfileRoute',
        query: {
        productId: productId,
        productName: productName,
        upc: upc
        }})

    }
  },
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