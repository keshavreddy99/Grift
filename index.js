const general = document.getElementById("general");
const business = document.getElementById("business");
const sports = document.getElementById("sports");
const tech = document.getElementById("technology");
const ent = document.getElementById("entertainment");
// const international = document.getElementById("national");

const country = "in";

const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

const newsType = document.getElementById("newstype");
const newsdetails = document.getElementById("newsdetails");



const APIkey = "c5e36956c94d4544a6a197a7a62834c6";

window.onload = function() {
  newsType.innerHTML="<h4>Headlines</h4>";
  fetchHeadlines();
};

function callbusiness(){

}


general.addEventListener("click",function(){
  newsType.innerHTML="<h4>General news</h4>";
  fetchNews("general");
});

business.addEventListener("click",function(){
  newsType.innerHTML="<h4 > Business</h4>";
  // console.log("HI")
  fetchNews("business");
});

sports.addEventListener("click",function(){
  newsType.innerHTML="<h4>Sports</h4>";
  fetchNews("sports");
});

ent.addEventListener("click",function(){
  newsType.innerHTML="<h4>Entertainment</h4>";
  fetchNews("entertainment");
});

tech.addEventListener("click",function(){
  newsType.innerHTML="<h4>Technology</h4>";
  fetchNews("technology");
});

searchBtn.addEventListener("click",function(){
  newsType.innerHTML="<h4>Search : "+search.value+"</h4>";
  fetchQueryNews();
});

const fetchHeadlines = async () => {
  const response = await fetch("https://newsapi.org/v2/top-headlines?country="+`${country}`+"&apiKey="+APIkey);
  newsDataArr = [];
  if(response.status >=200 && response.status < 300) {
      const myJson = await response.json();
      newsDataArr = myJson.articles;
      console.log(newsDataArr);
  } else {
      console.log(response.status, response.statusText);
      newsdetails.innerHTML = "<h5>No data found.</h5>"
      return;
  }

  displayNews();
}

async function fetchNews(theme) {
      const response = await fetch("https://newsapi.org/v2/top-headlines?country="+`${country}`+"&category="+`${theme}`+"&apiKey="+APIkey);
      newsDataArr = [];
      if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
        console.log(newsDataArr);
      } 
      else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
      }
      displayNews();
  }



const fetchQueryNews = async () => {

  if(search.value == null)
      return;

  const response = await fetch("https://newsapi.org/v2/everything?q="+encodeURIComponent(search.value)+"&apiKey="+APIkey);
  newsDataArr = [];
  if(response.status >= 200 && response.status < 300) {
      const myJson = await response.json();
      newsDataArr = myJson.articles;
      console.log(newsDataArr);
  } else {
      console.log(response.status, response.statusText);
      newsdetails.innerHTML = "<h5>No data found.</h5>"
      return;
  }

  displayNews();
}

function displayNews() {

  newsdetails.innerHTML = "";

  if(newsDataArr.length == 0) {
      newsdetails.innerHTML = "<h5>No data found.</h5>"
      return;
  }

  newsDataArr.forEach(news => {

      let date = news.publishedAt.split("T");
      
      let col = document.createElement('div');
      col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

      let card = document.createElement('div');
      card.className = "p-2";

      let image = document.createElement('img');
      image.setAttribute("height","matchparent");
      image.setAttribute("width","100%");
      image.src=news.urlToImage;

      let cardBody = document.createElement('div');
      
      let newsHeading = document.createElement('h5');
      newsHeading.className = "card-title";
      newsHeading.innerHTML = news.title;

      let dateHeading = document.createElement('h6');
      dateHeading.className = "text-primary";
      dateHeading.innerHTML = date[0];

      let discription = document.createElement('p');
      discription.className="text-muted";
      discription.innerHTML = news.description;

      let link = document.createElement('a');
      link.className="btn btn-primary";
      link.setAttribute("target", "_blank");
      link.href = news.url;
      link.innerHTML="Read more";

      cardBody.appendChild(newsHeading);
      cardBody.appendChild(dateHeading);
      cardBody.appendChild(discription);
      cardBody.appendChild(link);

      card.appendChild(image);
      card.appendChild(cardBody);

      col.appendChild(card);

      newsdetails.appendChild(col);
  });

}

