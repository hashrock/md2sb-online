<template>
  <div id="app">
    <div class="nav">
      <div class="nav-left">
        <svg id="i-edit" viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentcolor"
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="margin: 0.5rem;">
          <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
        </svg>
        <h1>
          Online ScrapBox Converter
        </h1>
        <select v-model="mode">
          <option value="toScrapBox">Markdown -> ScrapBox</option>
          <option value="toMarkdown">ScrapBox -> Markdown</option>
        </select>
      </div>

      <a href="https://github.com/hashrock/md2sb-online" style="display: flex;">
        <svg role="img" width=24 class="github-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>GitHub</title>
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </a>
    </div>
    <div class="editor">
      <div class="editor__wrapper" :class="{draged: fileDragged}"
           @dragenter="inputDragEnter" @dragleave="inputDragLeave" @drop="inputDropFile">
        <textarea ref="input" class="input" v-model="input" cols="30" rows="10"></textarea>
        <!-- 破壊的操作だがUndoができず危険なので一旦削除 -->
        <!-- <button class="editor__button" @click="pasteFromClipboard">Paste</button> -->
      </div>
      <div class="editor__wrapper">
        <textarea ref="output" class="output" v-model="output" name="" id="" cols="30" rows="10"></textarea>
        <button class="editor__button" @click="copyToClipboard">Copy</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import md2sb from 'md2sb'
import { defineComponent } from 'vue'
import * as Util from "./util"

export default defineComponent({
  name: 'app',
  data() {
    return {
      input: ``,
      output: "",
      mode: "toScrapBox",
      fileDragged: false,
    }
  },
  methods: {
    async update(input: string) {
      if (this.mode === "toMarkdown") {
        this.output = Util.scrapboxToMarkdown(input)
      }
      if (this.mode === "toScrapBox") {
        this.output = await md2sb(input)
      }
    },
    copyToClipboard(){
      const textarea = this.$refs.output as HTMLTextAreaElement
      textarea.select()
      navigator.clipboard.writeText(this.output).then(function() {
      });
    },
    pasteFromClipboard(){
      const textarea = this.$refs.input as HTMLTextAreaElement
      textarea.select()
      navigator.clipboard.readText().then((text) =>{
        this.input = text
      });
    },
    inputDragEnter(){
      this.fileDragged = true
    },
    inputDragLeave(){
      this.fileDragged = false 
    },
    async inputDropFile(event: DragEvent){
      event.preventDefault();
      this.fileDragged = false;

      const file = event.dataTransfer?.files[0];
      if(!file) return;

      if(!file.type.startsWith('text')) {
        const res = confirm(`ドロップされたファイルはテキストファイルではないようです。\n(${file.type})\nこのファイルを読み込んでもよろしいですか？`);
        if(!res) return;
      }

      const buf = await file.arrayBuffer();
      const text = new TextDecoder().decode(buf)
      this.input = text
    }
  },
  mounted() {
    this.$watch("mode", () => {
      this.update(this.input)
    })
    this.$watch("input", (input: string) => {
      this.update(input)
    })
    this.input = `# Markdown から ScrapBoxへ変換します（md2sb利用）

- md2sb https://github.com/pastak/md2sb
- hey
- hoo
  - bar`
  }
})
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

h1 {
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  font-weight: normal;
}

#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

textarea {
  font-size: 16px;
  flex: 1;
  padding: 1rem;
}

.nav {
  height: 3rem;
  display: flex;
  align-items: center;
  background: #299266;
  color: white;
}

.nav-left {
  display: flex;
  flex: 1;
  align-items: center;
}

.editor {
  flex: 1;
  display: flex;
}

.editor__wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.editor__button {
  position: absolute;
  bottom: 0rem;
  width: 10rem;
  right: calc(50% - 5rem);
  padding: 0.5em;
  color: white;
  border: 1px solid white;
  border-radius: 0.25em;
  background: transparent;
  cursor: pointer;
  opacity: 0.75;
}

.editor__button:hover {
  background-color: #555;
  opacity: 1;
}

.input {
  background: #333;
  color: white;
  border: none;
}

.draged {
  border: dashed 4px #299266;
}

.output {
  background: #444;
  color: white;
  border: none;
}

select {
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25em 0.75em;
  border-radius: 0.25em;
  border: 1px solid white;
}

.github-icon {
  margin-right: 0.75rem;
  fill: white;
}
</style>
