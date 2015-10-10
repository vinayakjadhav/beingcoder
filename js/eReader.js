$(document).ready(function(){
	var tokens=[];
	var player = $('#player')[0];
	
	$(".readByGoogle").on("click",function(){
		var textToRead = $(".textToRead").val();
		tokens = textToRead.split(/\W/gi);
		$("audio").each(function () {
		    this.addEventListener("ended",function () {
		    	if(tokens.length!=0)
		    		playNext(tokens.shift());
		    });
		    this.addEventListener('error', function failed(e) {
				if(!$(this).src){
					playNext(tokens.shift());
				}
		    }, true);

		});
		player.play();			
	});
	
	$(".readByISpeech").on("click",function(){
		var textToRead = $(".textToRead").val();
		$('.audioSource').attr('src', 'http://www.ispeech.org/p/generic/getaudio?text='+encodeURIComponent(textToRead)+'%2C&voice=usenglishfemale&speed=-4&action=convert');
		player.load();
		player.play();
	});
	
	
	function playNext(word){
		var isWord = /\w/;
		if(isWord.test(word)){
			$('.audioSource').attr('src', 'https://ssl.gstatic.com/dictionary/static/sounds/de/0/'+word.toLowerCase()+'.mp3');
			player.load();
			player.play();
		}else{
			playNext(tokens.shift());
		}
	}
	
});
