let youtubeVideo = document.getElementById('youtube')
let wikiText = document.getElementById('wikiText')
let searchInput = document.getElementById('searchInput')

//Youtube API that takes whats in the search bar and gets the latest youtube video from that Youtube Channel
function searchButton(){
  let input = searchInput.value
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cb65ae96c0msh34e667b0d321265p1fa084jsn185661bacbdd',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  fetch('https://youtube138.p.rapidapi.com/search/?q=' + input + '&hl=en&gl=US', options)
    .then(response => response.json())
    .then(function(data) {
      let youtubeChannel = data.contents[0].channel.channelId 
      fetch('https://youtube138.p.rapidapi.com/channel/videos/?id=' + youtubeChannel + '&filter=uploads_latest&hl=en&gl=US', options)
        .then(response => response.json())
        .then(function(data) {
          let videoId = data.contents[0].video.videoId
          youtubeVideo.src = 'https://www.youtube.com/embed/' + videoId
        })

      })




  //Wikipedia API that takes whats in the search bar and gets the wikipedia page for that search
  var url = "https://en.wikipedia.org/w/api.php"; 

  var params = {
      action: "query",
      list: "search",
      srsearch: input,
      format: "json"
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  fetch(url)
      .then(function(response){return response.json();})
      .then (function (data) {
        let pageId = data.query.search[0].pageid
        let name = data.query.search[0].title
        var url = "https://en.wikipedia.org/w/api.php"; 

        var params = {
          action: "query",
          prop: "extracts",
          exsentences: '10',
          exlimit: '1',
          titles: name,
          explaintext: '1',
          format: "json"
          };
        
  //Wikipedia API that takes the Name and pageId and gets the info about the Youtube Channel        
        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
        
        fetch(url)
          .then(function(response){return response.json();})
          .then(function(data) {
            wikiText.innerHTML = data.query.pages[pageId].extract
          }
          )})
      }