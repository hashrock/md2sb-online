export function scrapboxToMarkdown(input: string){
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
    })
    return output
  }).join("\n")
}

