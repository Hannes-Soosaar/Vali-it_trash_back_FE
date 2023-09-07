
<template>
  <div class="container text-center position-absolute top-50 start-50 translate-middle">
    <div class="row justify-content-center ">
      <div class="col col-4">

        <div class="form-floating mb-4 ">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">E-posti aadress</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Salasõna</label>
        </div>
        <div class="mt-2">
          <button class="btn btn-primary m-2 " type="button">Logi sisse</button>
          <button class="btn btn-primary m-2" type="button">Registreeri</button>
        </div>

        </div>
      </div>
  </div>
</template>


<script>
export default {
  name: "LoginView"
}
</script>
