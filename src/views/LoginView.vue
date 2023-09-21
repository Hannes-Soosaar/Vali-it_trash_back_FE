<template>
  <div>
  <LogoComponent/>
  </div>
  <div>
    <h1>Logi sisse</h1>
  </div>
  <div class="container">
    <div class="row justify-content-center ">
      <div class="col col-4">
        <div class="alert-container mb-4">
          <AlertDanger :error-message="errorResponse.message"></AlertDanger>
        </div>
          <div class="form-floating mb-4 mt-4 ">
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
          <button @click="login" class="mybutton m-3" type="button">Logi sisse</button>
          <button @click="registerNewUser" class="mybutton" type="button">Registreeri kasutaja</button>
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
import LogoComponent from "@/components/LogoComponent.vue";


export default {
  name: "LoginView",
  components: {LogoComponent, AlertSuccess, AlertDanger},
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

<style scoped>
.alert-container {
  height: 50px; /* Adjust the height as needed */
  margin-bottom: 10px; /* Add margin to separate from other content */
  margin-top: 20px;
}
</style>
