let overlay = document.getElementById("overlay")

let mainText = document.querySelector(".editableText > h1");
let caption = document.querySelector(".editableText > h2")
let childText = document.querySelector(".editableText > div")

function on(elementId) {
    // switch content around
    switch(elementId){
        case 'guide_b':{
            mainText.innerHTML = "Guide";
            caption.innerHTML = "Knowledge goes a long way";
            //reset childText since innerHTML isn't being editted immediately
            childText.innerHTML = "";
            childText.style.textAlign = "left";

            let text = [
                    `This website plays videos from Youtube's library, 
                    so finding music on Youtube's site first is ideal.`,
                    `This is some more information`,
                    ];
            let specialText = `For now, music isn't saved locally due to
                                the scope of the project (Refreshing this
                                page will result in redoing all selections)`;
            
            //then set
            let list = document.createElement("ul");
            text.forEach((str)=>{
                let blah = document.createElement("li");
                blah.innerHTML = str;
                list.appendChild(blah);
            });

            let speicalLi = document.createElement("li");
            speicalLi.classList.add("finalNote");
            speicalLi.innerHTML = specialText;
            list.appendChild(speicalLi);
            
            //then append everything
            childText.appendChild(list);
            break;
        }
        case 'info_b':{
            mainText.innerHTML = "So what is this?";
            caption.innerHTML = "Here's the story";
            childText.innerHTML = `Spot Iffy is a project-oriented webpage, made in Code Nation's
                                    Fellowship 1's playlist assignment. I wanted to make a playlist
                                    that I'd make if Spotify had Youtube's library of music.   
                                    <br><br>`
            childText.style.textAlign = "center";
            
            let closingNote = document.createElement("span");
            closingNote.classList.add("finalNote");
            closingNote.innerHTML = "Website Made by Disguised_Coffee<br><br>";

            childText.appendChild(closingNote);
            break;
        }
        case 'credits_b':{
            mainText.innerHTML = "Credits";
            caption.innerHTML = "Last but not least"
            childText.innerHTML = "";
            childText.style.textAlign = "left";

            let text = [
                `All music, images, videos, and audio are from
                their respective users.`,
                `"Spot Iffy" is based on the actual Spotify App.`
                ];
            let specialText = `Heavily reliant on Google's Youtube API.`;
            let specialierText = 'Thanks Saad for the help!';
            
            //then set
            let list = document.createElement("ul");
            text.forEach((str)=>{
                let blah = document.createElement("li");
                blah.innerHTML = str;
                list.appendChild(blah);
            });

            //special text
            let speicalLi = document.createElement("li");
            speicalLi.classList.add("finalNote");
            speicalLi.innerHTML = specialText;
            list.appendChild(speicalLi);

            //then append lists
            childText.appendChild(list);

            let closingNote = document.createElement("span");
            closingNote.classList.add("finalNote");
            closingNote.innerHTML = specialierText;

            childText.appendChild(closingNote);
            break;
        }
        default:{
            mainText.innerHTML = "An error has occured";
            caption.innerHTML = "Uhhhhhhh";
            childText.innerHTML = "";
            console.log("UNHANDLED EXCEPT @ OVERLAY");
        }
    }

    overlay.classList.add("show");
    overlay.classList.remove("hide");
    overlay.style.display = "flex";
}
  
function off() {
    overlay.classList.remove("show");
    overlay.classList.add("hide");
}
  