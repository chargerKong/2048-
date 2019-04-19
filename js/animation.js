function showBox(i,j,TwoOrF){
	
	row=i+1;column=j+1;
	$("#upperBox-"+row+"-"+column).animate({
		"width":cellWidth,
		"height":cellWidth,
		"top":getPosTop(row,column),
		"left":getPosLeft(row,column),
	},500).css({
		"background-color":getBgColor(TwoOrF),
		"color":getTextColor(TwoOrF),
	}).text(TwoOrF)
	
}

function move(orgx,orgy,tox,toy){
	row=orgx+1;column=orgy+1;
	$("#upperBox-"+row+"-"+column).animate({
		'top':getPosTop(tox+1,toy+1),
		'left':getPosLeft(tox+1,toy+1),
	},200)
	
}