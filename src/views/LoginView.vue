<template>
  <div class="container text-center position-absolute top-50 start-50 translate-middle">
    <div class="row justify-content-center ">
      <div class="col col-4">

        <div class="form-floating mb-4 ">
          <input v-model="email"  type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">E-posti aadress</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label  for="floatingPassword">Salasõna</label>
        </div>
        <div class="mt-2">
          <button @click="sendLoginRequest" class="btn btn-primary m-2 " type="button">Logi sisse</button>
          <button class="btn btn-primary m-2" type="button">Registreeri</button>
        </div>

      </div>
    </div>
  </div>
</template>


<script>

import router from "@/router";

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
 //todo: teeme siia login meetodi ja muud vajalikud meetodid

    sendLoginRequest() {
      this.$http.get("/login", {
            params: {
              email: this.email,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data



      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },


  }

}
</script>
