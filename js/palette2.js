function palette(cobj,canvas,copy){
	this.o=cobj;
	this.c=canvas;
	this.style="line";
	this.type="fill";
	this.fillStyle="orange";
	this.strokeStyle="orange";
	this.lineWidth=1;
	this.width=canvas.width;
	this.height=canvas.height;
	this.pnum=5;
	this.snum=5;
	this.copy=copy;
	this.status=[];
}
// draw方法
//getImageData 获取上次所画图像 并保存在status数组中，putImageData  将数组中最后一个拿出来放画布上
palette.prototype.draw=function(){
	var that=this;
	// onmousedown事件 在canvas上触发
	this.copy.onmousedown=function(e){
		that.ints();
		var ax=e.offsetX;
		var ay=e.offsetY;
		// onmousemove事件 在document上触发
		document.onmousemove=function(e){
			var bx=e.offsetX;
			var by=e.offsetY;
			that.o.clearRect(0,0,that.width,that.height);
			if(that.status.length>0){
				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height);	
			}
			that[that.style](ax,ay,bx,by);
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}

}
// 直线
palette.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o.stroke();
}
// 矩形
palette.prototype.rect=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.rect(x1,y1,x2-x1,y2-y1);
	this.o.closePath();
	this.o[this.type]();
}
// 圆
palette.prototype.circle=function(x1,y1,x2,y2){
	var r=this.getR(x1,y1,x2,y2);
	this.o.beginPath();
	this.o.arc(x1,y1,r,0,Math.PI*2);
	this.o.closePath();
	this.o[this.type]();
}
// 三角形
palette.prototype.rangle=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x1,y2);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o[this.type]();
}
// 铅笔
palette.prototype.pencil=function(){

	var that=this;
	that.copy.onmousedown=function(){
	
		that.ints();
		that.o.beginPath();
		document.onmousemove=function(e){
			var ax=e.offsetX;
			var ay=e.offsetY;
			that.o.lineTo(ax,ay);
			that.o.stroke();
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			that.o.closePath();
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}

// 获取画圆的半径
palette.prototype.getR=function(x1,y1,x2,y2){
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
// 获取样式
palette.prototype.ints=function(){
	this.o.fillStyle=this.fillStyle;
	this.o.strokeStyle=this.strokeStyle;
	this.o.lineWidth=this.lineWidth;
}
// 多边形
palette.prototype.poly=function(x1,y1,x2,y2){
	var r=this.getR(x1,y1,x2,y2);
	var n=this.pnum;
	var ang=360/this.pnum;
	this.o.beginPath();
	for(var i=0;i<n;i++){
		this.o.lineTo(x1+Math.cos(ang*Math.PI/180*i)*r,y1+Math.sin(ang*Math.PI/180*i)*r);
	}
	this.o.closePath();
	this.o[this.type]();
}
// 多角形
palette.prototype.polystar=function(x1,y1,x2,y2){
	var r=this.getR(x1,y1,x2,y2);
	var r2=r*0.35;
	var n=this.snum;
	var ang=360/n/2;
	this.o.beginPath();
	for(var i=0;i<n*2;i++){
		if(i%2==0){
			this.o.lineTo(x1+Math.cos(ang*Math.PI/180*i)*r,y1+Math.sin(ang*Math.PI/180*i)*r);
		}else{
			this.o.lineTo(x1+Math.cos(ang*Math.PI/180*i)*r2,y1+Math.sin(ang*Math.PI/180*i)*r2);

		}
	}
	this.o.closePath();
	this.o[this.type]();
}

// 橡皮
palette.prototype.eraser=function(){
	var w=30;
	
	var that=this;
	this.copy.onmousedown=function(e){
		var mx=e.offsetX;
		var my=e.offsetY;
		var box=document.querySelector(".box");
		var d=document.createElement("div");
		d.style.cssText="width:"+w+"px;height:"+w+"px;position:absolute";
		box.appendChild(d);
		document.onmousemove=function(e){
			var ax=e.offsetX;
			var ay=e.offsetY;
			d.style.left=ax-w/2+"px";
			d.style.top=ay-w/2+"px";
			that.o.clearRect(ax-w/2,ay-w/2,w,w);
			console.log(d)
		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			box.removeChild(d);
		}
	}
}