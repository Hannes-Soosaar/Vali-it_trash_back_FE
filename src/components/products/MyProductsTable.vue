<template>
  <div class="col col-8">
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
export default {
  name: 'MyProductsTable',
  props: {
    counterValue: {},
    productProfiles: {}
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