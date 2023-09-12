<template>
  <div>
    <h1>Registreeri kasutaja</h1>
    <div v-show="successMessage != null && successMessage.length > 0" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>
  </div>
  <div class="row justify-content-center ">
    <div class="col col-4">
      <div class="form-floating mb-3">
        <input v-model="requestBody.email" type="email" class="form-control" id="floatingInput"
               placeholder="name@example.com">
        <label for="floatingInput">E-post</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="requestBody.password" type="password" class="form-control" id="floatingInput"
               placeholder="name@example.com">
        <label for="floatingInput">Parool</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Parool uuesti</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="requestBody.companyName" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Ettevõte</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="requestBody.registrationCode" class="form-control" id="floatingInput"
               placeholder="name@example.com">
        <label for="floatingInput">Ettevõtte registrikood</label>
      </div>
      <button @click="this.createUser" type="button" class="btn btn-secondary">Registreeri kasutaja</button>
    </div>

  </div>


</template>


<script>


import router from "@/router";

export default {
  name: "CreateUserView",
  data() {
    return {
      successMessage: '',
      requestBody:
          {
            email: '',
            password: '',
            companyName: '',
            registrationCode: 20
          },
      errorResponse:
          {
            errorMessage: '',
            errorCode: 0
          }
    }
  },
  methods: {
    createUser() {
      if (!this.mandatoryFieldsAreFilled()) {
        this.$http.post("/company", this.requestBody)
            .then(response => {
                  this.handleUserCreateSuccessResponse();
                  setTimeout(() => {
                    router.push({name: 'homeRoute'});
                  }, 2000)
                }
            ).catch(error => {
          this.errorResponse = error.response.data;
        });
      } else {
        alert("Täida kõik väljad")
      }
    },

    handleUserCreateSuccessResponse() {
      this.successMessage = 'Kasutaja registreeritud'
    },

    mandatoryFieldsAreFilled() {
      if (this.requestBody.email != null &&
          this.requestBody.password != null &&
          this.requestBody.companyName !== null &&
          this.requestBody.registrationCode != null) {
        return true
      }
    }
  }
}

</script>


<style scoped>

</style>