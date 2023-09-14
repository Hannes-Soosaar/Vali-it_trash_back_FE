<template>
  <ChangePasswordModal ref="ChangePasswordModalRef"/>
  <ChangeProfileInfoModal ref="ChangeProfileInfoModalRef"/>
  <div class="justify-content-center">
  <h1 class="mt-5">Minu andmed</h1>
  <div class="container w-50 myContainer mt-5">

    <div class="container text-center">
      <div class="row">
        <div class="col">
          Email
        </div>
        <div class="col">
          {{email}}
        </div>
        </div>
        </div>

    <div class="container text-center">
      <div class="row">
        <div class="col">
          Ettevõte
        </div>
        <div class="col">
          {{companyInfo.companyName}}
        </div>
      </div>
    </div>

    <div class="container text-center">
      <div class="row">
        <div class="col">
          Ettevõtte registrikood
        </div>
        <div class="col">
          {{companyInfo.registrationCode}}
        </div>
      </div>
    </div>
    <div class="mt-3 ">
    <button type="button" class="btn m-1 btn-secondary" @click="openChangeProfileModal">Muuda andmeid</button>
    <button type="button" class="btn m-1 btn-secondary" @click="openChangePasswordModal">Muuda parooli</button>
    </div>
  </div>
  </div>
</template>

<script>
import ChangePasswordModal from "@/views/ChangePasswordModal.vue";
import ChangeProfileInfoModal from "@/views/ChangeProfileInfoModal.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";
import {PASSWORD_UPDATED} from "@/assets/script/AlertMessage";

export default {
  name: "ProfileView",
  components: {AlertSuccess, ChangeProfileInfoModal, ChangePasswordModal},
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

    openChangePasswordModal() {
      this.$refs.ChangePasswordModalRef.$refs.ModalRef.openModal()
    },

    openChangeProfileModal() {
      this.$refs.ChangeProfileInfoModalRef.$refs.ModalRef.openModal()
    },

    // handleSuccessMessage() {
    //   this.successMessage = PASSWORD_UPDATED;
    // }
  },

    beforeMount() {
      this.sendGetCompanyInfo()

    }
}
</script>

<style>
.myContainer {
  background-color: lightgray; /* Set the background color to red */
  border-radius: 10px;   /* Round the container's corners */
  padding: 20px;         /* Add some padding for spacing inside the container */
}
</style>


