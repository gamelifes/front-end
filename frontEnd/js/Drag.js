var params = {
    left: 0,
    right: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
   
};

var getCss = function(o,key){
    return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
};


var startDrag = function(bar, target, callback){
    console.log(target.style.position)

    if(getCss(target, "left") !== "auto"){
        params.left = getCss(target, "left");
    }
    if(getCss(target, "top") !== "auto"){
        params.top = getCss(target, "top");
    }
    
    bar.onmousedown = function(event){
        console.log(target)
        params.flag = true;
        if(!event){
            event = window.event;
        
            bar.onselectstart = function(){
                return false;
            }  
        }
        var e = event;
        params.currentX = e.clientX;
        params.currentY = e.clientY;
    };
    document.onmouseup = function(){
    
        params.flag = false;	
        if(getCss(target, "left") !== "auto"){
            params.left = getCss(target, "left");
        }
        if(getCss(target, "top") !== "auto"){
            params.top = getCss(target, "top");
        }
    };
    document.onmousemove = function(event){
  
        var e = event ? event: window.event;
        if(params.flag){
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - params.currentX, disY = nowY - params.currentY;
            
           //范围限定方法　
            let moveX = parseInt(params.left) + disX;
            let moveY = parseInt(params.top) + disY;
           
            target.style.left = moveX + "px";
            target.style.top = moveY + "px";

            if (typeof callback == "function") {
                callback((parseInt(params.left) || 0) + disX, (parseInt(params.top) || 0) + disY);
            }
            
            if (event.preventDefault) {
                event.preventDefault();
            }
            return false;
        }
    }	
};