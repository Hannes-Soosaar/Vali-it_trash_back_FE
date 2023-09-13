<template>
  <div>
    <Modal close-button-name="Sulge" ref="ModalRef">

      <template #header>
        Parooli muutmine
      </template>

      <template #body>
        <div class="input-group input-group-sm mb-3 ">
          <span class="input-group-text" id="inputGroup-sizing-sm">Kehtiv parool</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>

        <div class="input-group input-group-sm mb-3 ">
          <span class="input-group-text" id="inputGroup-sizing-sm">Uus parool</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>

        <div class="input-group input-group-sm mb-3 ">
          <span class="input-group-text" id="inputGroup-sizing-sm">Uus parool uuesti</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>
      </template>

      <template #footer>
        <button type="button" class="btn btn-secondary">Muuda parooli</button>
      </template>

    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'ChangePasswordModal',
  components: {Modal}

}
</script>