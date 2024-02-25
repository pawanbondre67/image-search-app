const apikey = "7kKLkmuNT8C4sUZT59Bu0w0JrExTqOdnt6dJoeouCww"

const formEl = document.querySelector('form')
const  input = document.getElementById('search-input')
const searchResults= document.querySelector('.search__results');
const showMore  = document.querySelector('.show__more');

let inputdata = ''
let page = 1

 async function showImages(){
    inputdata = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${apikey}`;
    const res = await fetch(url);
    const data= await res.json();

    const results = data.results;
    console.log(data);

    if(page === 1){
        searchResults.innerHTML = '';
    }
    results.map((results) =>  {

        const ImageWrapper = document.createElement('div');
        ImageWrapper.classList.add('search__result');
        const Image = document.createElement('img');
        Image.src = results.urls.small;
        Image.alt = results.alt_description;
        const ImageLink = document.createElement('a');
        ImageLink.href = results.links.html;
        ImageLink.target = '_blank';
        ImageLink.textContent = results.alt_description;

        ImageWrapper.appendChild(Image);
        ImageWrapper.appendChild(ImageLink);
        searchResults.appendChild(ImageWrapper);
    });


  page++;
  if(page > 1){
      showMore.style.display = 'block';
  }

}


formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    showImages();
});


showMore.addEventListener('click', showImages);