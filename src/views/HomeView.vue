<template>

  <div class="custom-message-style mb-5">
    <h1> Tere, {{ companyInfo.companyName }}! </h1>
    <p> ettvõtte logo? andmebaasis pole</p>
  </div>
  <div class="container position-absolute top-50 start-50 translate-middle">
    <div class="row">
      <div class="col-sm-6 bg-success">
        <button @click="$router.push({name: 'productsRoute'})"  class="btn btn-custom-size btn-block mb-sm-4">
          <font-awesome-icon icon="fa-solid fa-suitcase" size="xl" style="color: #000000;" />
          Minu tooted</button>
      </div>
      <div class="col-sm-6 bg-info">
        <button @click="$router.push({name: 'addProductProfileRoute'})" class="btn btn-custom-size btn-block mb-sm-4">
          <font-awesome-icon icon="fa-solid fa-circle-plus" size="xl" style="color: black;" /> Lisa toode</button>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6 bg-danger">
        <button @click="$router.push({name: 'profileRoute'})" class="btn btn-custom-size btn-block m-sm-2">
          <font-awesome-icon icon="fa-solid fa-gear" size="xl" style="color: #000000;" /> Muuda kasutaja andmeid</button>
      </div>
      <div class="col-sm-6 bg-warning">
        <button @click="$router.push({name: 'helpRoute'})" class="btn btn-custom-size btn-block m-sm-2">
          <font-awesome-icon icon="circle-question" size="xl" style="color: black;" /> Abi</button>
      </div>
    </div>
  </div>
</template>


<script>
import router from "@/router";

export default {
  name: "HomeView",
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      companyInfo: {
        companyId: 0,
        companyName: '',
        registrationCode: 0
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },


  methods: {

    getCompanyInfo() {
      this.$http.get("/company/info", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.companyInfo.companyId = response.data.companyId
        this.companyInfo.companyName = response.data.companyName
        sessionStorage.setItem('companyId', this.companyInfo.companyId)
        sessionStorage.setItem('companyName', this.companyInfo.companyName)
      }).catch(error => {
        this.errorResponse = error.response.data.companyId

      })
    },
  },
  beforeMount() {
    this.getCompanyInfo()

  }
}
</script>


<style scoped>

h1 {
  margin: 20px;
}

.btn-custom-size {
  width: 550px;
  height: 120px;
  padding: 20px;
  font-size: 15pt;
  text-align: left;
  background-color: #bdbdbd;
  color: black;
  border: 1px solid #bdbdbd;
  font-family: Tahoma, serif;
  transition: transform 0.1s, font-size 0.1s;
  border-radius: 30px;
  transform-origin: center center;
}

.btn-custom-size span {
  transition: font-size 0.1s; /* Add a smooth transition effect for font size */
}

.btn-custom-size:hover span {
  font-size: 1.05em; /* Increase the font size slightly on hover */
}


.btn-custom-size:hover {
  background-color: #eeeeee;
  color: black; /* teksti värv */
  border-color: #bdbdbd;
  transform: scale(1.005);
  font-size: 17pt;
  box-shadow: black;
}

.custom-message-style {
  font-family: Tahoma, serif;;
}

@media (max-width: 768px) {
  .btn-custom-size {
    width: 400px; /* Allow the width to be determined by content */
    height: 90px; /* Allow the height to be determined by content */
    font-size: 16px; /* Adjust font size for smaller screens */
    margin: 5px;
    /* Other responsive styles */
  }
}
</style>