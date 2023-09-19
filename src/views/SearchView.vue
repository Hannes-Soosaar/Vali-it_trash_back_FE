<template>
  <div>
    <div>
      <LogoComponent/>
    </div>

<!-- Search bar component -->
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-6">
          <div class="input-group mb-3">
            <input v-model="searchInput" type="text" class="form-control" placeholder="UPC/materjali nimi">
            <button @click="determineSearchCriteria" class="btn btn-outline-secondary" type="button" id="button-addon2">
              Otsi
            </button>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">

<!--This is a new modal component-->

        <div class="col col-6 justify-content-center ">
          <div v-if="materialResponseBody.binName" class="input-group mb-3 justify-content-center"
               :key="materialResponseBody.binColor">

            <div>
              {{searchInput}}
            </div>

            <div>
              {{ materialResponseBody.binName }}
            </div>

            <div>
              {{materialResponseBody.binColor }}
            </div>

            <div>
              {{ materialResponseBody.binRequirements }}
            </div>

          </div>


<!--This is a new  modal componet-->


          <div v-if="upcResponseBody.productId" class="input-group mb-3 justify-content-center"
               :key="upcResponseBody.productName">
            {{ upcResponseBody.productName }}{{ upcResponseBody.productId }}{{ upcResponseBody.materials.flat() }}
          </div>



          <searchResultWithNoMatch :error-response="errorResponse" :search-input="searchInput"/>
        </div>
      </div>
    </div>



  </div>
</template>

<script>

import LogoComponent from "@/views/LogoComponent.vue";
import SearchResultWithNoMatch from "@/components/SearchResultWithNoMatch.vue";


export default {
  name: "SearchView",
  components: {SearchResultWithNoMatch, LogoComponent},

  data() {
    return {
      searchInput: '',


      upcResponseBody:
          {
            productId: 0,
            productName: '',
            productInfo: '',
            imageData: '',
            materials: [
              {
                materialBinColorName: '',
                materialBinName: '',
                materialName: ''
              }
            ]
          },

      materialResponseBody: {
        binName: '',
        binColor: '',
        binRequirements: ''
      },
      errorResponse:
          {
            message: '',
            errorCode: 0
          },

    }
  },

  methods: {

    determineSearchCriteria() {

      this.resetProductId()
      if (this.searchInput.length === 13) {
        this.searchByUpc()
      } else {
        this.searchByMaterialName()
      }
    },
    searchByUpc() {
      this.$http.get("/search/product",
          {
            params: {
              upc: this.searchInput
            }
          }).then(response => {
        this.upcResponseBody = response.data
      }).catch(error => {
// Product not found, email manufacture to get the product added
        this.errorResponse = error.response.data
      })
    },

    searchByMaterialName() {
      this.$http.get("/search/material",
          {
            params: {
              materialName: this.searchInput
            }
          }).then(response => {
        this.materialResponseBody = response.data
      }).catch(error => {
//Material not found, make sure you have typed in the material name correctly.
        this.errorResponse = error.response.data
      })
    },

    resetProductId() {
      this.errorResponse.message=''
      this.upcResponseBody.productId = 0
      this.materialResponseBody.binName = ''
    }

  }// end of methods block


}

</script>

