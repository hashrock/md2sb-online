
/**
 * md2sbの不具合対応
 * 
 * List記法ネストの改行位置がおかしい問題があるため、
 * 前もってにsb形式のリストに変換してしまう。
 * 
 * markdownのリストのネスト判定はだいぶ面倒くさいことになっているので、
 * 真面目に対応せず、なんとなくネストっぽい見た目になっていればいいやということで、
 * リスト記号の前についてるスペースをそのまま残すことにした。
 */
function precompileList(input){
  var list = input.split("\n")
  var convertedList = list.map(line => {
    var pattern = /^([ \t]*)[-*+] /
    var matched = pattern.exec(line)
    if(matched){
      return " " + line.replace(pattern, matched[1])
    }else{
      return line
    }
  })
  return convertedList.join("\n")
}

function scrapboxToMarkdown(input){
  const converted = input.replace(/\t/g, " ")

  var patterns = [
//    {name: "blockquote", pattern: / /, action: ""},
//    {name: "code", pattern: / /, action: ""},
//    {name: "codeblock", pattern: / /, action: ""},
    {name: "heading", pattern: /\[\*\*+ (.+)]/, action: "# $1"},
//    {name: "hr", pattern: / /, action: ""},
    {name: "image", pattern: /\[(.*[png|jpeg|jpg|bmp|svg|gif])\]/, action: "![image]($1)"},
//    {name: "italic", pattern: / /, action: ""},
//    {name: "link-includes-image", pattern: / /, action: ""},
    {name: "link", pattern: /\[([^ ]*) (http.+)\]/, action: "[$1]($2)"},
//    {name: "list-strong-style-text", pattern: / /, action: ""},
    {name: "list", pattern: /^( +)/, action: "$1$1- "},
//    {name: "paragraph", pattern: / /, action: ""},
    {name: "strike", pattern: /\[- ([^\]]+)]/, action: "~~$1~~"},
    {name: "strong-italic", pattern: /\[\*\/ ([^\]]+)]/g, action: "***$1***"},
    {name: "strong", pattern: /\[\* ([^\]]+)]/g, action: "**$1**"},
//    {name: "table", pattern: / /, action: ""},
  ]

  return converted.split("\n").map(line=>{
    var output = line
    patterns.forEach(pattern=>{
      if(pattern.action){
        output = output.replace(pattern.pattern, pattern.action)
      }
      if(pattern.callback){
        output = pattern.callback(output)
      }
    })
    return output
  }).join("\n")
}


module.exports = {
  scrapboxToMarkdown: scrapboxToMarkdown,
  precompileList: precompileList
}