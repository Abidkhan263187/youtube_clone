
async function fetchData() {

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q=indian popular&type=video&part=snippet&key=AIzaSyA5q3pQA9OmPNeZUgXfjTgirhyqdzV4I5M`);
    let data = await res.json();
    data = data.items;
    localStorage.setItem("ytData", JSON.stringify(data));
    showData();
    
}

function showData() {
    box.innerHTML = "";
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
        box.append(card);
        card.addEventListener("click", function () {
            let videoId = video.id.videoId;
            localStorage.setItem("videoId", JSON.stringify(videoId))
            window.open("./playVideo.html", '_self').focus();
        })
    })
}

async function searchData() {
    event.preventDefault();
    let query = document.getElementById("input").value;
    localStorage.setItem("YoutubeSerchQuery", query);
    // console.log(query);
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q=${query}&type=video&regionCode=IN&part=snippet&key=AIzaSyA5q3pQA9OmPNeZUgXfjTgirhyqdzV4I5M`);
    let data = await res.json();
    data = data.items;
    localStorage.setItem("ytData", JSON.stringify(data));
    showData();

}

let box = document.getElementById("content");
fetchData() // for by default getting videos on page