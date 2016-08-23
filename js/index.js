var divs=$(".xx>div");
var types=$(".type>div")
// alert(types.length);
var xjhb=$(".xjhb")
xjhb.fadeOut(0);
var palt=null;
var canvas=null;
var copy=null;
var width1=$(".width1");
var height1=$(".height1");
var w=1000;
var h=600;
divs.click(function(){
	var role=$(this).attr("role");
	// alert(role);
	var index=$(this).index(".xx>div");
	$(divs).removeClass("active").eq(index).addClass("active");
	if(role=="new"){
		if($(".right:has(canvas)")){
			$("canvas").remove();
			$("div").remove(".copy");
		}
		xjhb.fadeIn(500);
		width1.change(function(){
			w=this.value;
		});
		height1.change(function(){
			h=this.value;
		});
		$(".qd").click(function(){
			canvas=$("<canvas>").attr({width:w,height:h});
			copy=$("<div class='copy'>");
			copy.css({width:w+"px",height:h+"px"})
			xjhb.fadeOut(500);
			$(".right").append(canvas).append(copy);
			palt=new palette(canvas[0].getContext("2d"),canvas[0],copy[0]);
			palt.pencil();

		});
		$(".qx").click(function(){
			xjhb.fadeOut(500);
		})
		// $(".right").remove(canvas);
		// var w=prompt("width","1000");
		// var h=prompt("height","600");
		// var canvas=$("<canvas width="+w+" height="+h+">");
		// var copy=$("<div class='copy'>");
		// copy.css({width:w+"px",height:h+"px"})
		// $(".right").append(canvas).append(copy);
		// // console.log(canvas);
		// // console.log(canvas[0]);
		// palt=new palette(canvas[0].getContext("2d"),canvas[0],copy[0]);
	}
	if(role=="save"){
		var a=canvas[0].toDataURL();
		location.href=a.replace('image/jpg','image/octet-stream')
	}
	if(role=="clear"){
		palt.clear();
	}
	if(role=="back"){
		if(palt.status.length>1){
			palt.status.pop();
			palt.o.putImageData(palt.status[palt.status.length-1],0,0,0,0,palt.width,palt.height);
		}else if(palt.status.length==1){
			palt.status.pop();
			palt.o.clearRect(0,0,palt.width,palt.height);
		}else{
			alert("不能撤消了！");
		}
	}
	if(role=="line"){
		palt.type="line";
		palt.draw();
	}
	if(role=="rect"){
		palt.type="rect";
		palt.draw();
	}
	if(role=="circle"){
		palt.type="circle";
		palt.draw();
	}
	if(role=="triangle"){
		palt.type="triangle";
		palt.draw();
	}
	if(role=="poly"){
		palt.bnum=prompt("边数","5");
		palt.type="poly";
		palt.draw();
	}
	if(role=="polyStar"){
		palt.jnum=prompt("角数","5");
		palt.type="polyStar";
		palt.draw();
	}
	if(role=="pencil"){
		palt.pencil();
	}
	if(role=="earser"){
		palt.earser();
	}
})

$(".lineWidth input").change(function(){
	// alert(this.value)
	palt.lineWidth=this.value;
	$("span").text(this.value);
})
types.click(function(){
	var role1=$(this).attr("role");
	if(role1=="strokeStyle"){

		palt.style="stroke";
		
		$(".strokeStyle input").change(function(){
			palt.strokeStyle=this.value;
		})
	}
	if(role1=="fillStyle"){
		palt.style="fill";
		$(".fillStyle input").change(function(){
			palt.fillStyle=this.value;
		});
	}
})

