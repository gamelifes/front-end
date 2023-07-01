var caChart = {
        title:"Ca Chart",
        width: 600,
        height:500,
        data:[], //格式[{"name":"","value":"","color":"","label":"","introduce":""}]
        chartCanvas:null,
        chartCanvasId:caChart,
        callback:null,

 goChart:  function(config){
            var dataArr = config.data
            var title = config.title
            // 声明所需变量
            var canvas = config.chartCanvas
            var ctx;
            var width = config.width
            var height = config.height
            // 图表属性
            var cWidth, cHeight, cMargin, cSpace;
            // 饼状图属性
            var radius,ox,oy;//半径 圆心
            var tWidth, tHeight;//图例宽高
            var posX, posY, textX, textY;
            var startAngle, endAngle;
            var totleNb;
            // 运动相关变量
            var ctr, numctr, speed;
            //鼠标移动
            var mousePosition = {};
            
            //线条和文字
            var lineStartAngle,line,textPadding,textMoveDis;
            this.radomId = config.chartCanvasId
            // 获得canvas上下文
            canvas = document.getElementById(this.radomId);
            if(canvas && canvas.getContext){
                ctx = canvas.getContext("2d");
            }
        if(radius <= 0) {  
            ctx.strokeText("请设置布局大小.");  
            return;  
        } 
       	 initChart();
            // 图表初始化
    	function initChart(){
	 
                // 图表信息
                cMargin = 60;
                cSpace = 40;
                
                canvas.width =width*2 ;
                canvas.height = height*2;
                canvas.style.height = canvas.height/2 + "px";
                canvas.style.width = canvas.width/2 + "px";
                cHeight = canvas.height - cMargin*2;
                cWidth = canvas.width - cMargin*2;
        
                //饼状图信息
                radius = cHeight*2/6;  //半径  高度的2/6
                ox = canvas.width/2 + cSpace;  //圆心
                oy = canvas.height/2;
                tWidth = 60; //图例宽和高
                tHeight = 20; 
               posX = ox+cMargin+tWidth; //posX = cMargin -  tWidth;
                posY = cMargin -  tHeight ;   
                textX = posX + tWidth + 15;
                textY = posY + 18;
                startAngle = endAngle = 90*Math.PI/180; //起始弧度 结束弧度
                rotateAngle = 0; //整体旋转的弧度
    
                //将传入的数据转化百分比
                totleNb = 0;
                new_data_arr = [];
                for (var i = 0; i < dataArr.length; i++){
                    totleNb += dataArr[i].value;

                }
                for (var i = 0; i < dataArr.length; i++){
                    new_data_arr.push( dataArr[i].value/totleNb );
                }
                totalYNomber = 10;
                // 运动相关
                ctr = 1;//初始步骤
                numctr = 50;//步骤
                speed = 1.2; //毫秒 timer速度
                
                //指示线 和 文字
                lineStartAngle = -startAngle;
                line=40;         //画线的时候超出半径的一段线长
                textPadding=10;  //文字与线之间的间距
                textMoveDis = 200; //文字运动开始的间距
            }
	//图表标题
              drawTitle();
          function  drawTitle(){
	console.log(title)
	ctx.save();
	ctx.fillStyle="black"; 
	ctx.globalAlpha="0.4"; 
	ctx.textAlign="center"; 
	ctx.font="64px Arial"; 
	ctx.shadowColor="rgba(0,0,0,0.4)"; 
	ctx.shadowOffsetX=15; 
	ctx.shadowOffsetY=-10; 
	ctx.shadowBlur=2; 
	ctx.fillText(title ,width,height/10);//IE不支持 
	ctx.restore(); 
};
            drawMarkers();
            //绘制比例图及文字
            function drawMarkers(){

                ctx.textAlign="left";
                for (var i = 0; i < dataArr.length; i++){
                    //绘制比例图及文字
                    ctx.fillStyle = dataArr[i].color;
                    ctx.fillRect(posX , posY + 40 * i, tWidth, tHeight);
                    ctx.moveTo(posX, posY + 40 * i);
                    ctx.font = 'normal 24px 微软雅黑';    
                    ctx.fillStyle = dataArr[i].color; //"#000000";
                    var percent = dataArr[i].name + "：" + parseInt(100 * new_data_arr[i]) + "%";
	
                    ctx.fillText(percent,textX, textY + 40 * i);
                }
            };
  
            //绘制动画
            pieDraw();
            function pieDraw(mouseMove){
                  

                for (var n = 0; n < dataArr.length; n++){
                    ctx.fillStyle = ctx.strokeStyle = dataArr[n].color;
                    ctx.lineWidth=1;
                    var step = new_data_arr[n]* Math.PI * 2; //旋转弧度
                    var lineAngle = lineStartAngle+step/2;   //计算线的角度
                    lineStartAngle += step;//结束弧度
                    
                    ctx.beginPath();
                    var  x0=ox+radius*Math.cos(lineAngle),//圆弧上线与圆相交点的x坐标
                         y0=oy+radius*Math.sin(lineAngle),//圆弧上线与圆相交点的y坐标
                         x1=ox+(radius+line)*Math.cos(lineAngle),//圆弧上线与圆相交点的x坐标
                         y1=oy+(radius+line)*Math.sin(lineAngle),//圆弧上线与圆相交点的y坐标
                         x2=x1,//转折点的x坐标
                         y2=y1,
                         linePadding=ctx.measureText(dataArr[n].name).width+10; //获取文本长度来确定折线的长度
                         
                         ctx.moveTo(x0,y0);
                         //对x1/y1进行处理，来实现折线的运动
                         yMove = y0+(y1-y0)*ctr/numctr;
                         ctx.lineTo(x1,yMove);
	          var per =  parseInt(100 * new_data_arr[n]) + "%";
                         if(x1<=x0){
                             x2 -= line;
                             ctx.textAlign="right";
                             ctx.lineTo(x2-linePadding,yMove);
                            ctx.fillText(dataArr[n].name,x2-textPadding-textMoveDis*(numctr-ctr)/numctr,y2-textPadding); 
	             ctx.fillText(per,x2-textMoveDis*(numctr-ctr)/numctr+10,y2+40); 
                         }else{
                             x2 += line;
                             ctx.textAlign="left";
                             ctx.lineTo(x2+linePadding,yMove);
                            ctx.fillText(dataArr[n].name,x2+textPadding+textMoveDis*(numctr-ctr)/numctr,y2-textPadding);
 	             ctx.fillText(per,x2+textMoveDis*(numctr-ctr)/numctr+10,y2+40); 
                         }
                        
                        ctx.stroke();
                        
                }
                
                //设置旋转
                ctx.save();
                ctx.translate(ox, oy);
                ctx.rotate((Math.PI*2/numctr)*ctr/2);

 

                  	//绘制一个圆圈
              /*ctx.strokeStyle = "rgba(0,0,0,"+ 0.5*ctr/numctr +")"
                ctx.beginPath();
                ctx.arc(0, 0 ,(radius*2)/6, 0, Math.PI*2, false);
                ctx.stroke();*/
                for (var j = 0; j < dataArr.length; j++){
                    
                    //绘制饼图
                    endAngle = endAngle + new_data_arr[j]* ctr/numctr * Math.PI * 2; //结束弧度
                    
                    ctx.beginPath();
                    ctx.moveTo(0,0); //移动到到圆心
                    ctx.arc(0, 0, radius*ctr/numctr, startAngle, endAngle, false); //绘制圆弧
                    
                    ctx.fillStyle = dataArr[j].color;
                    if(mouseMove && ctx.isPointInPath(mousePosition.x*2, mousePosition.y*2)){
                        ctx.globalAlpha = 0.8;
                    }
	
                      ctx.closePath();
	      ctx.fill();
                    ctx.globalAlpha = 1;
                    
                    startAngle = endAngle; //设置起始弧度
                    if( j == dataArr.length-1 ){
                        startAngle = endAngle = 90*Math.PI/180; //起始弧度 结束弧度
                    }
                }
                 //绘制一个圆圈，遮盖形成环形
	  ctx.fillStyle = "rgba(250,250,250,250)";
              	 ctx.beginPath();
                ctx.arc(0, 0 ,(radius*2)/3, 0, Math.PI*2, false);
                ctx.fill()
                ctx.restore();
                    
                if(ctr<numctr){
                    ctr++;
                    setTimeout(function(){
                        ctx.clearRect(-canvas.width, -canvas.height,canvas.width*2, canvas.height*2);
                        drawMarkers();
                        pieDraw();
                    }, speed*=1.085);
                }
            }

            //监听鼠标移动
            var mouseTimer = null;
            canvas.addEventListener("mousemove",function(e){
                e = e || window.event;
                if( e.offsetX || e.offsetX==0 ){
                    mousePosition.x = e.offsetX;
                    mousePosition.y = e.offsetY;
                }else if( e.layerX || e.layerX==0 ){
                    mousePosition.x = e.layerX;
                    mousePosition.y = e.layerY;
                }
                
                clearTimeout(mouseTimer);
                mouseTimer = setTimeout(function(){
                    ctx.clearRect(0,0,canvas.width, canvas.height);
 	   drawTitle();
                    drawMarkers();
	   
                    pieDraw(true);
                },10);
            });
            
        }
            
}