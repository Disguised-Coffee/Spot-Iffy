/**
 * Stores information for usage with YTPlayer.
 * 
 * Figure out how to transfer data structures from script to script
 * 
 */
class videoInfo{
    title;
    videoId;
    imagesrc;
    vidCreator;
    /**
     * 
     * @param {*} title  - Title of the song
     * @param {*} videoId - Video id of the video
     * @param {*} imagesrc - src link of video
     * @param {*} vidCreator - artist/channel video is from
     */
    constructor(title, videoId, imagesrc, vidCreator){
        this.title = title;
        this.videoId = videoId;
        this.imagesrc = imagesrc;
        this.vidCreator = vidCreator;
    }
}

//array for all videoInfo instances saves
let searchingSongList = [];

//array for all videoInfo instances found from query




// Does the whole searching process
async function submitYoutubeSearch() {
    //remove old instances
    searchingSongList = [];
    const apiValue = document.querySelector("#api").value;
    if(apiValue === ""){
        document.querySelector("body .info").innerHTML = "You need an API key to search!";
    }
    //call APIapi
    const query = document.querySelector("#query").value;
    const MAX_SEARCHES  = document.querySelector("#limit").value;
    const resp = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_SEARCHES}&q=${query}&type=video&key=${apiValue}`);
    const j = await resp.json();

    // Populate an array
    j["items"].forEach(element => {
        // Data structure to pass into another JS file?
        let song = new videoInfo(
            element["snippet"]["title"],
            element["id"]["videoId"],
            element["snippet"]["thumbnails"]["default"]["url"],
            element["snippet"]["channelTitle"]
        )
        searchingSongList.push(song);
    });
    updateList()
}

function updateList(){
    //remove old content
    document.querySelector("body .info").innerHTML = "";
    //make instances
    searchingSongList.forEach((songInstance)=>{
        let image = document.createElement("img");
        image.src = songInstance.imagesrc;
        
        let title = document.createElement("h1");
        title.innerText = songInstance.title;
        
        let artist = document.createElement("p");
        artist.innerText = songInstance.vidCreator;

        let div = document.createElement("div");
        div.appendChild(image);
        div.appendChild(title);
        div.appendChild(artist);
        document.querySelector("body .info").appendChild(div);
    })
}


// testyoutube();