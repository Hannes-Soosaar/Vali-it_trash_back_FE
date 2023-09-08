<template>
  <div class="container text-center position-absolute top-50 start-50 translate-middle">

    <div class="mb-5">{{errorResponse.message}}</div>

    <div class="row justify-content-center ">
      <div class="col col-4">

        <div class="form-floating mb-4 ">
          <input v-model="email"  type="email" class="form-control" id="floatingInput" placeholder="name@example.com" @keyup.enter="login">
          <label for="floatingInput">E-posti aadress</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" @keyup.enter="login">
          <label  for="floatingPassword">Salasõna</label>
        </div>
        <div class="mt-2">
          <button @click="login" class="btn btn-primary m-2 " type="button">Logi sisse</button>
          <button class="btn btn-primary m-2" type="button">Registreeri</button>
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

      if(this.mandatoryFieldsAreFilled()){
        this.sendLoginRequest()
      } else {
        this.errorResponse.message = FILL_MANDATORY_FIELDS
      }


    },


    resetErrorMessage(){
      this.errorResponse.message = ''
    },

    mandatoryFieldsAreFilled(){
      return this.email.length > 0 && this.password.length > 0
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
        router.push({name: 'homeRoute'})

      }).catch(error => {
        this.errorResponse = error.response.data
        if(this.errorResponse.errorCode !== INCORRECT_CREDENTIALS){
          this.errorResponse.message = UPSIS_SOMETHING_UNEXPECTED_IS_WRONG
        }
      })
    },

  }

}
</script>
