<template>
<div>
  <div class="container text-center">
    <div class="row">
      <div class="col">

        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Toote nimetus</th>
            <th scope="col">UPC</th>
            <th scope="col">Materjal</th>
            <th scope="col">Prügikasti nimi</th>
            <th scope="col">Prügikasti värv</th>
            <th scope="col">Prügikasti värv</th>
            <th scope="col">Lisainfo</th>
            <th scope="col">Staatus</th>
            <th scope="col">Pilt???</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td><font-awesome-icon icon="fa-regular fa-pen-to-square" size="xl" style="color: #000000;" /></td>
            <td><font-awesome-icon icon="fa-solid fa-trash" size="xl" style="color: #000000;" /></td>

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
  name: "MyProductsView"
}
</script>



<style scoped>

table {
  margin-top: 50px;
}

</style>