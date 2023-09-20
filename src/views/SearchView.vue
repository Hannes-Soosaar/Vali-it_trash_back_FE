<template>
  <div>
    <div>
      <LogoComponent/>
    </div>

    <!-- Search bar component -->
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-6">
          <div class="input-group mb-5">
            <input v-model="searchInput" type="text" class="form-control" @keyup.enter="determineSearchCriteria"
                   placeholder="Otsing triipkoodi või materjali nimejärgi">
            <button @click="determineSearchCriteria" class="btn btn-outline-secondary" type="button" id="button-addon2">
              Otsi
            </button>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col col-6 justify-content-center ">
          <MaterialSearchResult v-if="isMaterialSearch" :key="materialResponseBody.binName"
                                :material-response-body="materialResponseBody"
                                :search-input="searchInput"
                                ref="MaterialSearchResult"/>
          <UpcSearchResult v-if="isUpcSearch" :key="upcResponseBody.productId" :search-input="searchInput"
                           :upc-response-body="upcResponseBody"
                           ref="UpcSearchResult"/>
          <SearchResultWithNoMatch v-if="isNotFound" :key="errorResponse.message" :error-response="errorResponse"
                                   :search-input="searchInput"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import LogoComponent from "@/views/LogoComponent.vue";
import SearchResultWithNoMatch from "@/components/modal/SearchResultWithNoMatchModal.vue";
import MaterialSearchResult from "@/components/MaterialSearchResult.vue";
import UpcSearchResult from "@/components/UpcSearchResult.vue";



export default {
  name: "SearchView",
  components: { UpcSearchResult, MaterialSearchResult, SearchResultWithNoMatch, LogoComponent},

  data() {
    return {
      searchInput: '',

      isUpcSearch: false,
      isMaterialSearch: false,
      isNotFound: false,

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
      this.resetFields()
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
        this.isUpcSearch = true
      }).catch(error => {
        this.errorResponse = error.response.data
        this.isNotFound = true
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
        this.isMaterialSearch = true
      }).catch(error => {
        this.errorResponse = error.response.data
        this.isNotFound = true
      })
    },

    resetFields() {
      this.errorResponse.message = ''
      this.upcResponseBody.productId = 0
      this.materialResponseBody.binName = ''
      this.isUpcSearch = false
      this.isMaterialSearch = false
      this.isNotFound = false

    },

  }

}

</script>

