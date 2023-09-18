<template>
  <div>
    <Modal close-button-name="Sulge" ref="ModalRef">
      <template #header>
        Toote kustutamine
      </template>
      <template #body>
        Kas oled kindel, et soovid toote kustutada?
      </template>
      <template #footer>
        <button>Kustuta toode</button>
      </template>
    </Modal>
  </div>
</template>


<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'DeleteProductModal',
  components: {Modal}
}
</script>


<style scoped>

h2 {
  padding: 20px;
}

button {
  margin: 10px;
}
</style>