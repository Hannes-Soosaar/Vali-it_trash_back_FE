<template>
  <div>
    <div class="row">
      <div class="col">
      </div>
    </div>
    <Modal close-button-name="Sulge" ref="ModalRef">
      <template #header>
      {{ modalHeaderText }}
      </template>
      <template #body>
        <div>
          <div class="row">
            <div class="col mt-2">
              Kehtiv parool
            </div>
            <div class="col">
              <input v-model="updatePasswordRequest.oldPassword" type="password" class="m-1">
            </div>
          </div>
          <div class="row">
            <div class="col mt-2">
              Uus parool
            </div>
            <div class="col">
              <input v-model="updatePasswordRequest.newPassword" type="password" class="m-1">
            </div>
          </div>
          <div class="row">
            <div class="col mt-2">
              Parool uuesti
            </div>
            <div class="col">
              <input v-model="passwordAgain" type="password" class="m-1">
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

const CHANGE_PASSWORD = "Parooli muutmine";
export default {
  name: 'ChangePasswordModal',
  components: {AlertSuccess, AlertDanger, Modal},
  data() {
    return {
      modalHeaderText: CHANGE_PASSWORD,
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
    sendUpdatePasswordRequest () {
      this.$http.patch("/company/password", this.updatePasswordRequest
      ).then(response => {
        this.handleUpdatePasswordSuccess();
      }).catch(error => {
        this.handleUpdatePasswordError(error);
      })
    },

    updatePassword() {
      if (this.passwordAgain === this.updatePasswordRequest.newPassword) {
        this.sendUpdatePasswordRequest();
      } else {
        this.modalHeaderText = 'Paroolid ei kattu'
        setTimeout(() => {
          this.modalHeaderText = CHANGE_PASSWORD;
        }, 2000)
        this.resetPasswordFields()
      }
    },
    handleUpdatePasswordSuccess() {
      this.modalHeaderText = CHANGE_PASSWORD
      this.emitSuccessMessage()
      this.resetPasswordFields()
      this.$refs.ModalRef.closeModal()
    },
    handleUpdatePasswordError(error) {
      this.modalHeaderText = error.response.data.message
      setTimeout(() => {
        this.modalHeaderText = CHANGE_PASSWORD;
        this.resetPasswordFields()
      }, 2000)
    },
    resetPasswordFields() {
      this.updatePasswordRequest.oldPassword = ''
      this.updatePasswordRequest.newPassword = ''
      this.passwordAgain = ''
    },
    emitSuccessMessage() {
      this.$emit('event-show-success-message', PASSWORD_UPDATED)
    }
  },
}
</script>
