
var  nutChart = {  
    title: "Pie Chart", 
    width: 400,  
    height: 400,  
    series: [],  //格式[{"name":"","value":"","color":"","label1":"","label2":""}]
    chartCanvas: null, 
    chartCanvasID: null, 
    callback:null ,
    legend : {  
        show : true  
    }, 
    label:{
        show:true,
        linelength:40,
        linelength2:50
    },
    circle : {  
        cx: 0,  
        cy: 0,  
        radius: 0  

    }, 
    initSettings: function (config) { 
         this.radomId = config.chartCanvasID
            // 获得canvas上下文
         config.canvas  = document.getElementById(this.radomId);
            if( config.canvas &&  config.canvas.getContext){
               
 	this.chartCanvas = config.canvas; 
            }
          this.chartCanvas = config.canvas; 
        this.chartCanvas.width = config.width;  
        this.chartCanvas.height = config.height;  
        this.width = config.width;  
        this.height = config.height;  
        this.series = config.series;  
        this.title = config.title;    
      
        if(config.legend != undefined) {  
            this.legend.show = config.legend.show;            
        }
        if(config.label != undefined) {  
            this.label.show = config.label.show;            
        }
        this.callback = config.callback;
    },
    getRatioSum:function(j){
        var sum = 0;
        for (var i = 0; i < j; i++) {
            sum += this.series[i].value;
        }
        return sum;
    },
    getRatioHalfSumDegrees:function(index){
        var sum = this.getRatioSum(index);
        sum += (this.series[index].value / 2);
        return sum * Math.PI * 2;
    },
    getRatioHalfSumDegrees360:function(index){
        var sum = this.getRatioSum(index);
        sum += (this.series[index].value / 2);
        return sum * 360;
    },
    renderLegend:function(ctx, length){
    },
    renderLabel:function(ctx,length){
        if(this.label.show){
            for (var i = 0; i <length; i++) {
                this.renderLabelLine(ctx,i) ;
            }

        }
    },
    renderLabelLine:function(ctx,index){
        ctx.save();
        ctx.translate(this.width / 2, this.height / 2);
        ctx.rotate(this.getRatioHalfSumDegrees(index));
        ctx.strokeStyle = this.series[index].color;
        ctx.moveTo(this.circle.radius + 1, 0);
        ctx.lineTo(this.circle.radius + this.label.linelength, 0);
        ctx.stroke();
        this.renderLabelLine2(ctx, index);
        ctx.restore();
    },
    renderLabelLine2:function(ctx,index){
        ctx.save();
        ctx.translate(this.circle.radius + this.label.linelength, 0);
        var ro = this.getRatioHalfSumDegrees(index);
        ctx.rotate( - ro);
        var xro = this.getRatioHalfSumDegrees360(index);
        if ((xro > 270 && xro < 360) || (xro > 0 && xro < 90)) {
            ctx.strokeStyle = this.series[index].color;
            ctx.moveTo(0, 0);
            ctx.lineTo(this.label.linelength2, 0);
            ctx.stroke();
            ctx.fillText(this.series[index].label1, 10, -4);
            ctx.fillText(this.series[index].label2, 10, 14); 
        } else {
            ctx.strokeStyle = this.series[index].color;
            ctx.moveTo(0, 0);
            ctx.lineTo( - this.label.linelength2, 0);
            ctx.stroke();
            ctx.fillText(this.series[index].label1, -40, -4);
            ctx.fillText(this.series[index].label2, -40, 14); 
        }

        ctx.restore();
    },
    renderPie:function(ctx,length){
        let lastpos = pos = 0;
        ctx.lineWidth = this.circle.radius * 0.4;
        for (let i = 0; i < length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = this.series[i].color;
            pos = lastpos + Math.PI * 2 * this.series[i].value;
            ctx.arc(this.circle.cx , this.circle.cy, this.circle.radius, lastpos, pos);
            ctx.stroke();
            lastpos = pos;
        }

    },
    renderPieImage:function(ctx,length){

    },
    renderClick:function(event,obj){
        var x = event.pageX;
        var y = event.pageY;
        var canvas = event.target;
        var bbox = canvas.getBoundingClientRect();
        var loc = { x: x - bbox.left * (canvas.width  / bbox.width),
                    y: y - bbox.top  * (canvas.height / bbox.height)};
        console.log(loc);

        var dx = loc.x - obj.circle.cx;  
        var dy = loc.y - obj.circle.cy;  
        var dis = Math.floor(Math.sqrt(dx * dx + dy * dy));  
        console.log("dis="+dis+"  mRadius="+obj.circle.radius);
        if(dis <= obj.circle.radius*1.2&&dis>=obj.circle.radius*0.8) {  
            // draw tool tip text  
            var angle = Math.atan2(dy,dx);  
            if(angle <= 0) {   
                angle = angle + 2*Math.PI;  
            }   
            var deltaArc = 0;  
            var index = 0;  
            for(var i=0; i<obj.series.length; i++) {  
                var precent = obj.series[i].value;  
                deltaArc += 2*Math.PI * precent;  
                if(angle<=deltaArc) {  
                    index = i;  
                    break;  
                }  
            }
            obj.callback(obj.series[index]);
            //console.log(obj.series[index].label1);
        }
    },
    render:function(){
        this.circle.cx = this.width/2 ;
        this.circle.cy = this.height/2 ;
        this.circle.radius=(this.width - this.width  * 0.5) / 2;
       console.log(this.chartCanvas)
        let ctx = this.chartCanvas.getContext("2d");

        if(this.circle.radius <= 0) {  
            ctx.strokeText("请设置布局大小.");  
            return;  
        }   
         if (window.devicePixelRatio) {
            this.chartCanvas.style.width = this.width + "px";
            this.chartCanvas.style.height = this.height + "px";
            this.chartCanvas.height = this.height * window.devicePixelRatio;
            this.chartCanvas.width = this.width * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        var length = this.series.length ;
        this.renderLabel(ctx,length) ;
        this.renderPie(ctx,length); 
        var parent = this ;
        this.chartCanvas.addEventListener('click', function(event){
            parent.renderClick(event,parent);
        }, false);
    }

}
