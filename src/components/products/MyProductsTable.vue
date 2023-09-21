<template>
  <div class="col col-8">
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Toote nimi</th>
        <th scope="col">UPC</th>
      </tr>
      </thead>
      <tbody>
      <tr class="fingerPointer"
          @click="navigateToMyProductProfile(productProfile.productId)"
          v-for="(productProfile, sequenceCounter) in productProfiles"
          :key="productProfile.productId">
        <th>{{ sequenceCounter + 1 }}</th>
        <td>{{ productProfile.productName }}</td>
        <td>{{ productProfile.upc }}</td>
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
    return {}
  },


  methods: {
    navigateToMyProductProfile(productId) {
      router.push({ name: 'productProfileRoute', query: {productId: productId}
      })

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