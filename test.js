var util = require("./src/util")
var test = require('tape');

test('markdown', function (t) {
    t.plan(9);
    t.equal('**test**', util.scrapboxToMarkdown(`[* test]`));
    t.equal('**test** is **test**', util.scrapboxToMarkdown(`[* test] is [* test]`));
    t.equal('~~test~~', util.scrapboxToMarkdown(`[- test]`));
    t.equal('# test', util.scrapboxToMarkdown(`[**** test]`));

    //list
    t.equal(`  - first`, util.scrapboxToMarkdown(` first`))
    t.equal("  - first\n    - second", util.scrapboxToMarkdown(" first\n  second"))
    t.equal(`  - first`, util.scrapboxToMarkdown("\tfirst"))

    t.equal("[test](http://www.pitecan.com/)", util.scrapboxToMarkdown("[test http://www.pitecan.com/]"))

    t.equal("![image](http://www.pitecan.com/hello.png)", util.scrapboxToMarkdown("[http://www.pitecan.com/hello.png]"))

});

