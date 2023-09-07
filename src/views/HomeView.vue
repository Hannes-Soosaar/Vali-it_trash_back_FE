<template>
  <div class="home">
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-6">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="UPC/materjali nimi">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Otsi</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
}
</script>
