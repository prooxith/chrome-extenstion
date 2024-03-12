var textToType = document.querySelector('.texttotype')
const inputEl = document.querySelector('.input')

const startMenu = document.querySelector('.startMenu')
const startbutt = document.querySelector('.startButt')

const warning = document.querySelector('.warning')

const wordsContainer = document.querySelector('.wordsContainer')

const restartMenu = document.querySelector('.RestartMenu')
const restartButt = document.querySelector('.restartButt')

const timerEl = document.querySelector('.timer')

var startTime = Date.now()

var arrayWords

const wpmEl = document.querySelector('.wpm')

var cursor = document.querySelector('.cursor')

var caretInt
var wpmInt
var moverInt
var timerInt

var X = textToType.offsetLeft
var Y = textToType.offsetTop
let countdown=0;
let mistakes = 0;
var daWPM = 0
var isGameStarted
var whichScreen = 'start'

var sampWords = ['their', 'night', 'grow', 'read', 'name', 'talk', 'each', 'might', 'place', 'cut', 'good', 'before', 'about', 'can', 'should', 'the', 'our', 'with', 'time', 'read', 'help', 'men', 'we', 'family']

startbutt.addEventListener('click', e=>{
	startMenu.style.display = 'none'
	textToType.style.display = 'block'

	startGame()
})

restartButt.addEventListener('click', e=>{
	restartMenu.style.display = 'none'
	textToType.style.display = 'block'

	startGame()
})

function startGame(){
	resetVars()
	getWords()
	caretInt = setInterval(fixCaret, 100);
	wpmInt = setInterval(wpmCounter, 1000)
	moverInt = setInterval(mover, 200)
	timer()
}

function getWords(){
	wordsContainer.innerHTML = ''
  	wordArr = getRandomWords(100).join(' ').split(' ')
  	wordArr.forEach((word, index)=>{
  		var wordEl = document.createElement('span')
  		wordEl.classList.add('word')

  		var charArr = word.split('').forEach(async(char, index)=>{
  			const charEl = document.createElement('span')

  			charEl.innerText = char
  			charEl.classList.add('char')
  			wordEl.appendChild(charEl)

  		})
  		wordsContainer.appendChild(wordEl)

  		if(index!==99){
  			const spaceWEl = document.createElement('span')
  			spaceWEl.classList.add('word')

  			const spaceEl = document.createElement('span')
  			spaceEl.classList.add('char', 'spaceHi')
  			spaceEl.innerText = ' '
  			spaceWEl.append(spaceEl)

  			wordsContainer.appendChild(spaceWEl)
  		}
  });
	arrayWords = wordsContainer.querySelectorAll('.char')
	isGameStarted = true
}

function pauseAllIntervals(){
	clearInterval(caretInt)
	clearInterval(wpmInt)
	clearInterval(moverInt)
	clearInterval(timerInt)
}

function resetVars(){
	countdown=0;
	mistakes = 0;
	daWPM = 0
	isGameStarted = false
	whichScreen = ''
	textToType.style.top = ''
	inputEl.value = ''
}

function endMoment(){
	isGameStarted = false
	pauseAllIntervals()
	document.querySelector('.showWPM').innerText = `Your WPM WAS ` + daWPM

	textToType.style.display = 'none'
	restartMenu.style.display = 'flex'
	whichScreen = 'res'
	console.log('end moment called')
}

function timer(){

	timerInt = setInterval(()=>{
		if(countdown>=59){
			countdown = 0
			pauseAllIntervals()
			endMoment()
			return
		}
		countdown += 1
		timerEl.innerText = countdown + 's'
	}, 1000)

}

const mover=()=>{
	if(countdown>10 && countdown%5==0){
		var textToTop = parseInt(window.getComputedStyle(textToType).top.slice(0,-2))
		textToType.style.top = textToTop-5 + 'px'
	}
}

const fixCaret = () => {

	var charIndex = inputEl.value.length

	if(charIndex+1==arrayWords.length){
		endMoment()
	}

	var charr

	arrayWords.forEach((charrr, index)=>{
		if(index==charIndex){
			charr = charrr

			var charX = charr.offsetLeft
			var charY = charr.offsetTop

			cursor.style.left = charX.toString() + 'px'
			cursor.style.top = charY.toString() + 'px'
		}
		
	})

}

const wpmCounter=()=>{

	const charIndex = inputEl.value.length 

	if(charIndex-mistakes <= -0){
		wpm = 0
	}
	else{
		console.log(countdown)
		var wpm = Math.round( (((charIndex-mistakes) / 5) / countdown)*60 )
		// var wpm = (( ( (charIndex - mistakes) / 5) * 60 *1000) / (Date.now() - startTime)).toFixed(2)
	}
	if(wpm==Infinity) wpm = 0
	daWPM = wpm
	wpmEl.innerText = wpm + ' Wpm'
}


textToType.addEventListener('click', function(){
	inputEl.focus()
})

document.addEventListener("keydown", (e) => {

	if (event.getModifierState("CapsLock")) {
    warning.style.display = "block";
  } else {
    warning.style.display = "none"
  }

  if(e.key == 'a' && e.ctrlKey==true || e.key == 'v' && e.ctrlKey==true ){
  	e.preventDefault()
  	return
  }

	if(!isGameStarted){
		if(e.code == 'Enter'){
			if (whichScreen=='res'){
				console.log('enter')
				restartMenu.style.display = 'none'
				textToType.style.display = 'block'

				startGame()
			}else if(whichScreen == 'start'){
				startMenu.style.display = 'none'
				textToType.style.display = 'block'

				startGame()
			}
		}
		inputEl.blur()
		return
	}else if(e.code == 'F5'){
		pauseAllIntervals()
		e.preventDefault()
		startGame()
	}else if(e.code=='Escape'){
		e.preventDefault()
		endMoment()
	}

	inputEl.focus()
})

inputEl.addEventListener("input", (val)=>{

	if(!isGameStarted) return
    // Do the normal stuff for this function
	const inpValArr = inputEl.value.split('')
	const charIndex = inputEl.value.length 


	var charr;

	arrayWords.forEach((char, index)=>{
		// console.log([1])
		// console.log(char.innerText, inputEl.value.toString()[charIndex])

		const character = inpValArr[index]

		if(character==null){
			char.classList.remove('correct')
			char.classList.remove('incorrect')
		}else if(character == char.innerText){
			if(mistakes!==0){
				mistakes-=1
			}

			charr = char
			char.classList.add('correct')
			char.classList.remove('incorrect')

		}else{
			mistakes+=1
			charr = char
			char.classList.remove('correct')
			char.classList.add('incorrect')

		}

			// char.classList.remove('active')
	})
			// charr.classList.add('active')

})
