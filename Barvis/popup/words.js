


var getRandomWords = function(amount){
	var finalWords = []
	for (let i = 0; i < amount; i++) {
	  var x = wordsArr[Math.floor(Math.random() * wordsArr.length)];
	  finalWords.push(x)

	}
	return finalWords
}