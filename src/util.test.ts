import * as util from "./util";
import { expect, test } from "vitest";

test("markdown", () => {
  expect("**test**").toBe(util.scrapboxToMarkdown(`[* test]`));
  expect("**test** is **test**").toBe(
    util.scrapboxToMarkdown(`[* test] is [* test]`)
  );
  expect("~~test~~").toBe(util.scrapboxToMarkdown(`[- test]`));
  expect("# test").toBe(util.scrapboxToMarkdown(`[**** test]`));

  //list
  expect(`  - first`).toBe(util.scrapboxToMarkdown(` first`));
  expect("  - first\n    - second").toBe(
    util.scrapboxToMarkdown(" first\n  second")
  );
  expect(`  - first`).toBe(util.scrapboxToMarkdown("\tfirst"));

  expect("[test](http://www.pitecan.com/)").toBe(
    util.scrapboxToMarkdown("[test http://www.pitecan.com/]")
  );

  expect("![image](http://www.pitecan.com/hello.png)").toBe(
    util.scrapboxToMarkdown("[http://www.pitecan.com/hello.png]")
  );
});
