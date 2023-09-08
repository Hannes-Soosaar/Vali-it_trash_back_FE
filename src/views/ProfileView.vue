<template>
  <div>
    <h1 class="">Minu andmed</h1>

    <div class="container position-absolute top-50 start-50 translate-middle">
      <div class="row">
        <div class="col">
          Ettevõte
        </div>
        <div class="col">
          {{loginResponse.companyName}}
        </div>
        <div class="row">
        <div class="col">
          Registrikood
        </div>
        <div class="col">
          {{loginResponse.registrationCode}}
        </div>
        </div>

        <div class="row">
          <div class="col">
            e-post
          </div>
          <div class="col">
            {{email}}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ProfileView",
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      email: sessionStorage.getItem('email'),

      loginResponse: {
        companyId: 0,
        companyName: '',
        registrationCode: 0
      }
    }
  },
  methods: {

    sendGetCompanyInfo() {
      this.$http.get("/company/info", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        this.loginResponse = response.data
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        const errorResponseBody = error.response.data
      })
    },
  },
  beforeMount() {
    this.sendGetCompanyInfo()

  }
}
</script>


