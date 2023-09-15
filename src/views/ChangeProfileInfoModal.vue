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
              <input>
            </div>
          </div>

          <div class="row">
            <div class="col">
              Ettevõtte registri nr
            </div>
            <div class="col">
              <input type="number">
            </div>
          </div>

        </div>
      </template>

      <template #footer>
        <button type="button" class="btn btn-secondary" @click="sendChangeProfileRequest">Muuda andmeid</button>
      </template>

    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'ChangeProfileInfoModal',
  components: {Modal},
  methods: {

    sendChangeProfileRequest() {

    },
  }
}
</script>