var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var lifirst = document.querySelector(".scene01");
var audio_btn = document.querySelector("#audio_btn");
var media = document.querySelector("#audio_btn > #media");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
if(winW/winH<desW/desH){
    main.style.webkitTransform = "scale("+winH/desH+")";
}else{
    main.style.webkitTransform = "scale("+winW/desW+")";
}

var arr= ['scene01bg.jpg', 'scene02bg.jpg', 'scene03bg.jpg', 'scene04bg.jpg', 'green_grass.png', 'plum3.png', 'flower_disk.png', 'cloud.png','cloud2.png', 'willow.png', 'sun.png'];
var num = 0;
var loading = document.querySelector("#loading");
fnLoad();
media.pause();
function fnLoad(){
    for(var i = 0;i<arr.length;i++){
        var oImg = new Image();
        oImg.src = "images2/"+arr[num];
        oImg.onload = function(){
            num++;
           //pSpan.style.width = num/(arr.length)*100+"%";
            if(num ==11&&loading){
                loading.parentNode.removeChild(loading);
                loading=null;
                lifirst.id = "scene01";
                media.play();
            }
        }
    }
}


[].forEach.call(oLis,function(){
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart",start,false);
    oLi.addEventListener("touchmove",move,false);
    oLi.addEventListener("touchend",end,false);
})
function start(e){
    this.startY = e.changedTouches[0].pageY;
}
function move(e){
    this.flag = true;
    e.preventDefault();
    var moveTouch = e.changedTouches[0].pageY;//move时的坐标
    var movePos = moveTouch-this.startY;//移动的距离
    var index = this.index;
    [].forEach.call(oLis,function(){
        arguments[0].className = "";
        if(arguments[1]!=index){
            arguments[0].style.display = "none";
        }
        arguments[0].firstElementChild.id="";
    })
    if(movePos>0){/*↓*/
        var pos = -winH+movePos;
        this.prevsIndex = (index ==0?oLis.length-1:index-1);//上一张索引
    }else if(movePos<0){/*↑*/
        var  pos = winH+movePos;
        this.prevsIndex = (index == oLis.length-1?0:index+1);//下一张的索引

    }
    oLis[this.prevsIndex].className = "zIndex";
    oLis[this.prevsIndex].style.display = "block";
    oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+pos+"px)";
    //this.style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+")  translate(0,"+movePos+"px)";


}
function end(e){
    if(this.flag){
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.7s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(e){
            if(e.target.tagName == "LI"){
                this.style.webkitTransition = "";
            }
            this.firstElementChild.id="scene0"+(this.index+1);
        },false)
    }

}
document.addEventListener("touchmove",function(e){
    console.log(e.target.id);
},false)

audio_btn.onclick = function(){
    if(media.paused)                     {
        media.play();//audio.play();// 这个就是播放
        this.className = "off video_exist rotate";
    }else{
        media.pause();// 这个就是暂停
        this.className = "off video_exist";
    }
}
