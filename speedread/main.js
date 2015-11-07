
var textInput = document.getElementById("textInput"),
	word = document.getElementById("word"),
	conent = document.getElementById("content");

function read(){
	var text = textInput.value.split(" "),
		i = 0;

	content.style.display = "block";

	//for (i = 0; i < text.length; i++){
	//	setTimeout(function(){word.innerHTML = text[i]; console.log(text[i]);}, 1000);

	//}
	if (i < text.length){
		setInterval(function(){setWord(text[i]); i++; console.log(text[i], i, text.length);}, 1000);
	}
}

function setWord(w){
	word.innerHTML = w;
}