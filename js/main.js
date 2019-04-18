var arr=new Array()
var score=0;
$(function(){
	init();
})

function init(){
	newGame();
	getRandSeq();
	getRandSeq();	

	
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
		for(var j=0;j<4;j++){
			arr[i][j]=0;
		}
	}

	//安排上层格子
	update();
}

function update(){
		$(".upperBox").remove();
		for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			row=i+1;column=j+1;
			var node=$("<div class='upperBox' id='upperBox-"+row+"-"+column+"'></div>");
			$("#grid-container").append(node);
			if(arr[i][j]==0){
				$("#upperBox-"+row+"-"+column).css({
					"width":0,
					"height":0,
					"top":getPosTop(row,column)+50,
					"left":getPosLeft(row,column)+50,
				})
			}else{
				$("#upperBox-"+row+"-"+column).css({
					"top":getPosTop(row,column),
					"left":getPosLeft(row,column),
					"background-color":getBgColor(arr[i][j]),
					"color":getTextColor(arr[i][j]),
				}).text(arr[i][j])
			}
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

//实现键盘相应
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37:{
			//判断是不是能动
			moveToLeft();
			break;
		}
		case 38:{
			moveToUp();
			break;
		}
		case 39:{
			moveToRight();
			break;
		}
		case 40:{
			moveToDown();
			break;
		}
	}
})

function moveToLeft(){
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			//找到有数字的格子
			if (arr[i][j]!=0){
				for(var k=0;k<j;k++){
					if(arr[i][k]==0 && IscrossNull(i,j,i,k)){
						var canmove=true;
						move(i,j,i,k);
						arr[i][k]=arr[i][j];
						arr[i][j]=0;
						break;
					}
					if(arr[i][k]==arr[i][j]&&IscrossNull(i,j,i,k)){
						move(i,j,i,k);
						var canmove=true;
						arr[i][k]=arr[i][j]*2;
						arr[i][j]=0;
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
}

function moveToUp(){
	for (var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(arr[i][j]!=0){
				for(var k=0;k<i;k++){
					if(arr[k][j]==0 && IscrossNull(k,j,i,j)){
						var canmove=true;
						move(i,j,k,j)
						// setTimeout(getRandSeq,200);
						arr[k][j]=arr[i][j];
						arr[i][j]=0;
						break;
					}

					if(arr[k][j]==arr[i][j] && IscrossNull(k,j,i,j)){
						move(i,j,k,j)
						// setTimeout(getRandSeq,200);
						arr[k][j]=arr[i][j]*2;
						arr[i][j]=0;
						score+=arr[k][j];
						$(".score").html(score);
						var canmove=true;			
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
}

function moveToRight(){
	for (var i=3;i>=0;i--){
		for(var j=3;j>=0;j--){
			if(arr[i][j]!=0){
				for(var k=3;k>j;k--){
					if(arr[i][k]==0 && IscrossNull(i,j,i,k)){
						var canmove=true;
						move(i,j,i,k);
						arr[i][k]=arr[i][j];
						arr[i][j]=0;
						break;
					}

					if(arr[i][k]==arr[i][j]&& IscrossNull(i,j,i,k)){
						var canmove=true;
						move(i,j,i,k);
						arr[i][k]=arr[i][j]*2;
						arr[i][j]=0;
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
	setTimeout(update,200)
}

function moveToDown(){
	for (var i=3;i>=0;i--){
		for (var j=3;j>=0;j--){
			if (arr[i][j]!=0){
				for (var k=3;k>i;k--){
					if(arr[k][j]==0&&IscrossNull(i,j,k,j)){
						move(i,j,k,j);
						arr[k][j]=arr[i][j];
						arr[i][j]=0;
						var canmove=true;
						break;
					}

					if(arr[k][j]==arr[i][j]&& IscrossNull(i,j,k,j)){
						move(i,j,k,j)
						arr[k][j]=arr[i][j]*2;
						arr[i][j]=0;
						var canmove=true;
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
	
}