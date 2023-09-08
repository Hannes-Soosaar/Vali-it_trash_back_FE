<template>
  <div>
    <div class="row justify-content-center ">

      <div class=" col-3">
        <div class="form-floating m-2  ">
          <input type="email" class="form-control" placeholder="name@example.com">
          <label for="floatingInput">{{ email }}</label>
        </div>
        <div class="form-floating m-2 ">
          <input type="email" class="form-control" placeholder="parool">
          <label for="floatingInput">parool</label>
        </div>
        <div class="form-floating m-2 ">
          <input type="password" class="form-control" placeholder="parool uuesti">
          <label for="floatingInput">parool uuesti</label>
        </div>
        <div class="form-floating m-2 ">
          <input type="email" class="form-control" placeholder="ettevote">
          <label for="floatingInput">Ettevote</label>
        </div>
        <div class="form-floating m-2 ">
          <input type="email" class="form-control" placeholder="ettevõte reg kood">
          <label for="floatingInput">Reg kood</label>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3 m-2">
        <button @click="test" class="btn btn-primary  m-3 " type="button">Loo kasutaja</button>
        <button @click="test" class="btn btn-primary  m-3 " type="button">Login</button>
      </div>
    </div>

  </div>


</template>


<script>
//todo email must be filled in not only suggested in placeholder
// todo create component from  template contents

import router from "@/router";

export default {
  name: 'RegistrationView',

  data() {
    return {
      email: 'email',
      password: '',
      passwordCheck: '',
      companyName: '',
      companyRegistrationCode: '',
      // all data structure and variable go here.
    }

  },

  methods: {
    test() {
      alert('Test')
    },

    getEmailFromFailedLogin() {
      console.log('Siin')

      try {
        const loginEmail = localStorage.getItem('email')

        if (loginEmail === null || typeof loginEmail ==='undefined'){
          this.email='email'
        }else{
          return this.email = loginEmail
        }
      }
      catch (error) {
        router.push({name: 'errorRoute'})
      }
    }

  },


  beforeMount() {
    this.getEmailFromFailedLogin()
  }


}
</script>

