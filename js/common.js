function getPosTop(i,j){
	return cellSpace+(documentWidth*0.24)*(i-1);
}

function getPosLeft(i,j){
	return cellSpace+(documentWidth*0.24)*(j-1);
}

function getBgColor(num){
	switch(num){
		case 2:return '#eee4da'; break;
		case 4:return '#ede0c8'; break;
		case 8:return '#f2b179'; break;
		case 16:return '#f59563'; break;
		case 32:return '#f67c5f'; break;
		case 64:return '#f65e3b'; break;
		case 128:return '#edcf72'; break;
		case 256:return '#edcc61'; break;
		case 512:return '#9c0'; break;
		case 1024:return '#a6c'; break;
		case 2048:return '#33b5e5'; break;
		case 4096:return '#a6c'; break;
	}
}
//获取数字颜色
function getTextColor(num){
	if (num>=8) {
		return "white";
	}else{
		return "#776e65";
	}
}

function noSpace(){
	for (var i = 0; i < 4; i++){
		for (var j=0;j<4;j++){
			if(arr[i][j]==0){
				return false
			}
		}
	}

	return true;
}

function IscrossNull(minx,miny,maxx,maxy){
	if (minx==maxx){
		var sum=0;
		for(var j=miny+1;j<maxy;j++){
			sum=sum+arr[minx][j];
		}
		
	}else if (miny==maxy) {
		var sum=0;
		for (var i=minx+1;i<maxx;i++){
			sum=sum+arr[i][maxy];
		}
	}
	if (sum==0){
			return true;
		}else {
			return false;
	}

}

function isGameOver(canmove){
	if(noSpace()&& !canmove){
		alert('游戏结束');
		init();
	}
}