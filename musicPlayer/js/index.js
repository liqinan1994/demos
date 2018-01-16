var currentIndex = 0
var musicList = []
var audio = new Audio()
var clock
audio.autoplay = true

function $(selector){
	return document.querySelector(selector)
};

getMusicList(function(list){
	setmusicList(list)
	musicList = list
	loadMusic(list[currentIndex])
});

// 进度条和时间的改变
audio.ontimeupdate = function(){
	$('.musicBox .bar .progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
	// 由于ontimeupdate时间不均匀，故推荐使用setInterval;
	// var min = Math.floor(this.currentTime/60)
	// var sec = Math.floor(this.currentTime%60) + ''
	// sec.length === 2?sec = sec:sec = '0' + sec
	// $('.musicBox .time').innerText = min +':'+ sec
};

audio.onplay = function(){
   clock = setInterval(function(){
   	 var min = Math.floor(audio.currentTime/60)
	 var sec = Math.floor(audio.currentTime%60) + ''
	 sec.length === 2?sec = sec:sec = '0' + sec
	 $('.musicBox .time').innerText = min +':'+ sec
   },1000)
};
audio.onpause = function(){
	clearInterval(clock)
};

// 开始和暂停按钮
$('.music .control .play').addEventListener('click',function(){
	if(audio.paused){
		audio.play()
		$('.music .control .play>i').classList.remove('fa-play')
	    $('.music .control .play>i').classList.add('fa-pause')
	} else {
		audio.pause()
		$('.music .control .play>i').classList.remove('fa-pause')
	    $('.music .control .play>i').classList.add('fa-play')
		
	}
	
});

// 下一曲和上一曲，及结束自动播放；
$('.music .control .forward').addEventListener('click',function(){
	currentIndex = ++currentIndex % musicList.length
	loadMusic(musicList[currentIndex])
	if($('.music .control .play>i').classList.contains('fa-play')){
		$('.music .control .play>i').classList.remove('fa-play')
	    $('.music .control .play>i').classList.add('fa-pause')
	}
});
$('.music .control .backward').addEventListener('click',function(){
	currentIndex = (musicList.length + --currentIndex) % musicList.length
	loadMusic(musicList[currentIndex])
	if($('.music .control .play>i').classList.contains('fa-play')){
		$('.music .control .play>i').classList.remove('fa-play')
	    $('.music .control .play>i').classList.add('fa-pause')
	}
});
audio.onended = function(){
	currentIndex = ++currentIndex % musicList.length
	loadMusic(musicList[currentIndex])
};

// 进度条点击的时候快进到相应位置
$('.music-panel .bar').addEventListener('click',function(e){
	var percent = e.offsetX/parseInt(getComputedStyle(this).width)
	audio.currentTime = percent*audio.duration
})

$('.musicBox .list').onclick = function(e){
      if(e.target.tagName.toLowerCase() === 'li'){
        for(var i = 0; i < this.children.length; i++){
          if(this.children[i] === e.target){
            musicIndex = i
          }
        }
        console.log(musicIndex)
        loadMusic(musicList[musicIndex])
      }
    }

// 封装ajax
function getMusicList(callback){

	var xhr = new XMLHttpRequest()
	xhr.open('GET','./music.json',true)
	xhr.onload = function(){
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
			callback(JSON.parse(this.responseText))
		} else {
			console.log('获取数据失败')
	    }
	}
	
	 xhr.onerror = function(){
			console.log("网络异常")
	}
	
	xhr.send()
};

// 操作音乐
function loadMusic(musicObj){
   $('.music .info .title').innerText = musicObj.title
   $('.music .info .author').innerText = musicObj.author
   $('.cover').style.backgroundImage = "url(" + musicObj.img + ")"
   audio.src = musicObj.src
};

// 音乐列表
function setmusicList(musiclist){
	var container = document.createDocumentFragment()
	for(var musicobj in musiclist){
        var node = document.createElement('li')
        console.log(node)
        node.innerText = musiclist[musicobj].title + ' - ' + musiclist[musicobj].author
        container.appendChild(node)
	}
	$('.musicBox .list').appendChild(container)
}

