function adjustToFreezeWidth(rootSvg) {
    var windowWidth = window.screen.availWidth || document.body.clientWidth || window.screen.width;
    var windowHeight = window.screen.availHeight || document.body.clientHeight || window.screen.height;
    var viewBoxVal = rootSvg.getAttribute("viewBox");
    var viewBoxWidth = viewBoxVal.split(",")[2];
    var viewBoxHeight = viewBoxVal.split(",")[3];
    var vbValue = '0 0' +' '+ windowWidth +' '+ windowHeight;
    
    rootSvg.removeAttribute('viewBox');
    rootSvg.setAttribute('viewBox', vbValue);
      
    
    rootSvg.removeAttribute("width");
    rootSvg.removeAttribute("height");

    var setWidth = windowWidth;
    var setHeight = windowHeight;//(setWidth * viewBoxHeight) / viewBoxWidth;
   
    rootSvg.setAttribute("width", setWidth);
    rootSvg.setAttribute("height", setHeight);
}

function adjustToNone(rootSvg) {

    var viewBoxVal = rootSvg.getAttribute("viewBox");
    var viewBoxWidth = viewBoxVal.split(",")[2];
    var viewBoxHeight = viewBoxVal.split(",")[3];
    rootSvg.removeAttribute("width");
    rootSvg.removeAttribute("height");

    rootSvg.setAttribute("width", viewBoxWidth);
    rootSvg.setAttribute("height", viewBoxHeight);

}

function adjustToFreezeHeight(rootSvg) {

    var windowHeight = window.screen.availHeight || document.body.clientHeight || window.screen.height;

    var viewBoxVal = rootSvg.getAttribute("viewBox");
    var viewBoxWidth = viewBoxVal.split(",")[2];
    var viewBoxHeight = viewBoxVal.split(",")[3];
    rootSvg.removeAttribute("width");
    rootSvg.removeAttribute("height");

    var setHeight = windowHeight;
    var setWidth = (setHeight * viewBoxWidth) / viewBoxHeight;
    rootSvg.setAttribute("width", setWidth);
    rootSvg.setAttribute("height", setHeight);
}

function adjustToFreezeAll(rootSvg) {

    var windowHeight = window.screen.availHeight || document.body.clientHeight || window.screen.height;
    var windowWidth = window.screen.availWidth || document.body.clientWidth || window.screen.width;

    rootSvg.removeAttribute("width");
    rootSvg.removeAttribute("height");

    rootSvg.setAttribute("width", windowWidth);
    rootSvg.setAttribute("height", windowHeight);

}


