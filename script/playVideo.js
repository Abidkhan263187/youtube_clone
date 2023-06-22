
let videoDiv = document.getElementById("videoDiv");

let videoId = JSON.parse(localStorage.getItem("videoId"));

let iframe = document.createElement("iframe");
iframe.src = `https://www.youtube.com/embed/${videoId}`
iframe.width = "100%";
iframe.height = "100%";
iframe.allowFullscreen = true; 
videoDiv.append(iframe);


async function getVideos(query) {

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q=${query}&type=video&regionCode=IN&part=snippet&key=AIzaSyA5q3pQA9OmPNeZUgXfjTgirhyqdzV4I5M`);
    let data = await res.json();
    data = data.items;
    // let filtered = data.filter((video)=>video.id != videoId);
    localStorage.setItem("ytData", JSON.stringify(data));
    showData();
    
}

function showData() {
    let relatedVideos = document.getElementById("relatedVideos");
    relatedVideos.innerHTML = "";
    let data = JSON.parse(localStorage.getItem("ytData"));
    data.forEach(function (video) {
        let card = document.createElement("div");

        let image = document.createElement("img");
        image.src = video.snippet.thumbnails.medium.url;

        let title = document.createElement("p");
        let chanel = document.createElement("p");
        title.innerText = video.snippet.title;
        chanel.innerText = "Channel : " + video.snippet.channelTitle;
        card.append(image, title, chanel);
        relatedVideos.append(card);
        card.addEventListener("click", function () {
            let videoId = video.id.videoId;
            localStorage.setItem("videoId", JSON.stringify(videoId))
            window.open("./playVideo.html", '_self').focus();
        })
    })
}

let query = localStorage.getItem("YoutubeSerchQuery");
getVideos(query);