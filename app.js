const accessKey = 'EtaeTLd0mI4pAB0cNjRWmRjg9lhRZCjyXTew_Eaq8PI';
const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.unsplash.com/search/photos`;
let currentPage = 1;

async function searchImages(query, page) {
    try {
        const response = await fetch(`${apiUrl}?page=${page}&query=${query}&client_id=${accessKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

const form = document.querySelector("form");
const input = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-result-1");
const showMoreButton = document.querySelector(".show-more");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value;
    currentPage = 1; // Reset page number when a new search is made
    const results = await searchImages(query, currentPage);
    if (results) {
        displayImages(results.results);
        showMoreButton.style.display = 'block';
    }
});

showMoreButton.addEventListener("click", async () => {
    currentPage++;
    const query = input.value;
    const results = await searchImages(query, currentPage);
    if (results) {
        displayImages(results.results);
        if (!results.results.length) {
            showMoreButton.style.display = 'none';
        }
    }
});
function displayImages(images) {
    // Clear previous search results
    searchResults.innerHTML = '';
    
    images.forEach(image => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result-2");

        const img = document.createElement('img');
        img.src = image.urls.small;
        img.alt = image.alt_description;

        const link = document.createElement('a');
        link.href = image.links.html;
        link.textContent = image.alt_description;

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(link);
        searchResults.appendChild(imageWrapper);
    });
}


