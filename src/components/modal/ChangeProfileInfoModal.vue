<template>
  <div>
    <Modal close-button-name="Sulge" ref="ModalRef">
      <template #header>
        Ettevõtte andmete muutmine
      </template>
      <template #body>
        <div class="container text-center">
          <div class="row">
            <div class="col mt-1">
              Ettevõte
            </div>
            <div class="col m-1">
              <input v-model="UpdateProfileInfoRequest.name">
            </div>
          </div>
          <div class="row">
            <div class="col mt-1">
              Ettevõtte registrikood
            </div>
            <div class="col m-1">
              <input type="number" v-model="UpdateProfileInfoRequest.registrationcode">
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <button type="button" class="mybutton" @click="updateProfileInfo">Muuda andmeid</button>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
export default {
  name: 'ChangeProfileInfoModal',
  components: {Modal},
  data() {
    return {
      UpdateProfileInfoRequest: {
        userId: sessionStorage.getItem("userId"),
        name: '',
        registrationcode: null
      }
    }
  },
  methods: {
    updateProfileInfo() {
      this.$http.patch("/company/profileInfo", this.UpdateProfileInfoRequest
      ).then(response => {
        this.handleUpdateProfileInfoSuccess();
      }).catch(error => {
        this.handleUpdateProfileInfoError();
      })
    },
    handleUpdateProfileInfoSuccess() {
      this.emitProfileInfoSuccess();
      this.$refs.ModalRef.closeModal()

    },
    handleUpdateProfileInfoError() {
      router.push({name: 'errorRoute'})
    },
    emitProfileInfoSuccess() {
      this.$emit('event-show-profile-success-message')
    },
  }
}
</script>