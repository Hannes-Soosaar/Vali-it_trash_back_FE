<template>

  <div class="container " style="border: solid 1px grey; border-radius:20px; background-color: lightgreen">

    <div class="container my-4">

      <div class="row justify-content-center mb-1">
        <h5>Viska konteinerisse
        </h5>
      </div>

      <div class="container row justify-content-center mb-4" style="border: solid 1px grey; border-radius:20px;
        background-color: lightgray">
        <h2 class="row justify-content-center mt-2 mb-2">{{ materialResponseBody.binName }}
        </h2>
      </div>

      <div class="row justify-content-center mb-1">
        <h5>Konteineri värv
        </h5>
      </div>

      <div class="container row justify-content-center mb-4" style="border: solid 1px grey; border-radius:20px;
      background-color: lightgray">
        <h2 class="row justify-content-center mt-2 mb-2">{{ materialResponseBody.binColor }}</h2>
      </div>

      <div class="row justify-content-center mb-1">
        <h5>Lisa info
        </h5>
      </div>

      <div class="container row justify-content-center mt-2" style="border: solid 1px grey; border-radius:20px;
            background-color: lightgray">
        <h5 class="row justify-content-center mt-2 mb-2">{{ materialResponseBody.binRequirements }}</h5>
      </div>

    </div>
  </div>

</template>
<script>
export default {
  name: 'MaterialSearchResult',
  props: {
    materialResponseBody: {},
    searchInput: {}
  }
}
</script>