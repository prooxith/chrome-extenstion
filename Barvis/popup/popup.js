var soundButt = document.querySelector('.soundClick')
var ytButt = document.querySelector('.ytBlock')

async function initVals(){
    soundButt.innerHTML = await getVal('shouldSound')
    ytButt.innerHTML = await getVal('isYtBlocked')
}

initVals()

function setVal(key, val){
    chrome.storage.sync.set({[key] : val}, function(){
        console.log('f')
    })
}

var vals;

function getVal(key){
    return new Promise(function(resolve, reject){
        chrome.storage.sync.get([key], function(data){
            resolve(data[key])
        });
    })
}


async function toggle(element, key, url){
    console.log(element,key)
    if(await getVal(key)==true){
        setVal(key, false)

        element.innerHTML = 'false'
    }else{
        setVal(key, true)

        element.innerHTML = 'true'
    }
    chrome.tabs.query({}, function(tabs) {
        for(var i = 0 ; i<tabs.length ; i++){
            console.log(tabs[i].url.search(url))
            if ( tabs[i].url.search(url) !== -1 ){
                chrome.tabs.reload(tabs[i].id);
            }
        }
      // chrome.tabs.reload(tabs[0].id);
    });
}

dmodeSites = ["https://www.youtube.com/", "https://www.reddit.com/"]

soundButt.addEventListener("click", ()=>{
    toggle(soundButt, 'shouldSound', 'https://10fastfingers.com/')
})

ytButt.addEventListener("click", ()=>{
    for(var a = 0; a<dmodeSites.length; a++){
        toggle(ytButt, 'isYtBlocked', dmodeSites[a])
    }
})
