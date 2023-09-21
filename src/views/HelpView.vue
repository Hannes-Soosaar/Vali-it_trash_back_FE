<template>

  <div class="container text-center position-absolute top-50 start-50 translate-middle col-3">

    <div class="col col-6 input-group mb-5">
      <input v-model="helpInput" type="text" class="form-control" @keyup.enter="getHelp"
             placeholder="Sisesta enda küsimus">
      <button @click="getHelp" class="btn btn-outline-secondary" type="button" id="button-addon2">
        Otsi
      </button>
    </div>
<!--    <div class="row border">-->
<!--        <a href="https://www.google.com">-->
<!--          <img src="../assets/googleit.png">-->
<!--        </a>-->
<!--    </div>-->
  </div>

</template>


<script>
import {computeStyles} from "@popperjs/core";

export default {
  name: "HelpView",
  data(){
    return {
      helpInput:''

    }
  },

  methods:{
    getHelp(){
     window.open(`https://www.google.com/search?q=${encodeURI(this.helpInput)}`)
    }

  }


}
</script>


<style scoped>

</style>