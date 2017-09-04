yc.$("buyfood").onclick=function(){
	yc.$("bgleft").style.display="none";
	yc.$("content").style.display="none";

	//发送请求
	yc.xssRequest("http://localhost:8080/res/resorder.action?num=1&op=order&fid="+fid,{
		"completeListener":function(){
			var json=this.responseJSON;
			//判断
			if(json.code==0){
				alert(json.msg);
			}else if(json.code==1){
				//添加成功

		      yc.$("shopcar").innerHTML=null;
	         yc.$("shopcar").innerHTML='<span id="order">确定下单</span>';
	         shop();
			}
		}
	});
}

function shop(){
	yc.xssRequest("http://localhost:8080/res/resorder.action?op=getCartInfo",{
		"completeListener":function(){
			var json=this.responseJSON;
			//用来计数
			var count=0;
			for(var temp in json.obj){
				if(json.obj.hasOwnProperty(temp) ){
					count++;
				}
			}
			if(count>0){
				//循环创建div
				for(var i in json.obj){
					//取值
					//json.obj[i].food.fname;
					if(json.obj.hasOwnProperty(i)){
						fnum=json.obj[i].num;
						fprice=json.obj[i].smallCount;
						fod=json.obj[i].food;

						var div=document.createElement("div");
						var p=document.createElement("p");
						var span1=document.createElement("span");
						var span2=document.createElement("span");
						var span3=document.createElement("span");
						var span4=document.createElement("span");

						p.id="food";
						p.innerHTML='<img width="18px" height="18px" src="http://localhost:8080/res/images/'+fod.fphoto+'">&nbsp;&nbsp;'+fod.fname;
						span1.innerHTML='<span id="allprice">小计：'+fprice+'</span>';
						span2.innerHTML='<span id="num">'+fnum+'</span>';
						span3.id="addnum";
						span4.id="reducenum";
						(function(index){
							//span3的点击事件，添加数量
							span3.onclick=function(){
								if(json.code==0){
									alert(json.msg);
								}else  if(json.code==1){
									yc.$("shopcar").innerHTML="";
									shop();
								} 
								/*fnum++;
    						  span2.innerHTML='<span id="num">'+fnum+'</span>';
    						  span1.innerHTML='<span id="allprice">小计：'+(fprice*fnum)+'</span>';*/
							}
							//span4的点击事件，减少数量
							span4.onclick=function(){
								if(json.code==0){
									alert(json.msg);
								}else  if(json.code==1){
									yc.$("shopcar").innerHTML="";
									shop();
								} 

								/*fnum--;
								
								if(fnum==0){
									div.innerHTML="";
	
								 }else {
								  span2.innerHTML='<span id="num">'+fnum+'</span>';
									span1.innerHTML='<span id="allprice">小计：'+(fprice*fnum)+'</span>';	
								}*/
    						  
							}
						})(i)
						div.appendChild(p);
						div.appendChild(span1);
						div.appendChild(span2);
						div.appendChild(span3);
						div.appendChild(span4);
						yc.prependChild(yc.$("shopcar"),div);
					}
				}
				//显示数量
				yc.$("foodnum").style.display="block";
				yc.$("foodnum").innerHTML=count;
			}else{
				alert("请先添加商品");
			}
		}
	});
}
shop();


//点击显示购物车
yc.$("car").onclick=function(){
	if(yc.$("shopcar").getElementsByTagName("div").length>0){
		if(yc.$("shopcar").style.display!="block"){
			yc.$("shopcar").style.display="block";
		}else{
			yc.$("shopcar").style.display="none";
		}
	}else{
		alert("请先购买商品");
	}
}

 
/*yc.$("car").onclick=function(){
	yc.$("shopcar").style.display="block";
	
        yc.xssRequest("http://192.168.19.74:8080/res/resorder.action?op=getCartInfo",{
			"completeListener":function(){
				var shopcarJson=this.responseJSON;   //局部变量
   	  			
   	  			console.log(shopcarJson);
   	  			//shopcarJson[i].fname
   	  			for(var i=0;shopcarJson.length>0;i++){
   	  				console.log(1);
   	  				var b=shopcarJson[i].fname;
   	  				var p=document.createElement("p");
   	  				p.id=shopcarJson[i].fid;
   	  				p.innerHTML=b;
   	  				console.log(b);

   	  				//var tags=yc.$("shopcar").getElementsByTagName("p");
   	  				//yc.$("shopcar").removeChild(  yc.$("shopcar").firstChild  );
   	  				yc.$("shopcar").appendChild(p);
   	  				/*if(tags.length>8){
   	  					yc.$("shopcar").removeChild(  yc.$("shopcar").firstChild  );
   	  					yc.$("shopcar").appendChild(p);
   	  				}else{
   	  					yc.$("shopcar").appendChild(p);
   	  				}*/
   	  			/*}

			}
		});
	shopcarShow();
	
	
}*/

/*function shopcarShow(){
	 yc.xssRequest("http://192.168.19.74:8080/res/resorder.action?op=getCartInfo",{
			"completeListener":function(){
				var shopcarJson=this.responseJSON;   //局部变量
   	  			
   	  			console.log(shopcarJson);
   	  			//shopcarJson[i].fname
   	  			for(var i=0;shopcarJson.length>0;i++){
   	  				console.log(1);
   	  				var b=shopcarJson[i].fname;
   	  				var p=document.createElement("p");
   	  				p.id=shopcarJson[i].fid;
   	  				p.innerHTML=b;
   	  				console.log(b);
   	  				
   	  				yc.$("shopcar").appendChild(p);
   	  				
   	  			}

			}
		});
}*/