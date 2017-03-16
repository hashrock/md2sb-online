<template>
  <div id="app">
    <textarea v-model="input" cols="30" rows="10"></textarea>
    <textarea v-model="output" name="" id="" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
//import * as md2sb from "md2sb"
import Vue from 'vue'
import md2sb from 'md2sb'


export default {
  name: 'app',
  data () {
    return {
      input: ``,
      output: "",
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted:function(){
    this.$watch("input", async (input)=>{
      this.output = await md2sb(input)
    })
    this.input = `# Markdown から ScrapBoxへ変換します（md2sb利用）

- md2sb https://github.com/pastak/md2sb
- hey
- hoo
 - bar`
  }
}
</script>

<style>
  html, body{
    height: 100%;
    margin: 0;
  }
  #app{
    display: flex;
    width: 100%;
    height: 100%;
  }
  textarea{
    font-size: 16px;
    flex: 1;
  }

</style>
