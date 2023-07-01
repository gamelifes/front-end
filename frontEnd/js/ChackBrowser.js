/**
 *  MarkDown£º
 *  ¼ì²âä¯ÀÀÆ÷°æ±¾
 * */
let v = getBrowse();
console.log(v)
function getBrowse() {
    let browser = {}
    let userAgent = navigator.userAgent.toLowerCase()
    let s
        ; (s = userAgent.match(/msie ([\d.]+)/))
            ? (browser.ie = s[1])
            : (s = userAgent.match(/firefox\/([\d.]+)/))
                ? (browser.firefox = s[1])
                : (s = userAgent.match(/chrome\/([\d.]+)/))
                    ? (browser.chrome = s[1])
                    : (s = userAgent.match(/opera.([\d.]+)/))
                        ? (browser.opera = s[1])
                        : (s = userAgent.match(/version\/([\d.]+).*safari/))
                            ? (browser.safari = s[1])
                            : 0
    let version = ""
    if (browser.ie) {
        version = "IE " + browser.ie
    } else {
        if (browser.firefox) {
            version = "Firefox"
        } else {
            if (browser.chrome) {
                version = "Chrome"
            } else {
                if (browser.opera) {
                    version = "Opera"
                } else {
                    if (browser.safari) {
                        version = "Safari"
                    } else {
                        version = "Î´Öªä¯ÀÀÆ÷"
                    }
                }
            }
        }
    }
    return version
}