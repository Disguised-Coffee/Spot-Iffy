// https://developers.google.com/youtube/iframe_api_reference#Playback_controls 
// Thank you Google for nice documentation. 

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', // For getting it into a 
        width: '0',
        videoId: 'E9FUKYfh2AI', // TODO: see how this works w/o this line
        playerVars: {
            'playsinline': 1
        }
    });
}

let playButton = document.querySelector('#play')
console.log(playButton);

playButton.addEventListener("click", (event) => {
    // This is where the magic happens
    console.log(document.querySelector('#play'));
    console.log("ansfdhsahdjsa");
    console.log(player.getPlayerState());

    // https://developers.google.com/youtube/iframe_api_reference#Playback_status
    switch (player.getPlayerState()) {
        case 5:
            player.playVideo();
            break;
        case 1:
            player.pauseVideo();
            break;
        case 2:
            player.playVideo();
            break;
    }
})

let skipButton = document.querySelector('#skip')
//player.nextVideo()

let prevButton = document.querySelector('#prev')
// player.previousVideo()