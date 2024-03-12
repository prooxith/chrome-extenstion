var writer = document.querySelector(".writing-section")

async function getData(){
	writer.innerText = await getVal('datas')
}

getData()

async function setData(){
	await setVal('datas', writer.innerText)
}

document.querySelector('.title').onclick = function(){
	document.querySelector('.notepad-container').style.display = 'none'
	isGameStarted = false
	isEngShown = false
	document.querySelector('.workings').style.display = 'block'
}

writer.addEventListener("input", e=>{
	console.log(writer.innerText)
	setData()
	if(e.data == "e" || e.data == "t"){
		e.preventDefault()
	}
})
fdaklfdfda