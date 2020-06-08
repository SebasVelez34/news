const __PATH__ = window.location.origin;
(function(){
    const response = getNews('Tecnología');
    appendNotices(response);
    
})();

function getNews(query = null) {
    let r = fetch(`https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search?q=${query}&mkt=es-AR`, {
        "method" : "GET",
        "headers": {
            "x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "581201e35emsh1c6f5924316de47p11acdbjsn93c8e15e42a1",
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
    return r;
}

function appendNotices(data){
    
    if (typeof data != "object") {
        return false;
    }
    
    const container = document.querySelector('.feed-grid');
    data.then(response =>{
        response.value.forEach(notice => {
            console.log(notice);
            const source = "image" in notice ? notice.image.thumbnail.contentUrl : `${__PATH__}/assets/img/default.jpg`;
            container.innerHTML += `
                <div class="card-half wide">
                    <div class="card-img"><img src="${source}" alt="img"/></div>
                    <div class="card-text">
                        <h4>${notice.name}</h4>
                        <p>${notice.description}</p>
                    </div>
                    <ul class="card-tools">
                        <li class="tools-item"><i class="fa fa-heart like"></i><span class="tools-count">133</span></li>
                        <li class="tools-item"><i class="fa fa-share share"></i></li>
                    </ul>
                </div>
            `;
        });
        
    });
    
}