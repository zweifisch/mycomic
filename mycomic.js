let phantom = require('phantom');
let co = require("co");
let cheerio = require("cheerio");
let {sleep} = require("promised-util");

let url = "http://mycomic.qq.com/ComicView/index/id/521825/cid/1";

co(function*() {
    let instance = yield phantom.create();
    let page = yield instance.createPage();
    let status = yield page.open(url);
    for (let i=0; i<6; i++) {
        page.property("viewportSize", {width: 960, height: 4000 * i});
        yield sleep(900);
    }
    content = yield page.property('content');
    $ = cheerio.load(content);
    $("#comicContain>li>img").each((index, el)=> console.log(el.attribs.src));
    page.close();
    instance.exit();
});
