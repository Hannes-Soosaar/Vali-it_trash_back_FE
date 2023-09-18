<template>

  <div>
      <slot name="tere">
        <div class="container text-center">
          <div class="row">
            <div class="col">
              <button @click="" type="button" class="btn btn-outline-success">Lisa pilt</button>
            </div>
          </div>
        </div>
      </slot>
  </div>

</template>


<script>
export default {
  name: "AddProductView",
  data(){
    return{

    }
  }
}
</script>


<style scoped>

</style>