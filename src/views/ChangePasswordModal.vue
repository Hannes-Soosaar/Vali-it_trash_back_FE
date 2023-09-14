<template>
  <div>
    <div class="row">
      <div class="col">
      </div>
    </div>
    <Modal close-button-name="Sulge" ref="ModalRef">
      <template #header :style="{ color: this.errorResponse.message !== '' ? 'red' : 'black' + ' !important' }">
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
      this.successMessage = PASSWORD_UPDATED
      this.emitSuccessMessage()
      this.resetPasswordFields()
      this.$refs.ModalRef.closeModal()
    },
    handleUpdatePasswordError(error) {
      this.resetPasswordFields()
      // this.errorResponse.message = error.response.data.message
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
  computed: {
    modalHeaderText() {
      if (this.errorResponse.message === '') {
        return 'Parooli muutmine'
      } else {
        return 'Vale parool'
      }
    },
  }
}
</script>
