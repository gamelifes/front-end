

			function PieChart(ctx,radius){
			this.ctx = ctx||document.querySelector("canvas").getContext("2d");
			this.width = this.ctx.canvas.width;
			this.height = this.ctx.canvas.height;
			this.x0 = this.width/2+50;
			this.y0 = this.height/2;
			this.radius = radius;
			this.outLong = radius/4;
			this.dicX = 5;
			this.dicY = 5;
			this.dicWidth = 10;
			this.dicHeight = 10;
			this.spanY = 15;
			};
			PieChart.prototype.init = function(data){
				this.drawPie(data);
			};
			PieChart.prototype.drawPie = function(data){
				//转化后带有弧度的数据
				var that = this;
				var angleList = this.transformAngle(data);
				var startAngle = 0;
				angleList.forEach(function(item,index){
					var color = that.randomColor();
					that.ctx.beginPath();
					that.ctx.arc(that.x0,that.y0,that.radius,startAngle,startAngle+item.angle);
					that.ctx.lineTo(that.x0,that.y0);
					that.ctx.fillStyle = color
					that.ctx.fill();
					//调用drawTitle函数
					that.drawTitle(startAngle,item.angle,color,item.title);
					startAngle+=item.angle;
				});
			};
			PieChart.prototype.drawTitle = function(startAngle,angle,color,title){
				var out = this.outLong+this.radius;
				var du = startAngle+angle/2;
				//伸出外面的坐标原点
				var outX = this.x0+out*Math.cos(du);
				var outY = this.y0+out*Math.sin(du);
				this.ctx.beginPath();
				this.ctx.moveTo(this.x0,this.y0);
				this.ctx.lineTo(outX,outY);
				this.ctx.strokeStyle = color;
				//设置标题
				//this.ctx.font = '12px Microsoft Yahei';
				var textWidth = this.ctx.measureText(title).width;
				this.ctx.textBaseline = "bottom";
				if(outX>this.x0){
					this.ctx.textAlign = "left";
					this.ctx.lineTo(outX+textWidth,outY);
				}else{
					this.ctx.textAlign = "right";
					this.ctx.lineTo(outX-textWidth,outY);
				}
				this.ctx.stroke();
				this.ctx.fillText(title,outX,outY);
				//画描述
				this.drawDic(title);
			};
			PieChart.prototype.drawDic = function(title){
				this.ctx.fillRect(this.dicX,this.dicY,this.dicWidth,this.dicHeight);
				//this.ctx.font = '10px Microsoft Yahei';
				this.ctx.textAlign = "left";
				this.ctx.textBaseline = "middle";
				this.ctx.fillText(title,this.dicX+this.dicWidth+10,this.dicY+this.dicHeight/2);
				this.dicY +=this.spanY;	
			};
			PieChart.prototype.transformAngle = function(data){
				var total = 0;
				data.forEach(function(item,index){
					total+=item.per;
				});
				data.forEach(function(item,index){
					item.angle = item.per/total*2*Math.PI;
				});
				return data;
			};
			PieChart.prototype.randomColor = function(){
				//随机生成rgb三元色
				var r = Math.floor(Math.random()*255+1);
				var g = Math.floor(Math.random()*255+1);
				var b = Math.floor(Math.random()*255+1);
				return 'rgb('+r+','+g+','+b+')';
			};
			var data = [
				{
					title:'10-15岁',
					per:10
				},
				{
					title:'16-20岁',
					per:8
				},
				{
					title:'21-30岁',
					per:20
				},
				{
					title:'31-45岁',
					per:10
				},
				{
					title:'46-60岁',
					per:15
				}
			];
			var ctx =  document.getElementById("canvas").getContext("2d");//document.querySelector("canvas").getContext("2d");//
			console.log(ctx)
 			var pieWidth =ctx.canvas.width / 3 - 50
			console.log(pieWidth)
			var pieChart = new PieChart(ctx,50);
			pieChart.init(data);
			//var ctx = document.querySelector("canvas").getContext("2d");
			//var pieChart = new PieChart(ctx,150);
			//pieChart.init(data);
		
