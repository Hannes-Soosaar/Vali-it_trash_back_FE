<template>
  <div>
  <div>
    <h1>Registreeri kasutaja</h1>
    <AlertSuccess :success-message="successMessage"/>
    <AlertDanger :error-message="errorResponse.message"/>
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
        <input v-model="passwordAgain" type="password" class="form-control" id="floatingInput"
               placeholder="name@example.com">
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
      <button @click="createUser" type="button" class="btn btn-secondary">Registreeri kasutaja</button>
    </div>
  </div>
  </div>
</template>


<script>


import router from "@/router";
import AlertSuccess from "@/components/AlertSuccess.vue";
import AlertDanger from "@/components/AlertDanger.vue";

export default {
  name: "CreateUserView",
  components: {AlertDanger, AlertSuccess},
  data() {
    return {
      passwordAgain: '',
      successMessage: '',
      requestBody:
          {
            email: '',
            password: '',
            companyName: '',
            registrationCode: null
          },
      errorResponse:
          {
            message: '',
            errorCode: 0
          }
    }
  },
  methods: {

    sendPostCompanyRequest() {
      this.$http.post("/company", this.requestBody)
          .then(response => {
                this.handleUserCreateSuccessResponse();
                setTimeout(() => {
                  router.push({name: 'loginRoute'});
                }, 2000)
              }
          ).catch(error => {

        this.handleErrorStatusCode500(error);
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        this.errorResponse = error.response.data;
      })
    },

    createUser() {

      this.resetMessageFields();

      if (!this.passwordsAreSame()) {
        this.errorResponse.message = 'Parool ei ole sama'

      } else if (this.mandatoryFieldsAreFilled()) {
        this.sendPostCompanyRequest()
      } else {
        this.displayFillAllFieldsError();
      }

    },



    resetMessageFields() {
      this.successMessage = ''
      this.errorResponse.message = ''
    }
    ,

    handleUserCreateSuccessResponse() {
      this.successMessage = 'Kasutaja registreeritud'
    }
    ,

    mandatoryFieldsAreFilled() {
      let hasEmail = this.requestBody.email !== '';
      let hasPassword = this.requestBody.password !== '';
      let hasCompanyName = this.requestBody.companyName !== '';
      let hasRegistrationCode = this.requestBody.registrationCode != null;
      return hasEmail &&
          hasPassword &&
          hasCompanyName &&
          hasRegistrationCode

    }
    ,

    handleErrorStatusCode500(error) {
      if (error.response.status === 500) {
        router.push({name: 'errorRoute'})
      }
    }
    ,
    displayFillAllFieldsError() {
      this.errorResponse.message = 'Täida kõik väljad'

      setTimeout(() => {
        this.errorResponse.message = ''
      }, 3000)
    }
    ,

    passwordsAreSame() {
      return this.requestBody.password === this.passwordAgain
    }
    ,
  }
}

</script>