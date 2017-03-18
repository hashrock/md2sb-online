
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
export function precompileList(input){
  var list = input.split("\n")
  var convertedList = list.map(line => {
    var pattern = /^( *)[-*+] /
    var matched = pattern.exec(line)
    if(matched){
      return " " + line.replace(pattern, matched[1])
    }else{
      return line
    }
  })
  return convertedList.join("\n")
}



