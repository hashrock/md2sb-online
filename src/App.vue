<template>
  <div id="app">
    <div class="nav">
      ScrapBox Converter
    </div>
    <div class="editor">
      <textarea class="input" v-model="input" cols="30" rows="10"></textarea>
      <textarea v-model="output" name="" id="" cols="30" rows="10"></textarea>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import md2sb from 'md2sb'
import * as Util from "./util"

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
      var oinput = Util.precompileList(input)
      this.output = await md2sb(oinput)
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
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  textarea{
    font-size: 16px;
    flex: 1;
    padding: 1rem;
  }
  .nav{
    line-height: 3rem;
  }
  .editor{
    flex: 1;
    display: flex;
  }
  .input{
    background: #333;
    color: white;
  }

</style>
