<template>
  <div>
    <Modal close-button-name="Sulge" ref="ModalRef">

      <template #header>
        Parooli muutmine
      </template>

      <template #body>
<!--        <div class="input-group input-group-sm mb-3 ">-->
<!--          <span class="input-group-text" id="inputGroup-sizing-sm">Kehtiv parool</span>-->
<!--          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">-->
<!--        </div>-->

<!--        <div class="input-group input-group-sm mb-3 ">-->
<!--          <span class="input-group-text" id="inputGroup-sizing-sm">Uus parool</span>-->
<!--          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">-->
<!--        </div>-->

<!--        <div class="input-group input-group-sm mb-3 ">-->
<!--          <span class="input-group-text" id="inputGroup-sizing-sm">Uus parool uuesti</span>-->
<!--          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">-->
<!--        </div>-->

        <div>
          <div class="row">
            <div class="col">
              Kehtiv parool
            </div>
            <div class="col">
              <input type="password">
            </div>
          </div>

          <div class="row">
            <div class="col">
              Uus parool
            </div>
            <div class="col">
              <input type="password">
            </div>
          </div>

          <div class="row">
            <div class="col">
             Parool uuesti
            </div>
            <div class="col">
              <input type="password">
            </div>
          </div>
        </div>



      </template>

      <template #footer>
        <button type="button" class="btn btn-secondary" @click="sendChangePasswordRequest">Muuda parooli</button>
      </template>

    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'ChangePasswordModal',
  components: {Modal},

  data() {
    return{
      userId: sessionStorage.getItem('userId'),
      oldPassword: '',
      newPassword: ''
    }

  },
  methods: {

    sendChangePasswordRequest() {

    },
  }

}
</script>