$(function(){
	var $divs=$(".iconfont");
	var $box=$(".palette-box");
	var $add=$(".add");
	var copy=null;
	var canvas=$("<canvas>");
	var cobj=canvas[0].getContext("2d");
	var $fcolor=$(".fcolor");
	var $scolor=$(".scolor");
	var $back=$(".back");
	var $save=$(".save");
	$add.click(function(){
		var kd=prompt("请输入宽度","800");
		var gd=prompt("请输入高度","600");
		
		copy=$("<div>");
		canvas.attr({"width":kd,"height":gd});
		copy.css({"width":kd,"height":gd,position:"absolute",left:0,top:0,zIndex:9999});
		$box.css({"width":kd,"height":gd,"border":"1px solid #a40000","border-radius":"10px"}).append(canvas).append(copy);	
		create();
	
	})
	$fcolor.change(function(){

		pale.fillStyle=this.value;
	})
	$scolor.change(function(){
		pale.strokeStyle=this.value;
	})
	function create(){
		
		console.log(cobj)
		var pale=new palette(cobj,canvas[0],copy[0]);
		console.log(pale)
		$divs.click(function(){
			var role=$(this).attr("role");
			console.log(role);
			if(role!=undefined){
				if(role=="pencil"){
					pale.pencil();
				}else if(role=="poly"){
					var b=prompt("请输入边数","5")||5;
					pale.pnum=b;
					pale.style=role;
					pale.draw();
				}else if(role=="polystar"){
					var b=prompt("请输入边数","5")||5;
					pale.snum=b;
					pale.style=role;
					pale.draw();
				}else if(role=="fill"||role=="stroke"){
					pale.type=role;
					pale.draw();
				}
				else{
					pale.style=role;
					pale.draw();
				}
			}
		})
		$back.click(function(){
		
			if(pale.status.length>1){
        	    pale.status.pop();
        	    pale.o.putImageData(pale.status[pale.status.length-1],0,0,0,0,pale.width,pale.height);
			}else if(pale.status.length==1){
        	    pale.status.pop();
				pale.o.clearRect(0,0,pale.width,pale.height)
			}else{
				alert("不能撤销了！")
			}
		})
		$save.click(function(e){
			e.preventDefault();
			location.href=canvas[0].toDataURL().replace('image/png','image/octet-stream');
		})
	}
})