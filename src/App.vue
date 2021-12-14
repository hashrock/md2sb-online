<template>
  <div id="app">
    <div class="nav">
      <svg id="i-edit" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="margin: 0.5rem;">
          <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
      </svg>
      <span> 
        Online ScrapBox Converter
      </span>
      <select v-model="mode">
        <option value="toScrapBox">Markdown -> ScrapBox</option>
        <option value="toMarkdown">ScrapBox -> Markdown</option>
      </select>

      <a href="https://github.com/hashrock/md2sb-online">
        GitHub
      </a>
   </div>
    <div class="editor">
      <textarea class="input" v-model="input" cols="30" rows="10"></textarea>
      <textarea v-model="output" name="" id="" cols="30" rows="10"></textarea>
    </div>
  </div>
</template>

<script>
import md2sb from 'md2sb'
import * as Util from "./util"

export default {
  name: 'app',
  data () {
    return {
      input: ``,
      output: "",
      mode: "toScrapBox",
    }
  },
  methods: {
    async update(input){
      if(this.mode === "toMarkdown"){
        this.output = Util.scrapboxToMarkdown(input)
      }
      if(this.mode === "toScrapBox"){
        this.output = await md2sb(input)
      }
    }
  },
  mounted(){
    this.$watch("mode", ()=>{
      this.update(this.input)
    })
    this.$watch("input", (input)=>{
      this.update(input)
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
    height: 3rem;
    display: flex;
    align-items: center;
    background: #25ab70;
    color: white;
  }
  .editor{
    flex: 1;
    display: flex;
  }
  .input{
    background: #333;
    color: white;
  }
  select {
    font-size: 1rem;
    margin: 1rem;
  }
</style>
