//获取移动端的尺寸
//屏幕的宽度	
window.screen.availWidth;
var documentWidth=document.documentElement.clientWidth;
if (documentWidth>1500){
	documentWidth=1500;
}
var cellWidth=documentWidth*0.2;
var containerWidth=documentWidth*0.92;
var cellSpace=documentWidth*0.04;



//定义存储上层数字的数组
var arr=new Array();
var chage=new Array();
var score=0;
$(function(){
	init();
})

function init(){
	setMobile();
	newGame();
	getRandSeq();
	getRandSeq();	
	//重置分数
	$(".score").html(0);
	
}
function setMobile(){	
	$(".score-wrappers,.newGame").css({
		"padding":documentWidth/50+"px "+documentWidth/25+"px",
		"font-size":documentWidth*0.03+"px",
	});
	//$(".newGame").css("padding",documentWidth/50+"px "+documentWidth/25+"px")
	$(".title").css({
		fontSize:documentWidth*0.1+"px"
	})
	$(".author").css("fontSize",documentWidth*0.03+"px")
	$("#header").css({
		width:documentWidth,
	})

	$("#grid-container").css({
		'width':documentWidth,
		'height':documentWidth,
		'margin':documentWidth*0.1+" auto",
		'border-radius':documentWidth*0.05,
	})

	$(".grid-box").css({
		'width':cellWidth,
		'height':cellWidth,
	})

	$("#grid-container .upperBox").css({	
		
	    'line-height':cellWidth+"px",	
		'font-size':cellWidth/2+"px",	
	})
}

function newGame(){
	//初始化底层页面
	for(var i=1;i<5;i++){
		for(var j=1;j<5;j++){
			$("#grid-container #grid-box-"+i+"-"+j).css({
				"top":getPosTop(i,j),
				"left":getPosLeft(i,j),
			})
		}
	}
	//初始化数组
	for(var i=0;i<4;i++){
		arr[i]=new Array();
		chage[i]=new Array();
		for(var j=0;j<4;j++){
			arr[i][j]=0;
			chage[i][j]=0;
		}
	}
	
	//安排上层格子
	update();
}

function update(){
		$(".upperBox").remove();

		for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			//每一次移动完都更新
			chage[i][j]=0;
			row=i+1;column=j+1;
			var node=$("<div class='upperBox' id='upperBox-"+row+"-"+column+"'></div>");
			
			$("#grid-container").append(node);
			if(arr[i][j]==0){
				$("#upperBox-"+row+"-"+column).css({
					"width":0,
					"height":0,
					"top":getPosTop(row,column)+cellWidth*0.5,
					"left":getPosLeft(row,column)+cellWidth*0.5,
				})
			}else{
				$("#upperBox-"+row+"-"+column).css({
					
					"width":cellWidth,
					"height":cellWidth,
					"top":getPosTop(row,column),
					"left":getPosLeft(row,column),
					"background-color":getBgColor(arr[i][j]),
					"color":getTextColor(arr[i][j]),

				}).text(arr[i][j])
			}
			$("#grid-container .upperBox").css({	
		
	    	'line-height':cellWidth+"px",	
			'font-size':cellWidth/2+"px",	
			})

		}
	}
}

function getRandSeq(){
	if(noSpace()){
		return;
	}
	//找一个非空的位置
	var arrTem=new Array();
	var count=0;
	for(var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			if(arr[i][j]==0){
				temp=4*i+j;
				arrTem[count]=temp;
				count++;
			}
		}
	}
	
	var num1=Math.floor(Math.random()*count);
	
	var row=Math.floor(arrTem[num1]/4);
	var column=arrTem[num1]%4;
	
	//随机生成2或者4
	TwoOrF=Math.random()>=0.5?2:4;
	arr[row][column]=TwoOrF;

	showBox(row,column,TwoOrF)
	// var i1=(Math.floor(Math.random()*4));
	// var i2=(Math.floor(Math.random()*4));
	// num=Math.ceil((Math.random()*2))*2
	// arr[i1][i2]=num;
	// var ran=[i1,i2];
	// return ran;
}

// 实现键盘相应
$(document).keydown(function(event){
	event.preventDefault();
	switch(event.keyCode){
		case 37:{
			//判断是不是能动
			var canmove=moveToLeft();
			isGameOver(canmove);
			break;
		}
		case 38:{
			var canmove=moveToUp();
			isGameOver(canmove);
			break;
		}
		case 39:{
			var canmove=moveToRight();
			isGameOver(canmove);
			break;
		}
		case 40:{
			var canmove=moveToDown();
			isGameOver(canmove);
			break;
		}
	}
})

document.addEventListener("touchstart",function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
})

document.addEventListener("touchend",function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;

	//判断滑动方向
	var delatx=endx-startx;
	var deltay=endy-starty;
	if(Math.abs(delatx)>=Math.abs(deltay)){//水平
		if(delatx>0){
			var canmove=moveToRight();
			isGameOver(canmove);
		}else{
			var canmove=moveToLeft();
			isGameOver(canmove);
		}
	}else{
		if (deltay>0) {
			var canmove=moveToDown();
			isGameOver(canmove);
		}else{
			var canmove=moveToUp();
			isGameOver(canmove);
		}
	}
})


function moveToLeft(){
	var canmove=false;
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			//找到有数字的格子
			if (arr[i][j]!=0){
				for(var k=0;k<j;k++){
					if(arr[i][k]==0 && IscrossNull(i,k,i,j)){
						canmove=true;
						move(i,j,i,k);
						arr[i][k]=arr[i][j];
						arr[i][j]=0;
						break;
					}
					if(arr[i][k]==arr[i][j]&&IscrossNull(i,k,i,j)&&chage[i][k]==0){
						move(i,j,i,k);
						canmove=true;
						arr[i][k]=arr[i][j]*2;
						arr[i][j]=0;
						chage[i][k]=1;
						score+=arr[i][k];
						$(".score").html(score)
						break;
					}
				}
			}
		}
	}
	if (canmove){
		getRandSeq();
	}
	setTimeout(update,200)
	return canmove;
}

function moveToUp(){
	var canmove=false;
	for (var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(arr[i][j]!=0){
				for(var k=0;k<i;k++){
					if(arr[k][j]==0 && IscrossNull(k,j,i,j)){
						canmove=true;
						move(i,j,k,j)
						// setTimeout(getRandSeq,200);
						arr[k][j]=arr[i][j];
						arr[i][j]=0;
						break;
					}

					if(arr[k][j]==arr[i][j] && IscrossNull(k,j,i,j)&&chage[k][j]==0){
						move(i,j,k,j)
						// setTimeout(getRandSeq,200);
						arr[k][j]=arr[i][j]*2;
						arr[i][j]=0;
						chage[k][j]=0;
						score+=arr[k][j];
						$(".score").html(score);
						canmove=true;			
						break;
					}
					
				}
			}
		}
	}
	if (canmove){
		getRandSeq();
	}
	setTimeout(update,200)
	return canmove;
}

function moveToRight(){
	var canmove=false;
	for (var i=3;i>=0;i--){
		for(var j=3;j>=0;j--){
			if(arr[i][j]!=0){
				for(var k=3;k>j;k--){
					if(arr[i][k]==0 && IscrossNull(i,j,i,k)){
						canmove=true;
						move(i,j,i,k);
						arr[i][k]=arr[i][j];
						arr[i][j]=0;
						break;
					}

					if(arr[i][k]==arr[i][j]&& IscrossNull(i,j,i,k)&&chage[i][k]==0){
						canmove=true;
						move(i,j,i,k);
						arr[i][k]=arr[i][j]*2;
						arr[i][j]=0;
						chage[i][k]=1;
						score+=arr[i][k];
						$(".score").html(score);
						break;
					}
				}
			}
		}
	}
	if (canmove){
		getRandSeq();
	}
	setTimeout(update,200);
	return canmove;
}

function moveToDown(){
	var canmove=false;
	for (var i=3;i>=0;i--){
		for (var j=3;j>=0;j--){
			if (arr[i][j]!=0){
				for (var k=3;k>i;k--){
					if(arr[k][j]==0&&IscrossNull(i,j,k,j)){
						move(i,j,k,j);
						arr[k][j]=arr[i][j];
						arr[i][j]=0;
						canmove=true;
						break;
					}

					if(arr[k][j]==arr[i][j]&& IscrossNull(i,j,k,j)&&chage[k][j]==0){
						move(i,j,k,j)
						arr[k][j]=arr[i][j]*2;
						arr[i][j]=0;
						chage[k][j]=1;
						canmove=true;
						score+=arr[k][j];
						$(".score").html(score);
						break;
					}
				}
			}
		}
	}
	if (canmove){
		getRandSeq();
	}
	setTimeout(update,200)
	return canmove;

}