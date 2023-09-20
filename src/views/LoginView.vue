<template>
  <div class="container text-center position-absolute top-50 start-50 translate-middle">
    <AlertDanger :error-message="errorResponse.message"></AlertDanger>
    <div class="row justify-content-center ">
      <div class="col col-4">
        <div class="form-floating mb-4 ">
          <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                 @keyup.enter="login">
          <label for="floatingInput">E-posti aadress</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password"
                 @keyup.enter="login">
          <label for="floatingPassword">Salasõna</label>
        </div>
        <div class="mt-2">
          <button @click="login" class="btn btn-primary m-2 " type="button">Logi sisse</button>
          <button @click="registerNewUser" class="btn btn-primary m-2" type="button">Registreeri kasutaja</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import {FILL_MANDATORY_FIELDS} from "@/assets/script/AlertMessage";
import AlertDanger from "@/components/AlertDanger.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";

export default {
  name: "LoginView",
  components: {AlertSuccess, AlertDanger},
  data() {
    return {
      email: '',
      password: '',
      loginResponse: {
        userId: 0,
        roleName: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
    login() {
      this.resetErrorMessage()
      if (this.mandatoryFieldsAreFilled()) {
        this.sendLoginRequest();
      } else {
        this.errorResponse.message = FILL_MANDATORY_FIELDS
      }
    },
    resetErrorMessage() {
      this.errorResponse.message = ''
    },
    resetFields() {
      this.email = ''
      this.password = ''
    },
    mandatoryFieldsAreFilled() {
      return this.email.length > 0 && this.password.length > 0
    },
    registerNewUser() {
      router.push({name: 'registration'})
    },
    sendLoginRequest() {
      this.$http.get("/login", {
            params: {
              email: this.email,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data
        sessionStorage.setItem('userId', this.loginResponse.userId)
        sessionStorage.setItem('email', this.email)
        router.push({name: 'homeRoute'})
      }).catch(error => {
        this.handleError500(error);
        this.errorResponse = error.response.data;
        sessionStorage.setItem('email', this.email)
        this.handleErrorMessage()
      })
    },
    handleError500(error) {
      if (error.response.status === 500) {
        router.push({name: 'errorRoute'})
      }
    },

    handleErrorMessage() {
      setTimeout(() => {
        this.resetErrorMessage()
        this.resetFields();
      }, 2000)
    },
  }
}
</script>
