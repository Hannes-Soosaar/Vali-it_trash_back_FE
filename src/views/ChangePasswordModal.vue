<template>
  <div>
    <div class="row">
      <div class="col">
<!--        <AlertDanger :alert-message="errorResponse.message"/>-->

      </div>
    </div>
    <Modal close-button-name="Sulge" ref="ModalRef">
      <template #header>
        Parooli muutmine
      </template>
      <template #body>
        <div>
          <div class="row">
            <div class="col">
              Kehtiv parool
            </div>
            <div class="col">
              <input v-model="updatePasswordRequest.oldPassword" type="password">
            </div>
          </div>
          <div class="row">
            <div class="col">
              Uus parool
            </div>
            <div class="col">
              <input v-model="updatePasswordRequest.newPassword" type="password">
            </div>
          </div>
          <div class="row">
            <div class="col">
              Parool uuesti
            </div>
            <div class="col">
              <input v-model="passwordAgain" type="password">
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <button type="button" class="btn btn-secondary" @click="updatePassword">Muuda parooli</button>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import {PASSWORD_UPDATED} from "@/assets/script/AlertMessage";
import AlertDanger from "@/components/AlertDanger.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";

export default {
  name: 'ChangePasswordModal',
  components: {AlertSuccess, AlertDanger, Modal},

  data() {
    return {
      successMessage: '',
      passwordAgain: '',
      updatePasswordRequest: {
        userId: sessionStorage.getItem('userId'),
        oldPassword: '',
        newPassword: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {


    updatePassword() {
      this.$http.patch("/company/password", this.updatePasswordRequest
      ).then(response => {
        this.handleUpdatePasswordSuccess();
      }).catch(error => {
        this.errorResponse.message = error.response.data.message
        this.handleUpdatePasswordError(error);
      })
    },

    handleUpdatePasswordSuccess() {
      // this.emitSuccessMessage()
      this.successMessage = PASSWORD_UPDATED
      alert(this.successMessage)
      this.$refs.ModalRef.closeModal()


    },

    handleUpdatePasswordError(error) {
      alert(this.errorResponse.message)
      this.resetPasswordFields()
      // this.errorResponse.message = error.response.data.message

    },
    resetPasswordFields() {
      this.updatePasswordRequest.oldPassword = ''
      this.updatePasswordRequest.newPassword = ''
      this.passwordAgain = ''
    },

    // emitSuccessMessage() {
    //   this.$emit('event-show-success-message', PASSWORD_UPDATED)
    // },
  }
}
</script>