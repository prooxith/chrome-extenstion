
lastwords = ''

function setVal(key, val){

    chrome.storage.sync.set({[key] : val}, function(){
        console.log('f')
    })
}

function getVal(key){
    return new Promise(function(resolve, reject){
        chrome.storage.sync.get([key], function(data){
            resolve(data[key])
        });
    })
}

document.addEventListener("keydown", async e=>{
	// console.log(getVal('isYtBlocked'))
	lastwords += (e.key)
	if(lastwords=='meh'){
		
		if(await getVal('isYtBlocked')==true){
        	setVal('isYtBlocked', false)
		}else{
			setVal('isYtBlocked', true)
		}
        location.reload()

	}
	console.log(lastwords)
	if(lastwords.length >= 3){
		lastwords = ''
	}
})

function waitBody(){
	setTimeout(()=>{
		if(!document.body){
			waitBody()
		}
		else{
			window.stop()
			console.info('blocked by great onwi')
			document.documentElement.innerHTML = '<h1 style="text-align:center;font-size:40px;">Eat Shit</h1>'
			document.title = 'SHEESH'
		}
	}, 100)
}

async function init(){
	if(await getVal('isYtBlocked')===true){
		waitBody()
	}
}
init()



