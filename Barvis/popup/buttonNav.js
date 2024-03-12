var isTextShown = false
var isEngShown = false

const workings = document.querySelector('.workings')
const typeButton = document.querySelector('.typeButton')

const switchTYPINGTEST=()=>{
	if(isTextShown){
		document.querySelector('.typetest-container').style.display = 'none'
		isTextShown = false
		workings.style.display = 'block'
	}else{
		document.querySelector('.typetest-container').style.display = 'flex'
		isTextShown = true
		workings.style.display = 'none'
	}
}

const switchEnglish=()=>{
	if(isEngShown){
		document.querySelector('.notepad-container').style.display = 'none'
		isEngShown = false
		workings.style.display = 'block'
	}else{
		var meh = document.querySelector('.notepad-container')
		meh.style.display = 'flex'
		isEngShown = true
		workings.style.display = 'none'
		isGameStarted = true
		placeCaretAtEnd(document.querySelector(".writing-section"))
	}
}

typeButton.addEventListener('click', ()=>{
	switchTYPINGTEST()
})

document.addEventListener('keyup', e=>{
	if(!isGameStarted){
		if(e.key == 't'){
			console.log('gamer')
			switchTYPINGTEST()
		}
		else if(e.key == "e"){
			console.log('meh')
			switchEnglish()
		}
	}
})


function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}