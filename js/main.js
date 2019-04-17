var arr=new Array()

$(function(){
	init();
})

function init(){
	newGame();
	getRandSeq();
	getRandSeq();	

	
}

function newGame(){
	$(".upperBox").remove();
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