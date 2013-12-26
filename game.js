(function(){
	$(function(){
		var gameArray = getRandomArray();
		
		$.each( $("div.block"), function(index, value){
			var val = $(value);
			var pos = val.attr("pos");
			var newVal = gameArray[parseInt(pos)-1];
			val.attr("num", newVal);
			val.css("background-image", "url(img/" + newVal + ".jpg)");
		} );
		
		$("div[num='16']").css("visibility", "hidden");
		
		$("div.block").on("click",function() {			
			var that = $(this);
			
			var num = that.attr("num");
			var pos = that.attr("pos");
			
			var left = ['5', '9', '13'];
			var right = ['4', '8', '12'];			
			
			var next, prev, up, down;
			
			if ($.inArray(pos, left) != -1) {
				next = $("div.block[pos='" + (parseInt(pos) + 1) + "']");
			} else if ($.inArray(pos, right) != -1) {
			    prev = $("div.block[pos='" + (parseInt(pos) - 1) + "']");
			}
			else {
			    next = $("div.block[pos='" + (parseInt(pos) + 1) + "']");
			    prev = $("div.block[pos='" + (parseInt(pos) - 1) + "']");
			}			
						
			up = $("div.block[pos='" + (parseInt(pos) - 4) + "']");
			down = $("div.block[pos='" + (parseInt(pos) + 4) + "']");
			
			if (next && next.attr("num") == '16') {
				that.animate({left:'+=80px'}, 1000);
				next.animate({left:'-=80px'}, 10);
				that.attr("pos", next.attr("pos"));
				next.attr("pos", pos);
			}
			if (prev && prev.attr("num") == '16') {
			    that.animate({left:'-=80px'}, 1000);
				prev.animate({left:'+=80px'}, 10);
				that.attr("pos", prev.attr("pos"));
				prev.attr("pos", pos);
			}
			if (up && up.attr("num") == '16') {
			    that.animate({top:'-=80px'}, 1000);
				up.animate({top:'+=80px'}, 10);
				that.attr("pos", up.attr("pos"));
				up.attr("pos", pos);
			}
			if (down && down.attr("num") == '16') {
			    that.animate({top:'+=80px'}, 1000);
				down.animate({top:'-=80px'}, 10);
				that.attr("pos", down.attr("pos"));
				down.attr("pos", pos);
			}
			
			if (gameOver()) alert(" You Win !!! ");
		});
		
		function getRandom(arr) {
			return arr[Math.floor(Math.random()*(arr.length))];
        }
		
		function getRandomArray() {
		    var arr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);	
			for(var i = 0; i < 2; i++) {
			    var ind1 = getRandom(arr);
				var ind2 = getRandom(arr);
				if (ind1 != ind2) {
				    var tmp = arr[ind1-1];
					arr[ind1-1] = arr[ind2-1];
					arr[ind2-1] = tmp;
				}
			}
			return arr;			
		}
		
		function gameOver() {
		    var ret = true;
			$.each( $("div.block"), function(index, value) {
			    var val = $(value);
				var num = parseInt(val.attr("num"));
				var pos = parseInt(val.attr("pos"));
				if ( num != pos ) ret = false;
			});
			return ret;
		}
	});
})();