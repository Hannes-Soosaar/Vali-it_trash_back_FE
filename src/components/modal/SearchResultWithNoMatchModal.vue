<template>
  <div>
    <Modal close-button-name="Sulge" ref="ModalRef">

      <template #header>
        <div class="row">
          <div class="col m-3">"{{ searchInput }}"</div>
        </div>
      </template>

      <template #body>
        <div class="row">

          <div class="row">
            <div class="col m-3 ">{{ errorResponse.message }}</div>
          </div>
          <div class="row">
            <div class="col m-3 ">{{ errorResponse.errorCode }}</div>
          </div>
        </div>
      </template>

      <template #footer>



      </template>

    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'searchResultWithNoMatch',
  components: {Modal},

  props: {
    errorResponse: {},
    searchInput: {}
  },

  mounted() {
    if(this.errorResponse.message !== '')
    this.$refs.ModalRef.openModal()
  }

}
</script>
