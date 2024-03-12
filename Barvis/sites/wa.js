console.log('gamer')

var imgLink = "https://pps.whatsapp.net/v/t61.24694-24/248418001_715517589860227_8892786597633142011_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=29df58a90b743f5fd904dfff994d88fe&oe=62A3D302"
document.addEventListener('keydown', (e)=>{
	console.log(e.key, e.shiftKey)
	if(e.key=='D' && e.shiftKey==true){
		console.log('gadsming')
		document.querySelector("#main > header > div._24-Ff > div > div > span").innerHTML = "DEW"
		document.querySelector('#main > header > div._2YnE3 > div > img').src = imgLink

		document.querySelector("#pane-side > div > div > div > div:nth-child(11) > div > div > div > div._3OvU8 > div._3vPI2 > div.zoWT4 > span > span").innerHTML = "DEW"
		document.querySelector("#pane-side > div > div > div > div:nth-child(11) > div > div > div > div._2EU3r > div > div > img").src = imgLink
	}
})