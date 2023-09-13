<template>
  <div>
    <h1 class="">Minu andmed</h1>

      <ChangePasswordModal/>

    <div class="container position-absolute top-50 start-50 translate-middle">
      <div class="row justify-content-center">
        <div class="col col-3">
          Ettevõte
        </div>
        <div class="col col-3">
          {{ companyInfo.companyName }}
        </div>
        <div class="row justify-content-center">
        <div class="col-3">
          Registrikood
        </div>
        <div class="col col-3">
          {{ companyInfo.registrationCode }}
        </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-3">
            e-post
          </div>
          <div class="col-3">
            {{email}}
          </div>
        </div>

        <div class="row justify-content-center m-5">
          <div class="col-3">
            <button type="button" class="btn btn-secondary">Muuda andmeid</button>
          </div>
          <div class="col-3">
            <button type="button" class="btn btn-secondary">Muuda parooli</button>
          </div>
        </div>


      </div>
    </div>



  </div>
</template>

<script>
import ChangePasswordModal from "@/views/ChangePasswordModal.vue";

export default {
  name: "ProfileView",
  components: {ChangePasswordModal},
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      email: sessionStorage.getItem('email'),

      companyInfo: {
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
        this.companyInfo = response.data
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


