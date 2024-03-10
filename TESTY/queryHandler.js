let helloThere = "Hi!";
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
    duration = ""; // we'll populate this later
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
let savedSongsList = [];

//array for all videoInfo instances found from query
let searchingSongList = [];



// Does the whole searching process
async function submitYoutubeSearch() {
    //remove old instances
    searchingSongList = [];
    const apiValue = document.querySelector("#api").value;
    if(apiValue === ""){
        document.querySelector("body .info").innerHTML = "You need an API key to search!";
        return;
    }
    document.querySelector("body .info").innerHTML = "Searching...";
    //call APIapi
    const query = document.querySelector("#query").value;
    const MAX_SEARCHES  = document.getElementById("myRange").value;
    // do some promise stuff here: TODO
    // Handle internet disconnection
    try{
        
        const resp = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_SEARCHES}&q=${query}&type=video&key=${apiValue}`);
        const j = await resp.json();

        // have a handler for bad API keys
        if(j["error"]){
            document.querySelector("body .info").innerHTML = `That wasn't a valid API key (got error code ${j["error"]["code"]})!`;
            return;
        }

        // Populate an array
        j["items"].forEach(async element => {
            // Data structure to pass into another JS file?
            let song = new videoInfo(
                element["snippet"]["title"],
                element["id"]["videoId"],
                element["snippet"]["thumbnails"]["default"]["url"],
                element["snippet"]["channelTitle"]
            )
            searchingSongList.push(song);
        });
    }
    catch(ERR_INTERNET_DISCONNECTED){
        console.log("Couldn't finish: Disconnected!");
        document.querySelector("body .info").innerHTML = "You're disconnected from the internet!";
        return;
        
    }

    console.log(searchingSongList);

    // queue the funnies
    let q = "";
    // THEN put the IDs in a queue to get the IDs
    searchingSongList.forEach((song)=>{
        q += song.videoId + ","
        console.log(q)
    })
    //remove ending
    q = q.substring(0,q.length - 1);
    

    console.log(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${q}&key=${apiValue}`);
    // submit to queue
    const resp_d = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${q}&key=${apiValue}`);
    const j_d = await resp_d.json();
    console.log(j_d)

    // for loop here to parse the obj
    for(let i = 0; i < searchingSongList.length; i++){
        console.log(j_d["items"][i]["contentDetails"]);
        searchingSongList[i].duration = reformatTime(j_d["items"][i]["contentDetails"]["duration"]);
        console.log(searchingSongList[i].duration);
    }

    updateList()
}

function updateList(){
    //remove old content
    document.querySelector("body .info").innerHTML = "";
    //make instances
    let i = 0;
    searchingSongList.forEach((songInstance)=>{
        // TODO make this image clickable with an attirbute tag
        let image = document.createElement("img");
        image.src = songInstance.imagesrc;
        
        let title = document.createElement("h1");
        title.innerText = songInstance.title;
        
        let artist = document.createElement("p");
        artist.innerText = songInstance.vidCreator;

        //need vid duration as well!
        let duration = document.createElement("p");
        duration.innerHTML = "Duration: "+ htmlReformatTime(songInstance.duration);

        //need button for saving.
        let saveButton = document.createElement("button");
        saveButton.innerHTML = "Click me to save this song!";
        saveButton.id = i;
        saveButton.onclick = ()=> {
            // something was being glitchy when I left it without 
            // the shorthand function maker...
            saveThisSong(saveButton.id);
        }
        // console.log(saveButton);

        let div = document.createElement("div");
        
        div.appendChild(image);
        div.appendChild(title);
        div.appendChild(duration)
        div.appendChild(artist);
        div.appendChild(saveButton);
        document.querySelector("body .info").appendChild(div);
        i++;
        // console.log("Created new instance");
    })
}

// saves the song depending what's on the screen right now.
function saveThisSong(id){
    savedSongsList.push(searchingSongList[id]);
    // Currently set to remove all of the content in the div after saving.
    document.querySelector("body .info").innerHTML = "";
    console.log(savedSongsList);
}

/**
 * 
 * @param {*} videoId - ID of video to search
 * @param {*} apiValue - API key
 * @returns time of video in special format.
 */
async function getVidDuration(videoId, apiValue){
    const resp = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiValue}`);
    const j = await resp.json();
    return reformatTime(j["items"][0]["contentDetails"]["duration"]);
}

/**
 * 
 * @param {*} time inputted time in strange ISO 8601
 * @returns  NaN if couldn't format, array if successful.
 */
function reformatTime(time){
    // from https://stackoverflow.com/questions/19061360/how-to-convert-youtube-api-duration-iso-8601-duration-in-the-format-ptms-to
    var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    var hours = 0, minutes = 0, seconds = 0, totalseconds;

    if (reptms.test(time)) {
        var matches = reptms.exec(time);
        if (matches[1]) hours = Number(matches[1]);
        if (matches[2]) minutes = Number(matches[2]);
        if (matches[3]) seconds = Number(matches[3]);
        return [hours, minutes, seconds]
    }
    return NaN
}

function htmlReformatTime(aot){
    let tor =  "";
    if(aot[0]) tor += aot[0] + ":";
    if(aot[1])
    {
        tor += aot[1] + ":";
    }  
    else{
        tor += "0:";
    }
    if(aot[2])
    {
        if(aot[2] < 10){
            tor += "0" + aot[2];
        }
        else{
            tor += aot[2];
        }
    }
    else{
        tor += "00";
    }
    return tor;
}
// testyoutube();