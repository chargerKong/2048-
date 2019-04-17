function showBox(i,j,TwoOrF){
	row=i+1;column=j+1;
	$("#upperBox-"+row+"-"+column).animate({
		"top":getPosTop(row,column),
		"left":getPosLeft(row,column),
		"width":"100px",
		"height":"100px"
	},500).css({
		"background-color":getBgColor(TwoOrF),
		"color":getTextColor(TwoOrF),
	}).text(TwoOrF)
}