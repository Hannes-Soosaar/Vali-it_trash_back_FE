<template>
  <div>
    <Modal close-button-name="Sulge" ref="ModalRef">
      <template #header>
        Muuda ettevõtte andmeid
      </template>
      <template #body>
        <div class="container text-center">

          <div class="row">
            <div class="col">
              Ettevõte
            </div>
            <div class="col">
              <input v-model="UpdateProfileInfoRequest.name">
            </div>
          </div>

          <div class="row">
            <div class="col">
              Ettevõtte registri nr
            </div>
            <div class="col">
              <input v-model="UpdateProfileInfoRequest.registrationcode">
            </div>
          </div>

        </div>
      </template>

      <template #footer>
        <button type="button" class="btn btn-secondary" @click="updateProfileInfo">Muuda andmeid</button>
      </template>

    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'ChangeProfileInfoModal',
  components: {Modal},
  data() {
    return{
      UpdateProfileInfoRequest:{
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
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        const responseBody = response.data
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        const errorResponseBody = error.response.data
      })
    },


  }
}
</script>