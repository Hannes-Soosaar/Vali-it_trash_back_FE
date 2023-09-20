<template>

  <div class="container text-start">

    <div class="row justify-content-center">

      <div class="row">

        <table class="table">

          <tbody>

          <tr>
            <td>
              <div>
                <h2 class="row justify-content-around">{{ displaySearchedInput }}</h2>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <h2 class="row justify-content-center">{{ errorResponse.message }}</h2>
              </div>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="d-grid gap 2 row justify-content-end">
      <button type="button"  class="btn btn-danger" @click='sendEmailToManufacturer'>
        <h3>Palu tootjal registreeida enda trash_back lehel</h3>
      </button>
    </div>

  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import ProductImage from "@/views/ProductImage.vue";

export default {
  name: 'searchResultWithNoMatch',
  components: {ProductImage, Modal},

  data() {
    return {
      displaySearchedInput: ''
    }
  },

  props: {
    errorResponse: {},
    searchInput: {}
  },

  methods: {
    setDisplaySearchedInput() {
      this.displaySearchedInput = this.searchInput
    },
//todo: try to get it to work.
    sendEmailToManufacturer(){
      const emailPlaceholder = 'infor@newcompany.com'
      const subject = 'pakendi taaskasutamine'
      const body ='Tere, sooviksin saada teie toote pakendi korrektseks taaskasutamisks infoPalun lisage oma tood trash_back kesonda!'
     window.open(`mailto:${emailPlaceholder}?subject=${encodeURI(subject)}&body${encodeURI(body)}`)
    }

  },
  mounted() {
    this.setDisplaySearchedInput()
  }

}
</script>
