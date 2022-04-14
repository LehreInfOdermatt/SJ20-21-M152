/*Many Clean-Coding Guidelines were ignored in the making of this code, our condolences*/

let video_node = document.getElementsByTagName("video").item(0);
let play_button = document.getElementById("play-pause");
let incVolume_button = document.getElementById("noise-up");
let decVolume_button = document.getElementById("noise-down");
let toggleLoop_button = document.getElementById("toggle-loop");
let togglePlayback_button = document.getElementById("toggle-playback-speed");

play_button.addEventListener("click",() => {
    if(video_node.paused){
        play_button.innerHTML = "Pause"
        video_node.play();
    } else {
        play_button.innerHTML = "Play"
        video_node.pause();
    }
});

incVolume_button.addEventListener("click",() => {
    if(video_node.volume == 1){
        // Do Nothing
    } else {
        video_node.volume = (video_node.volume + 0.1);
    }
});

decVolume_button.addEventListener("click",() => {
    if(video_node.volume == 0){
        // Do Nothing
    } else {
        video_node.volume = (video_node.volume - 0.1);
    }
});

toggleLoop_button.addEventListener("click",() => {
    if(!video_node.loop){
        toggleLoop_button.innerHTML = "End Loop"
        video_node.loop = true;
    } else {
        toggleLoop_button.innerHTML = "Start Loop"
        video_node.loop = false;
    }
});

togglePlayback_button.addEventListener("click",() => {
    if(video_node.playbackRate == 2){
        togglePlayback_button.innerHTML = "2x Playback"
        video_node.playbackRate = 1;
    } else {
        togglePlayback_button.innerHTML = "1x Playback"
        video_node.playbackRate = 2;
    }
});