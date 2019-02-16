function loadCSS() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
        document.write('<link href="stylesheet/gomoku_mobile.css" rel="stylesheet" type="text/css"  >');
    }

    else {
        document.write('<link href="stylesheet/gomoku.css" rel="stylesheet" type="text/css" >');

    }

}
loadCSS();