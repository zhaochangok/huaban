function palette(cobj,canvas,copy){
	this.o=cobj;
	this.canvas=canvas;
	this.copy=copy;
	this.width=canvas.width;
	this.height=canvas.height;
	this.style="stroke";//stroke||fill
	this.type="line";//line||rect||circle||triangle||pencil
	this.lineWidth=1;
	this.fillStyle="#000000";
	this.strokeStyle="#000000";
	this.bnum=5;
	this.jnum=5;
	this.ewidth=40;
	this.status=[];
}
palette.prototype.init=function(){
	this.o.strokeStyle=this.strokeStyle;
	this.o.fillStyle=this.fillStyle;
	this.o.lineWidth=$(".lineWidth input").val();
	$("span").text($(".lineWidth input").val());
}
palette.prototype.draw=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		var ev=e||window.event;
		var ox=ev.offsetX;
		var oy=ev.offsetY;
		that.init();
		document.onmousemove=function(e){
			that.o.clearRect(0,0,that.width,that.height);
			if(that.status.length>0){
				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height);
			}
			var ev=e||window.event;
			var mx=ev.offsetX;
			var my=ev.offsetY;
			that[that.type](ox,oy,mx,my);
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			// console.log(that.status);
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
	
}
palette.prototype.pencil=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		that.init();
		that.o.beginPath();
		document.onmousemove=function(e){
			if(that.status.length>0){
				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height);
			}
			var ev=e||window.event;
			var mx=ev.offsetX;
			var my=ev.offsetY;
			that.o.stroke();
			that.o.lineTo(mx-0.5,my-.5);
		}
		document.onmouseup=function(){
			that.o.closePath();
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
palette.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.stroke();
	this.o.closePath();
}
palette.prototype.rect=function(x1,y1,x2,y2){
	var w=x2-x1;
	var h=y2-y1;
	this.o.beginPath();
	this.o.rect(x1-.5,y1-.5,w,h);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.circle=function(x1,y1,x2,y2){
	var r=this.r(x1,y1,x2,y2);
	var cx=x1+(x2-x1)/2;
	var cy=y1+(y2-y1)/2;
	this.o.beginPath();
	this.o.arc(cx,cy,r,0,Math.PI*2);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.r=function(x1,y1,x2,y2){
	var ix=(x2-x1)/2;
	var iy=(y2-y1)/2;
	var r=Math.sqrt(Math.pow(ix,2)+Math.pow(iy,2));
	return r;
}
palette.prototype.triangle=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1-0.5,y1-0.5);
	this.o.lineTo(x1-0.5,y2-0.5);
	this.o.lineTo(x2-0.5,y2-0.5);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.earser=function(){
	var that=this;

	this.copy.onmousedown=function(e){
		var a=document.createElement("div");
		var w=that.ewidth;
		a.style.cssText="width:"+w+"px;height:"+w+"px;border:2px solid red;position:absolute;"
		that.copy.parentNode.appendChild(a);
		// if(that.status.length>0){
		// 	that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height);
		// }
		document.onmousemove=function(e){
			var ev=e||window.event;
			var ex=ev.offsetX;
			var ey=ev.offsetY;
			a.style.left=ex+"px";
			a.style.top=ey+"px";
			that.o.clearRect(ex-w/2,ey-w/2,w,w);
			
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			that.copy.parentNode.removeChild(a);
			document.onmousemove=null;
			document.onmouseup=null;
		}
		
	}
}
palette.prototype.poly=function(x1,y1,x2,y2){
	var r=this.r(x1,y1,x2,y2);
	var cx=x1+(x2-x1)/2;
	var cy=y1+(y2-y1)/2;
	var n=this.bnum;
	var ang=365/n;
	this.o.beginPath();
	for(var i=0;i<n;i++){
		this.o.lineTo(cx+Math.cos(Math.PI/180*ang*i)*r,cy+Math.sin(Math.PI/180*ang*i)*r);
	}
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.polyStar=function(x1,y1,x2,y2){
	var r=this.r(x1,y1,x2,y2);
	var r1=r*0.35;
	var cx=x1+(x2-x1)/2;
	var cy=y1+(y2-y1)/2;
	var n=this.jnum*2;
	var ang=365/n;
	this.o.beginPath();
	for(var i=0;i<n;i++){
		if(i%2==0){
			this.o.lineTo(cx+Math.cos(Math.PI/180*ang*i)*r,cy+Math.sin(Math.PI/180*ang*i)*r);
		}else{
			this.o.lineTo(cx+Math.cos(Math.PI/180*ang*i)*r1,cy+Math.sin(Math.PI/180*ang*i)*r1);
		}
	}
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.clear=function(){
	this.o.clearRect(0,0,this.width,this.height);
	this.status.push(this.o.getImageData(0,0,this.width,this.height));
	if(this.status.length>0){
		this.o.putImageData(this.status[this.status.length-1],0,0,0,0,this.width,this.height);
	}
	// this.status=null;
}