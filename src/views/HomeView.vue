<template>

  <div class="container position-absolute top-50 start-50 translate-middle">
    <div class="row">
      <div class="col-md-6">
        <button class="btn btn-primary btn-custom-size btn-block mb-lg-4">
          <font-awesome-icon icon="fa-solid fa-suitcase" size="xl" style="color: #000000;" /> Vaata/muuda olemasolevaid tooteid</button>
      </div>
      <div class="col-md-6">
        <button class="btn btn-primary btn-custom-size btn-block mb-lg-4">
          <font-awesome-icon icon="fa-solid fa-circle-plus" size="xl" style="color: black;" /> Lisa toode</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <button class="btn btn-primary btn-custom-size btn-block m-2">
          <font-awesome-icon icon="fa-solid fa-gear" size="xl" style="color: #000000;" /> Muuda kasutaja andmeid</button>
      </div>
      <div class="col-md-6">
        <button class="btn btn-primary btn-custom-size btn-block m-2">
          <font-awesome-icon icon="circle-question" size="xl" style="color: black;" /> Abi</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "HomeView"
}
</script>



<style scoped>
.btn-custom-size {
  width: 500px;
  height: 100px;
  padding: 20px 20px;
  font-size: 20px;
  border-radius: 10px;
}

.btn-primary {
  text-align: left;
  background-color: #bdbdbd;
  color: black;
  border-color: #bdbdbd;
  font-family: Arial;
  transition: transform 0.3s;

}
.btn-primary:hover {
  background-color: #dedede;
  color: black;
  border-color: #bdbdbd;
  transform: scale(1.01);
}

</style>