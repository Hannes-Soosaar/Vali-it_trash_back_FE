<template>
  <div class="container text-center position-absolute top-50 start-50 translate-middle">
    <div>{{ errorResponse.message }}</div>
    <div class="row justify-content-center ">
      <div class="col col-4">

        <div class="form-floating mb-4 ">
          <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">E-posti aadress</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Salasõna</label>
        </div>
        <div class="mt-2">
          <button @click="login" class="btn btn-primary m-2 " type="button">Logi sisse</button>
          <button @click="registerNewUser" class="btn btn-primary m-2" type="button">Registreeri</button>
        </div>

      </div>
    </div>
  </div>
</template>


<script>

import router from "@/router";
import {FILL_MANDATORY_FIELDS, UPSIS_SOMETHING_UNEXPECTED_IS_WRONG} from "@/assets/script/AlertMessage";
import {INCORRECT_CREDENTIALS} from "@/assets/script/ErrorCode";

export default {
  name: "LoginView",
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

    mandatoryFieldsAreFilled() {
      return this.email.length > 0 && this.password.length > 0
    },

    registerNewUser() {
      router.push({name: 'registration'})
    }
    ,

    resetErrorMessage() {
      this.errorResponse.message = ''
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
        alert(this.loginResponse)

      }).catch(error => {
        this.errorResponse = error.response.data
        localStorage.setItem('email',this.email)


        if (this.errorResponse.errorCode !== INCORRECT_CREDENTIALS) {
          this.errorResponse.message = UPSIS_SOMETHING_UNEXPECTED_IS_WRONG
        }

      })
    }
    ,


  }



}
</script>
