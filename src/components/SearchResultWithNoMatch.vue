<template>

  <div class="container text-start">

    <div class="row justify-content-center">

      <div class="row">

        <table class="table">

          <tr>
            <td>
              <div>
                <h2 class="row justify-content-around">{{ displaySearchedInput.toUpperCase() }}</h2>
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

        </table>
      </div>
    </div>

    <div class="d-grid gap 2 row justify-content-center ">
      <button type="button" class="btn-HS-outline btn " @click='sendEmailToManufacturer'>
        <h2 class="m-auto">Palu taaskasutus infot tootjalt
          <font-awesome-icon class="m-auto" icon="fa-solid fa-envelope-open-text" size="l" /></h2>
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
    sendEmailToManufacturer() {
      const emailPlaceholder = 'SISESTA TOOTJA E-POSTI AADRESS'
      const subject = this.displaySearchedInput + ' pakendi sorteerimine'
      const body =
          'Tere, sooviksin saada teie toote '+ this.displaySearchedInput
          +' pakendi sorteerimise kohta infot. Palun lisage '+this.displaySearchedInput+'trash_back keskkonda.'
      window.open(`mailto:${emailPlaceholder}?subject=${encodeURI(subject)}&body
      =${encodeURI(body)}`)
    }

  },
  mounted() {
    this.setDisplaySearchedInput()
  }

}
</script>
